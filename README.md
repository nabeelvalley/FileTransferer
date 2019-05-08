# File Transfrer

(Name in progress)

This is a simple file transfering application for transfering files between Desktop and Mobile Devices

## Desktop

The desktop app makes use of an Electron application running a Mocca MQTT Broker and is subscribed to a `file-transfer` channel, to which connected devices can send content (so far it just logs out the content)

## Mobile

This is an Ionic app making use of a Browserified version of the MQTT.js library that connects to the Broker hosted on the desktop application

## To Do

A lot still needs to be done before the application is actually functional

A broad roadmap for the activities still needed is:

0. Document code (this probably won't be 0. but it's a nice thought)
1. IP address on Mobile should not be hardcoded [Use network interfaces](https://ionicframework.com/docs/native/network-interface) as in the case of the desktop application 
2. Mobile client to select and send file/s
3. Desktop client to save file (even to just a default directory for now)
4. Devices to 'discover' each other across a network
5. Devices to use specific channels for their communication
6. Desktop client to send file/s to mobile client
7. Work on Mobile UI
8. Work on Desktop UI


## References

- [Mosca](https://github.com/mcollina/mosca)
- [Setting up Private MQTT Broker with Node.js](https://medium.com/@alifabdullah/setting-up-private-mqtt-broker-using-mosca-in-node-js-c61a3c74f952)