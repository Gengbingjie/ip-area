import express, { Router } from "express";
import serverless from "serverless-http";

const app = express();

const router = Router();

app.use("/api/", router.get('/', (req, res) => {
    console.log('req')
    console.log(req)
    let ip: string = req.headers['x-forwarded-for']?.toString() ||
        req.ip ||
        req.socket.remoteAddress || '';
    if (ip.split(',').length > 0) {
        ip = ip.split(',')[0]
    }
    ip = ip.substr(ip.lastIndexOf(':') + 1, ip.length);
    console.log('ip')
    console.log(ip)
    res.send(ip)
}));

export const handler = serverless(app);