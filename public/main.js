
// Define a new Movie if there is one in the query String
var videoKeyId = 'video';
var initialVideo = '/video/01.mp4';
var urlParams = new URLSearchParams(window.location.search);
var setVideoFile = function(file){  document.getElementById('video_source').setAttribute('src',file);      }

// Socket Server Stuff
// var wsUri = "wss://echo.websocket.org/";
// var wsUri = "ws://"+window.location.host;

var autoReconnectInterval = 3000;
var server_ip = "10.0.1.1:3000"
var maxLog = 20;
var wsUri = (window.location.host =="localhost:3000")?"ws://localhost:3000/socket":"ws://"+server_ip+"/socket";
var autoFullscreen = false;
var output;

var welcomeMessage = "Connected to WebSocket. You're lovely.";

function init()
{
    // setup output for debug
    output = document.getElementById("output");
    writeToScreen("DOCUMENT LOADED");
    createSocketServer();

    // set video file
    if(urlParams.has(videoKeyId))
        setVideoFile(urlParams.get(videoKeyId));
    else
        setVideoFile(initialVideo);

    play();
}

function createSocketServer()
{
    websocket = new WebSocket(wsUri);
    websocket.onopen = function(evt) { onOpen(evt) };
    websocket.onclose = function(evt) { onClose(evt) };
    websocket.onmessage = function(evt) { onMessage(evt) };
    websocket.onerror = function(evt) { onError(evt) };
}

function onOpen(evt)
{
    writeToScreen("CONNECTED");
    doSend(welcomeMessage);    
    fullscreen( true );   
}

function fullscreen( isFullScreen )
{
    if(autoFullscreen != true)
    return ;

    var v = document.getElementById("video");
    v.className = ( isFullScreen == true ) ? ( "video_fullscreen" ) : ( "video_minimized" );

    var o = document.getElementById("debug");
    o.style = ( isFullScreen == true ) ? ("display:none") : ( "" );
}

function onClose(evt)
{
    writeToScreen("DISCONNECTED");
    if(evt.code != 1000)      
            reconnect(evt);
}

function onMessage(evt)
{
    writeToScreen('<span style="color: blue;">RESPONSE: ' + evt.data+'</span>');
    
    switch(evt.data)
    {
    case "Play Video":
        play();
        break;
    case welcomeMessage:

    default:
        break;
    }
    // websocket.close();
}

function play()
{
    var v = document.getElementById("video");
    v.currentTime = 0;
    v.play();
}

function onError(evt)
{
    if(evt.code == "ECONNREFUSED")
    reconnect(evt);

    writeToScreen('<span style="color: red;">ERROR:</span> ' + evt.data);
    fullscreen(false); 
}

function doSend(message)
{
    writeToScreen("SENT: " + message);
    websocket.send(message);
}

function reconnect(evt){
    writeToScreen("RETRY RECONNECT IN..."+autoReconnectInterval);
    setTimeout(function(){
    writeToScreen("RECONNECTING...");
    createSocketServer();
    },autoReconnectInterval);
}

function writeToScreen(message)
{
    var count = output.childElementCount;
    if(count > maxLog)
    output.removeChild(output.lastChild)

    var d = new Date();
    var pre = document.createElement("p"); 
    pre.style.wordWrap = "break-word";
    pre.innerHTML =  d.getTime() + "\n" + message;
    output.prepend(pre);
}

window.addEventListener("load", init, false);

var b = document.getElementById("btn");
b.onclick = () => {
    doSend("Play Video");
};