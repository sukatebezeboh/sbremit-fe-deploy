import React, { Suspense, useEffect } from "react";
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation,
  withRouter,
} from "react-router-dom";
import ReactGA from "react-ga";
import ReactPixel from "react-facebook-pixel";
import axios from "axios";

import "./App.css";
import { Routing, IRoute } from "./util/routes";
import ToastFactory from "./components/modules/toast-factory/ToastFactory";
import {
  checkAuth,
  appValuesAction,
  refreshUserDetails,
  checkForVerificationStatusToast,
  signOutAction,
} from "./redux/actions/actions";
import { paths } from "./util/paths";
import { useSelector } from "react-redux";
import AppLoader from "./components/modules/app-loader/AppLoader";
import { AppFooter } from "./components/modules/app-footer/AppFooter";
import FloatingWhatsAppWidget from "./components/modules/floating-whatsapp-widget/FloatingWhatsAppWidget";
import { ConfirmDialog } from "components/modules/confirm-dialog/ConfirmDialog";
import Login from "components/pages/new-auth-pages/views/Login";
import { isProductionEnv } from "./util/util";
import http from "util/http";
import endpoints from "util/endpoints";
import AppLayout from "components/pages/transcations-flow/app-layout/AppLayout";
import RouteConfig from "components/pages/transcations-flow/app-layout/RouteConfig";

function App() {
  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated
  );
  const showAppLoader = useSelector((state: any) => state.loading);
  const confirmDialog = useSelector((state: any) => state.confirmDialog);

  const history = useHistory();
  const location = useLocation();

  ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS as any);
  ReactPixel.init("664533234865734");

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
    checkAuth();
    appValuesAction();
  }, [isAuthenticated]);

  useEffect(() => {
    refreshUserDetails((user: any) =>
      checkForVerificationStatusToast(user, history)
    );
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    http
      .get(endpoints.SESSION)
      .then((res) => {
        if (parseInt(res.data.status) !== 200) {
          signOutAction();
        }
      })
      .catch((err) => {
        signOutAction();
      });
  }, [location.pathname]);

  useEffect(() => {
    axios
      .get("https://api.ipify.org?format=json")
      .then((ipResponse) => {
        window.localStorage.setItem("IP_Address", ipResponse?.data?.ip);
      })
      .catch((error) => console.error("Error getting Ip:", error));
  }, []);

  return (
    <React.Fragment>
      <ToastFactory />
      <AppLoader show={showAppLoader} />
      {confirmDialog.open ? <ConfirmDialog /> : <></>}
      <FloatingWhatsAppWidget />
      <ReactPageTracker />
      <Switch>
        {Routing.map((route: IRoute, i: number) =>
          route.protected ? (
            isAuthenticated === undefined ? (
              <AppLoader show={true} />
            ) : (
              // !isAuthenticated ?
              // // (<Redirect key={i+paths.SIGN_IN} to={paths.SIGN_IN} />)
              // <></>
              // :
              <Route
                path={route.path}
                render={() => (
                  <React.Fragment>
                    {isAuthenticated ? (
                      <AppLayout />
                    ) : (
                      // <Suspense fallback={<AppLoader show={true} />}>

                      //   <route.component key={i} />
                      //           {
                      //             route.footerless ? <></> : <AppFooter />
                      //           }
                      // </Suspense>
                      <Suspense fallback={<AppLoader show={true} />}>
                        <Login />
                        {/* <AppFooter /> */}
                      </Suspense>
                    )}
                  </React.Fragment>
                )}
                key={route.path + i}
                exact={route.exact === false ? false : true}
              />
            )
          ) : (
            <Route
              path={route.path}
              render={() => (
                <Suspense fallback={<AppLoader show={true} />}>
                  <route.component {...route.props} />
                  {route.footerless ? <></> : <AppFooter />}
                </Suspense>
              )}
              key={route.path + i}
              exact={route.exact === false ? false : true}
            />
          )
        )}
      </Switch>
    </React.Fragment>
  );
}

export default App;
