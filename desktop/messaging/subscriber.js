const mqtt = require('mqtt')
const fileSaver = require('../messaging/fileSaver')
const path = require('path')

function subscriber(ip, port, channel) {

    const client = mqtt.connect(`mqtt://${ip}:${port}`)

    client.on('connect', function () {
        client.subscribe(channel)
    })

    client.on('message', function (topic, message) {
        const buffer = Buffer.from(message)
        console.log(buffer)
        var fileName = 'testFile.jpg'
        fileSaver(topic, fileName, buffer)
    })
}

module.exports = subscriber
