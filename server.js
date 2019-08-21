const express = require('express');
const url = require('url');
const app = express();
const expressWs = require('express-ws')(app);
const aWss = expressWs.getWss('/');
const port = 3000;
const heartbeatInMilliseconds =  5000;

app.use(express.static('public'));

app.use(function (req, res, next) {
  // console.log('middleware');
  req.testing = 'testing';
  return next();
});

// change any default route to a video file
app.get('/:video',function(req,res)
{
  let v = {'video':'/video/' + req.params.video + '.mp4'};
  res.redirect(url.format({
    pathname:"/",
    query:v
  }));
  res.end();
});

// socket routing so it doesn't get in the way of http requests
app.get('/socket', function(req, res, next){
  console.log('get route', req.testing);
  res.end();
});

app.ws('/socket', function(ws, req) {
  ws.on('message', function(msg) {
    // console.log(msg);
    sendClientsMessage(msg);   
  });
});

app.listen(port);

// send out heartbeat to replay video
setInterval(function () {
  sendClientsMessage('Play Video');
  }, heartbeatInMilliseconds);

let sendClientsMessage = function(msg)
{
  aWss.clients.forEach(function (client) {
    client.send(msg);
  }); 
}

console.log('Starting a lovely server!');