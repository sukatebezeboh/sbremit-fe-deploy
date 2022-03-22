import React, {useEffect} from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import {useIdleTimer} from 'react-idle-timer/dist/modern';
import './App.css';
import {Routing, IRoute} from './util/routes'
import ToastFactory from './components/modules/toast-factory/ToastFactory';
import { checkAuth, appValuesAction, refreshUserDetails, checkForVerificationStatusToast, signOutAction } from './redux/actions/actions';
import { paths } from './util/paths';
import { useSelector } from 'react-redux';
import AppLoader from './components/modules/app-loader/AppLoader';
import { AppFooter } from './components/modules/app-footer/AppFooter';
import ComingSoon from './components/modules/coming-soon/ComingSoon';
import FloatingWhatsAppWidget from './components/modules/floating-whatsapp-widget/FloatingWhatsAppWidget';
import { ConfirmDialog } from 'components/modules/confirm-dialog/ConfirmDialog';

function App() {
  const isAuthenticated = useSelector((state: any)=> state.auth.isAuthenticated)
  const showAppLoader = useSelector((state: any)=>state.loading);
  const confirmDialog = useSelector((state: any)=>state.confirmDialog);

  const history = useHistory()
  
  useEffect(() => {
    checkAuth()
    appValuesAction()
  }, [isAuthenticated])

  useEffect(() => {
    refreshUserDetails((user: any) => checkForVerificationStatusToast(user, history));
  }, [])

  return (
    <React.Fragment>
      <ToastFactory />
      <AppLoader show={showAppLoader}/>
      {confirmDialog.open ? <ConfirmDialog /> : <></>}
      <FloatingWhatsAppWidget />
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
