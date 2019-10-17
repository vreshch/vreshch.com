import * as React from "react";
import { Route, Switch } from "react-router";
import { Layout } from "./layout";

import {
    ChemistryJSPage,
    ContactsPage,
    CVPage,
    IndexPage,
    InterestsPage,
    NotFoundPage,
    ProjectsPage,
} from "./pages";

const RendererNotFound = ({ staticContext }) => {
    if (staticContext) {
        staticContext.status = 404;
    }
    return <NotFoundPage />;
};

export const Routes = (
    <Layout>
        <Switch>
            <Route exact={true} path="/" component={IndexPage} />
            <Route component={CVPage} path="/cv.html" />
            <Route component={InterestsPage} path="/interests.html" />
            <Route component={ProjectsPage} path="/projects.html" />
            <Route component={ContactsPage} path="/contacts.html" />
            <Route component={ChemistryJSPage} path="/chemistry-js.html" />
            <Route render={RendererNotFound} path="*" />
        </Switch>
    </Layout>
);

export default Routes;
