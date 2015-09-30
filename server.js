import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import http from 'http';
import passport from 'passport';
import { Strategy } from 'passport-local';
const LocalStrategy = Strategy;
import uuid from 'node-uuid';

const app = express();
app.locals.settings['x-powered-by'] = false;
const port = process.env.PORT || 9991;
app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
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
    const id = uuid.v4();
    return done(null, { id });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(user, done) {
  done(null, {id: user});
});

// Login
app.post('/login',
  passport.authenticate('local'),
  function (req, res) {
    res.redirect('/user');
  }
)

app.get('/login', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/user', function (req, res) {
  if (req.user) { // logged in
    res.send(req.user);
  } else { // not logged in
    res.status(418).end();
  }
});

// User Registration
app.post('/register', function (req, res) {
  res.send('not implemented yet...');
});

app.get('/register', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

// API

http.createServer(app).listen(port);
console.log('Listening on :' + port);
