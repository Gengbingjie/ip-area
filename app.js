const express = require('express');
const app = express()

app.use('/', function (req, res) {
    console.log('req')
    console.log(req)
    let ip = req.headers['x-forwarded-for'] ||
        req.ip ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress || '';
    if (ip.split(',').length > 0) {
        ip = ip.split(',')[0]
    }
    ip = ip.substr(ip.lastIndexOf(':') + 1, ip.length);
    console.log('ip')
    console.log(ip)
})
app.listen(5000, () => {
    console.log('5000端口被启用')
})