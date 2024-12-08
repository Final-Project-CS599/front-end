import React from 'react';
// import { Helmet } from 'react-helmet';
import { HelmetProvider, Helmet } from 'react-helmet-async';

const Home = () => {
  return <>
  <HelmetProvider>
    <Helmet>
      <meta name='description' content='' />
      <title>Home</title>
    </Helmet>
    <h1>Home</h1>
    </HelmetProvider>
  </>;
};

export default Home;
