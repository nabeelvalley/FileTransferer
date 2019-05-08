const fs = require('fs')
const path = require('path')
const mqtt = require('mqtt')

console.log(process.argv)

const fileName = ''

const filePath = path.join(__dirname, '../../.transfer/send/image.jpg')

const ip = process.argv[2] || 'localhost'
const port = process.argv[3] || 1883
const channel = process.argv[4] || 'file-transfer'

const fileContents = fs.readFileSync(filePath)

var client = mqtt.connect(`mqtt://${ip}:${port}`)

client.on('connect', function () {
    console.log('Send file')
    client.publish(channel, fileContents)
})