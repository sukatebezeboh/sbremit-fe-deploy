import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';
import {Routing, IRoute} from './util/routes'
import ToastFactory from './components/ui-components/toast-factory/ToastFactory';

function App() {
  return (
    <React.Fragment>
      <ToastFactory /> 
      <Switch>
        {
            Routing.map((route: IRoute, i: number)=>(
              <Route path={route.path} render={(()=>(<route.component {...route.props} />))}  key={route.path+i} exact={(route.exact===false) ? false : true}/>
            ))
        }
      </Switch>
    </React.Fragment>
  );
}

export default App;
