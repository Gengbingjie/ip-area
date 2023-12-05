import express, { Router } from "express";
import geoip from 'geoip-lite'
import serverless from "serverless-http";


const app = express();

const router = Router();

app.use("/api/", router.get('/ip', (req, res) => {
    let ip: string
    let info: object = {}
    if (req.query.ip) {
        ip = req.query.ip.toString()
    } else {
        ip = req.headers['x-forwarded-for']?.toString() ||
            req.ip ||
            req.socket.remoteAddress || '';
        if (ip.split(',').length > 0) {
            ip = ip.split(',')[0]
        }
        ip = ip.substr(ip.lastIndexOf(':') + 1, ip.length);
    }
    info = geoip.lookup(ip) as object
    if (!Object.keys(info).length) {
        info = {
            ip: ip,
            region: null
        }
    } else {
        info['ip'] = ip
    }
    res.send(info)
}));

export const handler = serverless(app);