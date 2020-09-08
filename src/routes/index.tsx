import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';
import SingIn from '../pages/SingIn';
import SingUp from '../pages/SingUp';
import DashBoard from '../pages/DashBoard';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SingIn} />
    <Route path="/sing-up" component={SingUp} />

    <Route path="/dashboard" component={DashBoard} isPrivate />
  </Switch>
);

export default Routes;
