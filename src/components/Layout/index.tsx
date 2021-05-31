import React from 'react';

import Header from './Header';
import Footer from './Footer';

const Layout: React.FunctionComponent = ({ children }) => {
  return (
    <div className="h-screen flex flex-col 4k:cursor-none">
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
