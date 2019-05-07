const mosca = require('mosca')
const dns = require('dns')

function broker(port) {

    const settings = {
        port: port
    }

    const server = new mosca.Server(settings)

    server.on('ready', function () {
        require('dns').lookup(require('os').hostname(), function (err, add, fam) {
            if (err) console.log(err)
            const brokerURL = `mqtt://${add}:${port}`
            console.log('MQTT Server Listening on', brokerURL)
        })
    })
}

module.exports = broker
