// TODO sækja og setja upp react router
import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Layout } from './components/layout/Layout';

import { Index } from './pages/Index';
import { NewsPage } from './pages/News';
import { NotFound } from './pages/NotFound';

export default function App() {
  return (
    <Layout title="RÚV fréttir">
      <Switch>
          <Route exact path="/" component={Index}/>
          <Route exact path="/:id" component={NewsPage} />
          <Route component={NotFound} />
      </Switch>
      <hr/>
      <p>Fréttir frá <a href='https://www.ruv.is/'>RÚV</a></p>
    </Layout>
  );
}
