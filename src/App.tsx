import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import './App.global.css';

import Routes from './routes';
import Layout from './components/Layout';

import HomeScreen from './screens/Home';
import ConfigurationScreen from './screens/Configuration';

export default function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path={Routes.Home.path} component={HomeScreen} />
          <Route
            path={Routes.Configuration.path}
            component={ConfigurationScreen}
          />
        </Switch>
      </Layout>
    </Router>
  );
}
