const mosca = require('mosca')
const getWifiIp = require('./getWifiIp')
const publicIp = require('public-ip');

function broker(mqttPort, httpPort) {
    (async () => console.log('public ip', await publicIp.v4()))()

    const settings = {
        port: mqttPort,
        http: {
            port: httpPort,
            bundle: true,
            static: './'
        }
    }

    const server = new mosca.Server(settings)

    server.on('ready', async () => {
        const ip = getWifiIp()

        const mqttURL = `mqtt://${ip}:${mqttPort}`
        const httpURL = `ws://${ip}:${httpPort}`
        console.log('MQTT Server Listening on', mqttURL)
        console.log('HTTP Server listening on', httpURL)

    })

    server.on('clientConnected', (client) => {
        console.log('client connected', client.id)
    })
}

module.exports = broker
