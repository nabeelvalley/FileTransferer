const mqtt = require('mqtt')

const client = mqtt.connect('mqtt://localhost:1883')

var messageNum = 0

client.on('connect', function () {
    setInterval(function () {
        console.log('Send Message No.:', messageNum)
        client.publish('counter', messageNum.toString())
        messageNum++
    }, 5000, messageNum)
})