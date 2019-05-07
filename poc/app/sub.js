const mqtt = require('mqtt')
const path = require('path')
const fs = require('fs')

const filePath = path.join(__dirname, '../../.transfer/received/image.jpg')

const client = mqtt.connect('mqtt://localhost:1883')

client.on('connect', function () {
    client.subscribe('counter')
    client.subscribe('file-transfer')
})

client.on('message', function (topic, message) {
    const buffer = Buffer.from(message)
    console.log(buffer)

    const writeStream = fs.createWriteStream(filePath)
    writeStream.write(buffer)
    writeStream.end()
})