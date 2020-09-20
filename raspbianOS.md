<div align="center">
    <img width="32px" src="https://www.raspberrypi.org/app/uploads/2018/03/RPi-Logo-Reg-SCREEN.png">
    <h1 color="#c41949" font-size:32px">Raspbian OS</h1>
    <div>Configuration for Local Development on raspberry pi os</div>
</div>

## Table of content

- <a href="#Requirement">Requirement</a>
- <a href="#Flashing-The-Os">Flashing the OS</a>
- <a href="#Initial-Setup">Initial Setup</a>
    - <a href="#Headless-wifi-Setup">Headless Wifi</a>
    - <a href="#Headless-USB-Setup">Headless USB</a>
- <a href="#post-setup">Post Setup</a>
- <a href="">Installing Nginx</a>


## Requirement

for this turtorial at least you have understand the basic of SSH and basic command for unix or Linux

requirement :
- Raspberry pi &nbsp;&nbsp;*duh* 😂
- SD Card 8/16/32/64 Gb &nbsp;&nbsp; *recomended 16 Gb*
- An PC whether mac, windows or linux
- [Raspbian OS](https://www.raspberrypi.org/downloads/raspberry-pi-os/) *Use Lite Version*
- Software for flashing *pick one*
    - [Ethcer](https://www.balena.io/etcher/)
    - [Rufus](https://rufus.ie/)
- [Notepad++](https://notepad-plus-plus.org/downloads/)
- [Putty](https://www.putty.org/) or [GNU bash](https://www.gnu.org/software/bash/) for windows
- [Bonjour](https://developer.apple.com/bonjour/) for ssh through USB

## Flashing The OS
Flashing the OS can be done through GUI like etcher / rufus or using CLI

- With Etcher
    - Put your SD card to your computer
    - Open Etcher
    - Select the *iso/img* of raspbian os you downloaded before
    - Select the SD card
    - Click Flash
    - Wait for the flash to finish

## Initial Setup
- #### Headless wifi Setup
    1. after the flash finish Select the SD card on your windows or mac GUI
        - For linux you must mount the SD card first trhought nautilus or cli
    2. Create file on the SD card called **ssh** and **wpa_supplicant.conf**
    3. open **wpa_supplicant.conf** using notepad++ and add
        ```config
        country=ID #Follow ISO country code https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes
        network={
            ssid="SSID"
            psk="PASSWORD"
        }
        ```
    4. select *Menu > Edit > EOL Conversion > Unix OSx* and save the file
    5. Remove your SD Card from your pc and put the SD card to raspberry pi
    6. Power the raspberry pi
    7. Open your WIFI admin -> goto DHCP -> List of client -> write down raspberry pi IP
    8. ssh to your raspberry pi `ssh pi@ip_adress`
    9. enter default password `raspberry`
    10. change your default password using `sudo passwd pi`
    11. update the pi using `sudo apt-get update` & `sudo apt-get upgrade`
    12. voila you have finish the setup
- #### Headless USB Setup
    1. Same like Headless wifi setup , but in adition you can skip adding **wpa_suplciant.conf**
    2. Mount SD card to your PC , in root of the SD card open **config.txt** in notepad++  and add
        ```bash
        dtoverlay=dwc2
        ```
        then save the file
    3. then open **cmdline.txt** in notepad++, after **rootwait** append following text with spacing
        ```bash
        modules-load=dwc2,g_ether
        ```
    4. Plug your raspberry pi through USB , **DONT PLUG THE USB TO POWER SLOT BUT TO USB SLOT**
    5. Follow all the step from Headless Wifi , but for the ssh you should use command `ssh pi@raspberry.local`
    6. Voila you have finished the setup

## Post Setup
in this section we will be installing some of important but not required software like firewall and other security 
- Updating SSH , run `sudo apt install openssh-server`
- Installing firewall ***Recommended***
    1. install ufw `sudo apt install ufw`
    2. allow ssh access with `sudo ufw allow ssh` command
    3. Enable the firewall with `sudo ufw enable`
    4. check firewall status with `sudo ufw status`