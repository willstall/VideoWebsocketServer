const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);
const aWss = expressWs.getWss('/');
const port = 3000;

app.use(express.static('public'));

app.use(function (req, res, next) {
  console.log('middleware');
  req.testing = 'testing';
  return next();
});

app.get('/', function(req, res, next){
  console.log('get route', req.testing);
  res.end();
});

app.ws('/', function(ws, req) {
  ws.on('message', function(msg) {
    console.log(msg);
    aWss.clients.forEach(function (client) {
        client.send(msg);
      });    
  });
  console.log('socket', req.testing);
});

setInterval(function () {
    aWss.clients.forEach(function (client) {
      client.send('Play Video');
    });
  }, 5000);

app.listen(port)
