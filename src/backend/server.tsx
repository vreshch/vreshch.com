import * as React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { healthCheck, statusCheck } from "./healthcheck";

import { Routes } from "../common/routes";

import * as Promise from "bluebird";
import * as escapeHTML from "lodash.escape";

import * as path from "path";

import * as bodyParser from "body-parser";
import * as timeout from "connect-timeout";
import * as express from "express";

import { getMetaDataFromState } from "../common/utils";

import * as fs from "fs";

const fileContent = fs.readFileSync(
  path.join(__dirname, "/../static/index.html"),
"utf8");

function renderHTML(componentHTML, metaData) {
    let html = fileContent;
    if (metaData.title) {
        html = html.replace(
          "<title>Vreshch Volodymyr Homepage</title>",
          "<title>" + escapeHTML(metaData.title) + "</title>",
        );
    }
    if (metaData.description) {
        html = html.replace(
          '<meta name="description" content="">',
          '<meta name="description" content="' + escapeHTML(metaData.description) + '">',
        );
    }
    html = html.replace(
        '<div id="app"></div>',
        '<div id="app">' + componentHTML + "</div>",
    );

    return html;
}

function App() {
    return Routes;
}

function createExpressApp() {

    const app = express();

    app.disable("x-powered-by");

    app.use(timeout("5s"));

    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(express.static(path.join(__dirname, "/../static"), {index: false}));

    app.get("/node-ping", (req, res) => {
        res.end("pong");
    });

    app.get("/hc", healthCheck);
    app.get("/status", statusCheck);

    app.use((req, res) => {
        const context = {
            status: 200,
        };

        const content = (
            <StaticRouter location={req.url} context={context}>
                <App />
            </StaticRouter>
        );
        const componentHTML = renderToString(content);
        const metaData = getMetaDataFromState({
            route: req.url,
        });

        const HTML = renderHTML(componentHTML, metaData);
        res
          .header("Content-Type", "text/html; charset=utf-8")
          .status(context.status)
          .end(HTML);
    });

    return app;
}

export function runServer(PORT) {
    return new Promise((resolve, reject) => {
        const app = createExpressApp();

        app.listen(PORT, "0.0.0.0", () => {
            resolve(app);
        });
    });
}
