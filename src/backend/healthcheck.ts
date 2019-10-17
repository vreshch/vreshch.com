import * as fs from "fs";
import * as os from "os";
import * as path from "path";

import { Request, Response } from "express";
const packageJSON = JSON.parse(fs.readFileSync(path.join(__dirname, "../../package.json"), "utf8"));
const { name, version } = packageJSON;

export function healthCheck(req: Request, res: Response) {
    res.header("Content-Type", "application/json");
    res.status(200).send(JSON.stringify({
        status: "OK",
    }, null, 4)).end();
}

export function statusCheck(req: Request, res: Response) {
    res.header("Content-Type", "application/json");
    res.status(200).send(JSON.stringify({
        status: "OK",
        name,
        version,
        pid: process.pid,
        memoryUsage: Math.round(process.memoryUsage().rss / 1024 / 1024) + "M",
        uptime: process.uptime(),
        NODE_ENV: process.env.NODE_ENV,
        hostname: os.hostname(),
    }, null, 4)).end();
}
