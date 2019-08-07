# VideoWebsocketServer


# Server Setup Steps for Raspbian
0) Download Rasbian Lite
0) Put Rasbian Lite onto Fat-32 Formatted sd card using balenaEtcher
0) Boot up pi with sd-card, login with username:pi password:raspberry
0) Setup Autologin, Wifi, Keyboard using sudo [raspi-config](https://www.raspberrypi.org/documentation/configuration/raspi-config.md) 
0) Update apt-get
sudo apt-get update
sudo apt-get upgrade
0) Install Git
sudo apt-get install git
0) Install NPM
sudo apt-get install npm
0) Pull Repository

0) npm install in repository directory
0) test server with npm start
0) create a .bash_profile at ~ to call npm start after login, can alternatively use nodemon

# Steps to also use the pi as a hotspot w/ bridge

