const { app, BrowserWindow } = require('electron')
const path = require('path')
const url = require('url')
const dns = require('dns')

const mqttBroker = require('./messaging/broker')
const mqttSubscriber = require('./messaging/subscriber')

let win
let ipAddress
let brokerPort = 1883
let channel = 'file-transfer'

function startUp() {
    // Start the MQTT Broker
    mqttBroker(brokerPort)
    dns.lookup(require('os').hostname(), function (err, add, fam) {
        ipAddress = add
        console.log('IP Address:', ipAddress)
        mqttSubscriber(ipAddress, brokerPort, channel)
    })

    // Create the browser window.
    win = new BrowserWindow({ width: 800, height: 600 })

    // and load the index.html of the app.
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'app/index.html'),
        protocol: 'file:',
        slashes: true
    }))

    // Open the DevTools.
    win.webContents.openDevTools()

    // Emitted when the window is closed.
    win.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null
    })
}

app.on('ready', startUp)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (win === null) {
        startUp()
    }
})


dns.lookup(require('os').hostname(), function (err, add, fam) {
    ipAddress = add
    console.log('IP Address:', add)
})