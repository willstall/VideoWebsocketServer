# VideoWebsocketServer


# Server Setup Steps for Raspbian
1) Download Rasbian Lite
1) Format sd-card as Fat-32
1) install Rasbian Lite on sd card using [balenaEtcher](https://www.balena.io/etcher/)
1) plug in the pi, except power
1) put in sd card
1) power on pi
1) login with username:*pi* password:*raspberry*
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
9) install npm dependencies in repository directory
```
npm install
```
10) test server with npm start
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

# Steps to also use the pi as a hotspot w/ bridge
Here are two guides for setting up a raspberry pi with raspbian as a hotspot. I used a combination of these two tutorials to get everything running.

We will need hostapd to setup a hotspot and dnsmasq in order to give out proper ip's to clients.
```
sudo apt install dnsmasq hostapd
```

- [try this one first](https://www.raspberrypi.org/documentation/configuration/wireless/access-point.md)
- [try this next](https://thepi.io/how-to-use-your-raspberry-pi-as-a-wireless-access-point/)
