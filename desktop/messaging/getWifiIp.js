os = require('os')

// I'm not sure how this function will work on other devices
// it simply filters the networkInterfaces for Wi-Fi
// there may be a more reliable way to get this IP
// but the other methods I have explored to not give
// one that is available over the network

module.exports = function getWifiIp() {
    const networkInterfaces = os.networkInterfaces()
    const wifiInterface = networkInterfaces['Wi-Fi']
    const wifiIp = wifiInterface.find(value => value.family === 'IPv4')

    return wifiIp.address
}