import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import './App.global.css';

import Routes from './routes';
import Layout from './components/Layout';
import HomeScreen from './screens/Home';

export default function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          {/* <Route path="/add-game" component={AddGame} /> */}
          <Route exact path={Routes.Home.path} component={HomeScreen} />
        </Switch>
      </Layout>
    </Router>
  );
}
