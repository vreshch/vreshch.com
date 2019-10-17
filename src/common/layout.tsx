import * as React from "react";

if (process.env.BROWSER) {
    // tslint:disable-next-line
    require("bootstrap/dist/css/bootstrap.min.css");
    // tslint:disable-next-line
    require("./layout.less");
}
import { Sidebar } from "./components/sidebar/sidebar";

export class Layout extends React.Component {
    constructor() {
        super();
    }

    public render() {
        return (
            <div className="app">
                <div className="app-container container">
                    <div className="app-logo">
                        <div className="app-logo-img" />
                        <h2 className="app-logo-title">Vreshch Volodymyr</h2>
                        <h3 className="app-logo-subtitle">:: Homepage ::</h3>
                    </div>
                    <div className="app-wrap row">
                        <div className="app-sidebar col-sm-12 col-md-3">
                            <Sidebar />
                        </div>
                        <div className="app-content col-sm-12 col-md-9">{(this as any).props.children}</div>
                    </div>
                    <footer>
                        <hr />© Vreshch V.D. {(new Date()).getFullYear()}
                    </footer>
                </div>
            </div>
        );
    }
}
