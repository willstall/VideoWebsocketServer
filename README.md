# VideoWebsocketServer


# Server Setup Steps for Raspbian
0) Download Rasbian Lite
0) Put Rasbian Lite onto Fat-32 Formatted sd card using balenaEtcher
0) Boot up pi with sd-card, login with username:pi password:raspberry
0) Setup Autologin, Wifi, Keyboard using [raspi-config](https://www.raspberrypi.org/documentation/configuration/raspi-config.md) 
```
sudo raspi-config
```
0) Update apt-get
```
sudo apt-get update
sudo apt-get upgrade
```
0) Install Git
```
sudo apt-get install git
```
0) Install NPM
```
sudo apt-get install npm
```
0) Pull Repository
```
git clone https://github.com/willstall/VideoWebsocketServer.git
```
0) install npm dependencies in repository directory
```
npm install
```
0) test server with npm start
```
npm start
```
0) create a .bash_profile at ~ to call npm start after login
0) set a permanant ip for this device, that matches the server address in index.html
- ```sudo nano /etc/dhcpcd.conf```
- add this to the end of the file
```
interface wlan0
static ip_address=192.168.4.1/24
nohook wpa_supplicant
```
    
# Steps to also use the pi as a hotspot w/ bridge
Here are two guides for setting up a raspberry pi with raspbian as a hotspot. I used a combination of these two tutorials to get everything running.

We will need hostapd to setup a hotspot and dnsmasq in order to give out proper ip's to clients.
```sudo apt install dnsmasq hostapd```


[try this one first](https://www.raspberrypi.org/documentation/configuration/wireless/access-point.md)
[try this next](https://thepi.io/how-to-use-your-raspberry-pi-as-a-wireless-access-point/)
