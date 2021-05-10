import React from 'react'
import { Switch, Route } from "react-router-dom";
import MainLayout from './views/MainLayout'
import Home from './views/Home';
import Users from './views/Users';
import Jobs from './views/Jobs';
import Company from './views/Company/Company';

const MainRouter = () => {
  return (<>
    <Switch>
      <MainLayout >

        <Route exact path="/hr/dashboard/" component={Home} />
        <Route exact path="/hr/users/" component={Users} />
        <Route exact path="/hr/jobs/" component={Jobs} />
        <Route exact path="/hr/company/" component={Company} />
      </MainLayout>
    </Switch>


  </>)
}

export default MainRouter