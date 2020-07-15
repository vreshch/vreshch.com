import { createBrowserHistory } from "history";
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as ReactGA from "react-ga";
import { Router } from "react-router";
import { Routes } from "../common/routes";

import { getMetaDataFromState } from "../common/utils";

const browserHistory = createBrowserHistory();

if (process.env.NODE_ENV !== "development") {
    ReactGA.initialize("UA-125802766-3");
    ReactGA.set({ page: location.pathname });
    ReactGA.pageview(location.pathname);
}

browserHistory.listen((location) => {
    const meta = getMetaDataFromState({
        route: location.pathname,
    });
    document.title = meta.title || "";

    if (process.env.NODE_ENV !== "development") {
        ReactGA.set({ page: location.pathname });
        ReactGA.pageview(location.pathname);
    }
});

ReactDOM.render(
    <Router children={Routes} history={browserHistory} />,
    document.getElementById("app"),
);
