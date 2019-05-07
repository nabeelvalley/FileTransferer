const mqtt = require('mqtt')

function subscriber(ip, port, channel) {

    const client = mqtt.connect(`mqtt://${ip}:${port}`)

    client.on('connect', function () {
        client.subscribe(channel)
    })

    client.on('message', function (topic, message) {
        const buffer = new Buffer(message)
        console.log(buffer)
    })
}

module.exports = subscriber
