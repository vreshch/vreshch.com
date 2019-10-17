import * as classNames from "classnames";
import * as React from "react";
import { NavLink } from "react-router-dom";

if (process.env.BROWSER) {
    // tslint:disable-next-line
    require("./sidebar.less");
}

export class Sidebar extends React.Component {

    public state: {
        closed: boolean,
    };

    constructor() {
        super();
        this.toggleMenu = this.toggleMenu.bind(this);
        this.render = this.render.bind(this);
        this.state = {
            closed: true,
        };
    }

    public toggleMenu() {
        (this as any).setState({
            closed: !this.state.closed,
        });
    }

    public render() {
        const sidebarClass = classNames({
            "jcw-sidebar": true,
            "closed": this.state.closed,
        });

        return (
            <div className={sidebarClass}>
                <div className="jcw-sidebar-mobile-nav bg-faded">
                    <button className="navbar-toggler" onClick={this.toggleMenu}>☰</button>
                </div>
                <div className="jcw-sidebar-wrap">
                    <NavLink exact={true} to="/" className="jcw-sidebar-item" activeClassName="active">Home</NavLink>
                    <NavLink to="/cv.html" className="jcw-sidebar-item" activeClassName="active">Curriculum Vitae</NavLink>
                    <NavLink to="/interests.html" className="jcw-sidebar-item" activeClassName="active">Interests</NavLink>
                    <NavLink to="/projects.html" className="jcw-sidebar-item" activeClassName="active">Projects</NavLink>
                    <NavLink to="/chemistry-js.html" className="jcw-sidebar-item" activeClassName="active">Chemistry JS</NavLink>
                    <NavLink to="/contacts.html" className="jcw-sidebar-item" activeClassName="active">Contacts</NavLink>
                </div>
            </div>
        );
    }
}
