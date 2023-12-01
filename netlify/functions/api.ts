import express, { Router } from "express";
import geoip from 'geoip-lite'
import serverless from "serverless-http";


const app = express();

const router = Router();

app.use("/api/", router.get('/', (req, res) => {
    let ip: string = req.headers['x-forwarded-for']?.toString() ||
        req.ip ||
        req.socket.remoteAddress || '';
    if (ip.split(',').length > 0) {
        ip = ip.split(',')[0]
    }
    ip = ip.substr(ip.lastIndexOf(':') + 1, ip.length);
    let area = geoip.lookup(ip)
    res.send(res.json(area))
}));

export const handler = serverless(app);