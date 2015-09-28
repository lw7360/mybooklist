import ecstatic from 'ecstatic';
import express from 'express';
import http from 'http';

let app = express();
app.locals.settings['x-powered-by'] = false;
let port = process.env.PORT || 9991;
app.use(ecstatic({ root: __dirname + '/public', handleError: false }));
app.get('/books', function (req, res) {
  res.redirect('/search');
});
app.get('/books/*', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});
http.createServer(app).listen(port);
console.log('Listening on :' + port);
