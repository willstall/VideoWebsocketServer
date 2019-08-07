# Rasbian Node Websocket Server w/ Brightsign Support
This is a project to help you setup a dedicated websocket server for use on a raspberry pi that can support dynamic content on multiple devices such as phones,tablets,computers, and brightsign players using [express-ws](https://github.com/HenningM/express-ws)

## Usage
Currently, this example sends a 'Play Video' message to all devices connected to the socket server. Any devices connected to the server will get the automatic play from the server every 5-seconds ( configurable ). Alternatively, any client can initiate the play command for all devices.

This is a very tiny example that can be easily expanded for use as a remote control, game,digital media signage, or any other use-case where you need to share commands among multiple devices in a clossed network.

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
11) create a .bash_profile at ~ to call npm start after login
12) set a permanant ip for this device, that matches the server address in index.html
```
sudo nano /etc/dhcpcd.conf
```
add this to the end of the file
```
interface wlan0
static ip_address=10.0.1.1/24
nohook wpa_supplicant
```
save file and restart dhcp
```
sudo service dhcpcd restart
```
you can check your new ip address with ```ifconfig```
if your ip is not 10.0.1.1, call ```reboot```

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
