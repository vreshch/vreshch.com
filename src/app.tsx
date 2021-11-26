import {IndexPage, CVPage, InterestsPage, ProjectsPage, ContactsPage, ChemistryJSPage } from './pages/index';
import React, { useState  } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import classNames from 'classnames';


import {
  BrowserRouter as Router,
  Switch,
  NavLink,
  Route
} from "react-router-dom";

const Sidebar = ()=> {
    const [closed, setClosed] = useState(true);

    const sidebarClass = classNames({
      "jcw-sidebar": true,
      "closed": closed,
    });

    return (
        <div className={sidebarClass}>
            <div className="jcw-sidebar-mobile-nav bg-faded">
                <button className="navbar-toggler" onClick={()=> setClosed(!closed)} >☰</button>
            </div>
            <div className="jcw-sidebar-wrap">
                <NavLink to="/" className={(isActive ) => `jcw-sidebar-item ${isActive ? 'active' : ''}`} >Home</NavLink>
                <NavLink to="/cv" className={(isActive) => `jcw-sidebar-item ${isActive ? 'active' : ''}`} >Curriculum Vitae</NavLink>
                <NavLink to="/interests" className={(isActive) => `jcw-sidebar-item ${isActive ? 'active' : ''}`} >Interests</NavLink>
                <NavLink to="/projects" className={(isActive) => `jcw-sidebar-item ${isActive ? 'active' : ''}`} >Projects</NavLink>
                <NavLink to="/chemistry-js" className={(isActive) => `jcw-sidebar-item ${isActive ? 'active' : ''}`} >Chemistry JS</NavLink>
                <NavLink to="/contacts" className={(isActive) => `jcw-sidebar-item ${isActive ? 'active' : ''}`} >Contacts</NavLink>
            </div>
        </div>
    )
}

function MainLayout() {
    return (
      <Router>
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
                    <div className="app-content col-sm-12 col-md-9">
                      <Switch>
                          <Route exact path="/"><IndexPage /></Route>
                          <Route path="/cv"><CVPage /></Route>
                          <Route path="/interests"><InterestsPage /></Route>
                          <Route path="/projects"><ProjectsPage/></Route>
                          <Route path="/contacts"><ContactsPage/></Route>
                          <Route path="/chemistry-js"><ChemistryJSPage /></Route>
                      </Switch>
                    </div>
                </div>
                <footer>
                    <hr />© Vreshch V.D. {(new Date()).getFullYear()}
                </footer>
            </div>
        </div>
        </Router>
    );
}

export default MainLayout;

