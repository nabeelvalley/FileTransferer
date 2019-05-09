const mqtt = require('mqtt')
const fileSaver = require('../messaging/fileSaver')
const path = require('path')

function subscriber(ip, port, channel) {

    const client = mqtt.connect(`mqtt://${ip}:${port}`)

    client.on('connect', function () {
        client.subscribe(channel)
    })

    client.on('message', function (topic, context) {
        const message = JSON.parse(context.toString())
        const buffer = Buffer.from(message.data)
        const fileName = message.name
        console.log(buffer)
        fileSaver(topic, fileName, buffer)
    })
}

module.exports = subscriber
