import React, {useEffect} from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';
import {Routing, IRoute} from './util/routes'
import ToastFactory from './components/ui-components/toast-factory/ToastFactory';
import { appValuesAction } from './redux/actions/actions';

function App() {

  useEffect(() => {
    appValuesAction()
  }, [])
  
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
