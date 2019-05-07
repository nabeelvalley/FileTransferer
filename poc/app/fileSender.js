const fs = require('fs')
const path = require('path')
const mqtt = require('mqtt')

console.log(process.argv)

const fileName = ''

const filePath = path.join(__dirname, '../../.transfer/send/image.jpg')

const fileContents = fs.readFileSync(filePath)

var client = mqtt.connect('mqtt://localhost:1883')

client.on('connect', function () {
    console.log('Send file')
    client.publish('counter', fileContents)
})