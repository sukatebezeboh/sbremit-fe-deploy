import React, {useEffect} from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import './App.css';
import {Routing, IRoute} from './util/routes'
import ToastFactory from './components/ui-components/toast-factory/ToastFactory';
import { checkAuth, appValuesAction } from './redux/actions/actions';
import { paths } from './util/paths';
import { useSelector } from 'react-redux';
import AppLoader from './components/ui-components/app-loader/AppLoader';
import { AppFooter } from './components/ui-components/app-footer/AppFooter';
import ComingSoon from './components/ui-components/coming-soon/ComingSoon';

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
      <ComingSoon />
      <Switch>
        {
            Routing.map((route: IRoute, i: number) => (
              route.protected ?
                  (
                    isAuthenticated === undefined ?
                    <AppLoader show={true} />
                    :
                    (
                        !isAuthenticated ?
                        (<Redirect key={i+paths.SIGN_IN} to={paths.SIGN_IN} />)
                        :
                        (
                                <Route path={route.path} render={(()=>(

                                        <React.Fragment>

                                            <route.component key={i} />
                                            {
                                              route.footerless ? <></> :  <AppFooter/>
                                            }

                                        </React.Fragment>

                                ))}  key={route.path+i} exact={(route.exact===false) ? false : true}/>
                        )
                    )
                  )
              :
              (

                    <Route path={route.path} render={(()=>(
                                  <React.Fragment>

                                        <route.component {...route.props} />
                                        {
                                          route.footerless ? <></> :  <AppFooter/>
                                        }

                                  </React.Fragment>

                    ))}  key={route.path+i} exact={(route.exact===false) ? false : true}/>
              )
            ))
        }
      </Switch>

    </React.Fragment>
  );
}

export default App;
