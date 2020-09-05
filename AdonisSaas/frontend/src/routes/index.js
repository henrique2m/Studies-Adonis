import React from 'react';
import {  Router, Switch } from 'react-router-dom';

import history from './history';

import Main from '../pages/Main';
import SignIn from '../pages/Auth/SignIn';
import SignUp from '../pages/Auth/SignUp'
import Private from './private';
import Guest from './guest';

const Routes = () => (
    <Router history={history} >
        <Switch>
            <Guest path="/signin" component={SignIn} />
            <Guest path="/signup" component={SignUp} />
            <Private path="/" exact component={Main} />
        </Switch>   
    </Router>
    
);

export default Routes;