import React, {useEffect} from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import './App.css';
import {Routing, IRoute} from './util/routes'
import ToastFactory from './components/ui-components/toast-factory/ToastFactory';
import { checkAuth, appValuesAction } from './redux/actions/actions';
import { paths } from './util/paths';
import { useSelector } from 'react-redux';
import AppLoader from './components/ui-components/app-loader/AppLoader';

function App() {
  const isAuthenticated = useSelector((state: any)=> state.auth.isAuthenticated)
  const showAppLoader = useSelector((state: any)=>state.loading);

  useEffect(() => {
    checkAuth()
    appValuesAction()
  }, [isAuthenticated])
  
  return (
    <React.Fragment>
      <ToastFactory />
      <AppLoader show={showAppLoader}/>
      <Switch>
        {
            Routing.map((route: IRoute, i: number)=>(
              route.protected ?
                 ( !isAuthenticated ?
                  <Redirect key={i+paths.SIGN_IN} to={paths.SIGN_IN} />
                  :
                  <Route path={route.path} render={(()=>(<route.component key={i} />))}  key={route.path+i} exact={(route.exact===false) ? false : true}/>
                 )
              :
              <Route path={route.path} render={(()=>(<route.component {...route.props} />))}  key={route.path+i} exact={(route.exact===false) ? false : true}/>
            ))
        }
      </Switch>
    </React.Fragment>
  );
}

export default App;
