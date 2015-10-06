import bcrypt from 'bcryptjs';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import database from './lib/database.js';
import googlebooks from './lib/googlebooks.js';
import express from 'express';
import http from 'http';
import https from 'https';
import passport from 'passport';
import register from './lib/register.js';
import cookieSession from 'cookie-session';
import { Strategy } from 'passport-local';
const LocalStrategy = Strategy;

const app = express();
app.locals.settings['x-powered-by'] = false;
const port = process.env.PORT || 9991;
app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieSession({ 
  name: 'MyBookList',
  secret: process.env.SESSION_SECRET || 'keyboard cat'
}));
app.use(passport.initialize());
app.use(passport.session());

// App
app.get('/search', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/search/*', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/books', function (req, res) {
  res.redirect('/search');
});

app.get('/books/*', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/list', function (req, res) {
  if (req.user) {
    res.sendFile(__dirname + '/public/index.html');
  } else {
    res.redirect('/login');
  }
});

app.get('/list/*', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

// Passport config
passport.use(new LocalStrategy(
  function(username, password, done) {
    let users = database.users;
    users.findOne({ username }, function (err, doc) {
      if (err) { return done(err); }
      if (!doc) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      let hash = doc.password;
      if (!bcrypt.compareSync(password, hash)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, doc);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  let users = database.users;
  users.findOne({ _id: id }, function (err, doc) {
    done(null, doc);
  });
});

// Login
app.post('/login',
  passport.authenticate('local'),
  function (req, res) {
    res.send('success');
  }
)

app.get('/login', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/user', function (req, res) {
  if (req.user) { // logged in
    res.send(true);
  } else { // not logged in
    res.send(false);
  }
});

app.post('/logout', function (req, res) {
  req.session = null;
  res.send(true);
});

// User Registration
app.post('/register', function (req, res) {
  register(req.body).then(function (results) {
    let users = database.users;
    users.findOne({ username: results.username }, function (err, doc) {
      if (!err && !doc) {
        users.findOne({ email: results.email }, function (err, doc) {
          if (!err && !doc) {
            users.insert(results, function (err, doc) {
              if (!err) {
                let lists = database.booklist;
                lists.insert({
                  id: doc._id,
                  currentlyReading: [],
                  wantToRead: [],
                  completed: []
                }, function (err, doc) {
                  if (!err) {
                    res.send({ error: false });
                  } else {
                    res.send({ error: true, message: 'Unknown error.' });
                  }
                });
              } else {
                res.send({ error: true, message: 'Unknown error.' });
              }
            });
          } else {
            res.send({
              error: true,
              message: 'Someone is already using that email address.',
            });
          }
        });
      } else {
        res.send({
          error: true,
          message: 'Someone is already using that username.',
        });
      }
    });
  }).error(function (error) {
    res.send({
      error: true,
      message: error.details[0].message
    });
  });
});

app.get('/register', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

// API
const books = googlebooks(process.env.GOOGLE_BOOKS);

app.get('/api/v1/book', function (req, res) {
  books.get(req.query.id).then((results) => {
    res.send(results);
  }).error((error) => {
    res.end();
  });
});

app.get('/api/v1/list', function (req, res) {
  if (req.user) {
    let id = req.user._id;
    let lists = database.booklist;
    lists.findOne({ id }, function (err, doc) {
      res.send(doc);
    });
  } else {
    res.end();
  }
});

app.post('/api/v1/list', function (req, res) {
  let validLists = ['currentlyReading', 'wantToRead', 'completed'];
  if (validLists.indexOf(req.body.list) >= 0 && req.user && req.body.bookId) {
    let id = req.user._id;
    let lists = database.booklist;
    let update = {};
    update[req.body.list] = req.body.bookId;
    lists.update({ id }, { $push: update }, {}, function (err, numReplaced, newDoc) {
      if (!err) {
        res.send(true);
      } else {
        res.end();
      }
    });
  } else {
    res.end();
  }
});

app.delete('/api/v1/list', function (req, res) {
  let validLists = ['currentlyReading', 'wantToRead', 'completed'];
  if (validLists.indexOf(req.query.list) >= 0 && req.user && req.query.bookId) {
    let id = req.user._id;
    let lists = database.booklist;
    let rmv = {};
    rmv[req.query.list] = req.query.bookId;
    lists.update({ id }, { $pull: rmv }, function (err, numReplaced, newDoc) {
      if (!err) {
        res.send(true);
      } else {
        res.end();
      }
    });
  } else {
    res.end();
  }
});

app.get('/api/v1/search', function (req, res) {
  books.list(req.query.title).then((results) => {
    let bookData = results[0].items;
    let resultData = [];

    for (let i = 0; i < bookData.length; i++) {
      try {
        let curBook = bookData[i];
        let resData = {
          id: curBook.id,
          title: curBook.volumeInfo.title,
          authors: curBook.volumeInfo.authors,
          publishedDate: curBook.volumeInfo.publishedDate.split('-').shift(),
        };
        resultData.push(resData);
      } catch (e) {}
    }
    
    res.send(resultData);
  }).error((error) => {
    res.end();
  });
});

http.createServer(app).listen(port);
// https.createServer(options, app).listen(443);
console.log('Listening on :' + port);
