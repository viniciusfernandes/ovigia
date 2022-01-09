1) To run the app in your device try to follow this link
https://reactnative.dev/docs/running-on-device

2) Conect your device in some USB port 
3) In Setting from your device got to the System and press Build Number seven times
4) Go to the Developer Options and enable Debug USB
5) List your device running "lsusb" in the shell. My result is something like this: Bus 001 Device 008: ID 22b8:2e83 Motorola PCS motorola one macro
6) My device id is "22b8" from the previous item
7) Type the command below to in order to getup and running the app on your device:
echo 'SUBSYSTEM=="usb", ATTR{idVendor}=="22b8", MODE="0666", GROUP="plugdev"' | sudo tee /etc/udev/rules.d/51-android-usb.rules
8) Check if your device is properly connected in the ADB (android debug bridge): adb devices
9) WARNING: probably you have to enable the USB Connection again before to go ahead