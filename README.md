# VideoWebsocketServer


# Server Setup Steps for Raspbian
0) Download Rasbian Lite
0) Put Rasbian Lite onto Fat-32 Formatted sd card using balenaEtcher
0) Boot up pi with sd-card, login with username:pi password:raspberry
0) Setup Autologin, Wifi, Keyboard using [raspi-config](https://www.raspberrypi.org/documentation/configuration/raspi-config.md) 
- ``` sudo raspi-config```
0) Update apt-get
- ```sudo apt-get update```
- ```sudo apt-get upgrade```
0) Install Git
- ```sudo apt-get install git```
0) Install NPM
- ```sudo apt-get install npm```
0) Pull Repository
- ```git clone https://github.com/willstall/VideoWebsocketServer.git```
0) install npm dependencies in repository directory
- ```npm install```
0) test server with npm start
- ```npm start```
0) create a .bash_profile at ~ to call npm start after login

# Steps to also use the pi as a hotspot w/ bridge

