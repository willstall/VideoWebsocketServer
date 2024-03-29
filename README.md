# Rasbian Node Websocket Server w/ Brightsign Support
This is a project to help you setup a dedicated websocket server for use on a raspberry pi that can support dynamic content on multiple devices such as phones,tablets,computers, and brightsign players using [express-ws](https://github.com/HenningM/express-ws)

## Intention
Let's say you have 7 different devices and want to sync video playbacks, create a game, or even just sync a message on the screen; this is a dirt simple solution. This implementation can be used as a self-contained video playback system w/ support for Brightsign, iOS, Android, and OSX/Win as long as the devices have local network access. *This does not require an internet connection, just a private network*

## Usage
This example sends a 'Play Video' message to all devices connected to the socket server. Any devices connected to the server will get the automatic play from the server every 5-seconds ( configurable ). Alternatively, any client can initiate the play command for all devices.

This is a very tiny example that can be easily expanded for use as a remote control, game,digital media signage, or any other use-case where you need to share commands among multiple devices in a clossed network.

*I have purposely kept all code as simple as possible, so it can be adapted for your needs*

## Tested Devices
Brightsign, iPhone, Android Phone, iPad, Windows, Mac

# Basic Local Server Setup and Test
( with npm and git installed )
```
git clone https://github.com/willstall/VideoWebsocketServer.git
npm install
npm start
```
Navigate to localhost:3000 in browser to test server. You video will play within 5 seconds.

# Multiple Video Files
There is basic routing that can be found in server.js which will take any base level url and display an associate video. For instace: ```localhost:3000/01``` will play the video ```\videos\01.mp4```. For brightsign players, you must configure the ```var initialVideo = "/video/03.mp4";``` variable in your index file for each device.

# Player Configuration Variables
```
// fullscreen video on successful player connection, turn off to see debug log
var autoFullscreen = true;

// tell all connected players to restart video on successful player connection
var restartVideosOnConnect = true;

// initial video to play if no overriding url is provided
var initialVideo = '/video/01.mp4';

// interval in milliseconds to try and resestablish a connection to the socket server
var autoReconnectInterval = 3000;

// local ip to socket server if not on localhost
var server_ip = "10.0.1.1:3000"

// line size of visual debug log
var maxLog = 20;

```
# Server Setup Steps for Raspbian on Pi
1) Download Rasbian Lite
1) Format sd-card as Fat-32
1) Install Rasbian Lite on sd card using [balenaEtcher](https://www.balena.io/etcher/)
1) Plug in the pi, except power
1) Put in sd card
1) Power up pi
1) Login with username:*pi* password:*raspberry*
1) Setup Autologin, Wifi, Keyboard using [raspi-config](https://www.raspberrypi.org/documentation/configuration/raspi-config.md) 
```
sudo raspi-config
```
5) Update apt-get
```
sudo apt-get update
sudo apt-get upgrade
```
6) Install Git
```
sudo apt-get install git
```
7) Install NPM
```
sudo apt-get install npm
```
8) Pull Repository
```
git clone https://github.com/willstall/VideoWebsocketServer.git
```
9) Install npm dependencies in repository directory
```
npm install
```
10) Test server with npm start
```
npm start
```
11) Create a .bash_profile at ~ to call npm start after login
```
sudo nano ~/.bash_profile
```
Add the following in the file and save
```
cd VideoWebsocketServer
npm start
```
12) Set a permanant ip for this device, that matches the server address in index.html
```
sudo nano /etc/dhcpcd.conf
```
Add this to the end of the file
```
interface wlan0
static ip_address=10.0.1.1/24
nohook wpa_supplicant
```
Save file and restart dhcp
```
sudo service dhcpcd restart
```
You can check your new ip address with ```ifconfig```
If your ip is not 10.0.1.1, call ```reboot```

# Player Setup
Conneced to the same network as the server.
1) Navigate to 10.0.1.1:3000 in a web-browser
2) Alternately, you can place the contents on ```/public/``` on your device and access index.html

## Brightsign Setup
Edit the autrun.brs file in a text editor. You will need to change the line ```r=CreateObject("roRectangle",0,0,1920,1200)``` so that 1920,1200 match the desired resolution for your brightsign player.

# Steps to also use the pi as a hotspot w/ bridge
Here are two guides for setting up a raspberry pi with raspbian as a hotspot. I used a combination of these two tutorials to get everything running.

We will need hostapd to setup a hotspot and dnsmasq in order to give out proper ip's to clients.
```
sudo apt-get install dnsmasq hostapd
```

- [try this one first](https://www.raspberrypi.org/documentation/configuration/wireless/access-point.md)
- [try this next](https://thepi.io/how-to-use-your-raspberry-pi-as-a-wireless-access-point/)
