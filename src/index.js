import './style/index.css';
import React from 'react';
import { AppContextProvider } from "./context/teams";
import { TeamProfileContextProvider } from "./context/teamProfile";
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import ReactDOM from "react-dom";
import { Route } from "react-router-dom";
import TeamProfileComponent from './components/TeamProfileComponent';
import TeamsComponent from './components/TeamsComponent';

function Routes() {
    return (
        <Router>
            <Switch>
                <Route exact path="/teams/:teamId" component={TeamProfileComponent} />
                <Route exact path="/teams" component={TeamsComponent} />
            </Switch>
        </Router>
    );
}
ReactDOM.render(
    <AppContextProvider>
        <TeamProfileContextProvider>
            <Routes />
        </TeamProfileContextProvider>
    </AppContextProvider>
    , document.getElementById('root')
)