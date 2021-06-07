import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Routes from '../routes';
import Menu from '../components/MenuConfiguration/Menu';
import LibraryConfiguration from './LibraryConfiguration';
import ApplicationConfiguration from './ApplicationConfiguration';
import PluginsConfiguration from './PluginsConfiguration';

const Configuration = () => {
  return (
    <div className="flex flex-1 py-4 px-8 flex-col h-full">
      <Menu />
      <Switch>
        <Route path={Routes.LibraryConfiguration.path}>
          <LibraryConfiguration />
        </Route>
        <Route path={Routes.ApplicationConfiguration.path}>
          <ApplicationConfiguration />
        </Route>
        <Route path={Routes.PluginsConfiguration.path}>
          <PluginsConfiguration />
        </Route>
      </Switch>
    </div>
  );
};

export default Configuration;
