const homedir = require('os').homedir()
const path = require('path')
const fs = require('fs')

module.exports = function saveFile(folder, filename, buffer) {

    const dirPath = path.join(homedir, folder)
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath)
    }

    const filePath = path.join(homedir, folder, filename)

    const writeStream = fs.createWriteStream(filePath)
    writeStream.write(buffer)
    writeStream.end()
}