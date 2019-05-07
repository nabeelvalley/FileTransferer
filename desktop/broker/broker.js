var mosca = require('mosca')

function broker(port) {

    var settings = {
        port: port
    }

    var server = new mosca.Server(settings)

    server.on('ready', function () {
        console.log('MQTT Server Listening on', port);
    })
}

module.exports = broker
