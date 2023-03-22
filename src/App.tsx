import React, { Suspense, useEffect } from 'react';
import { Redirect, Route, Switch, useHistory, useLocation, withRouter } from 'react-router-dom';
import ReactGA from 'react-ga';
import ReactPixel from 'react-facebook-pixel';

import './App.css';
import { Routing, IRoute } from './util/routes'
import ToastFactory from './components/modules/toast-factory/ToastFactory';
import { checkAuth, appValuesAction, refreshUserDetails, checkForVerificationStatusToast, signOutAction } from './redux/actions/actions';
import { paths } from './util/paths';
import { useSelector } from 'react-redux';
import AppLoader from './components/modules/app-loader/AppLoader';
import { AppFooter } from './components/modules/app-footer/AppFooter';
import FloatingWhatsAppWidget from './components/modules/floating-whatsapp-widget/FloatingWhatsAppWidget';
import { ConfirmDialog } from 'components/modules/confirm-dialog/ConfirmDialog';
import SignIn from 'components/pages/sign-in/SignIn';
import { isProductionEnv } from './util/util';
import endpoints from 'util/endpoints';
import http from 'util/http';

function App() {
  const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated)
  const showAppLoader = useSelector((state: any) => state.loading);
  const confirmDialog = useSelector((state: any) => state.confirmDialog);

  const history = useHistory();
  const location = useLocation();

  ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS as any);
  ReactPixel.init('664533234865734');

  const RouteChangeTracker = ({ history }: any) => {
    history.listen((location: any, action: any) => {
      ReactGA.set({ page: location.pathname });
      ReactGA.pageview(location.pathname);
      ReactPixel.pageView();
    });
    return <div></div>;
  };
  const ReactPageTracker = withRouter(RouteChangeTracker);

  useEffect(() => {
    checkAuth()
    appValuesAction()
  }, [isAuthenticated])

  useEffect(() => {
    refreshUserDetails((user: any) => checkForVerificationStatusToast(user, history));
  }, [])

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    http.get(endpoints.SESSION)
      .then((res) => {
        if (parseInt(res.data.status) !== 200) {
          signOutAction();
        }
      })
      .catch((err) => {
        signOutAction();
      })
  }, [location.pathname]);


  return (
    <React.Fragment>
      <ToastFactory />
      <AppLoader show={showAppLoader} />
      {confirmDialog.open ? <ConfirmDialog /> : <></>}
      <FloatingWhatsAppWidget />
      <ReactPageTracker />
      <Switch>
        {
          Routing.map((route: IRoute, i: number) => (
            route.protected ?

              (
                isAuthenticated === undefined ?
                  <AppLoader show={true} />
                  :
                  (
                    // !isAuthenticated ?
                    // // (<Redirect key={i+paths.SIGN_IN} to={paths.SIGN_IN} />)
                    // <></>
                    // :
                    (
                      <Route path={route.path} render={(() => (

                        <React.Fragment>

                          {
                            isAuthenticated ?
                              <Suspense fallback={<AppLoader show={true} />}>
                                <route.component key={i} />
                                {
                                  route.footerless ? <></> : <AppFooter />
                                }
                              </Suspense>

                              :
                              <Suspense fallback={<AppLoader show={true} />}>
                                <SignIn />
                                <AppFooter />
                              </Suspense>

                          }

                        </React.Fragment>

                      ))} key={route.path + i} exact={(route.exact === false) ? false : true} />
                    )
                  )
              )
              :
              (
                <Route
                  path={route.path}
                  render={(() => (
                    <Suspense fallback={<AppLoader show={true} />}>
                      <route.component {...route.props} />
                      {
                        route.footerless ? <></> : <AppFooter />
                      }
                    </Suspense>
                  ))}
                  key={route.path + i}
                  exact={(route.exact === false) ? false : true}
                />
              )
          ))
        }
      </Switch>

    </React.Fragment>
  );
}

export default App;
