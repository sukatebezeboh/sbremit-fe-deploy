import { ConfigProvider } from "antd";
import {
  ApplayoutBodyStyle,
  ApplayoutContainerStlye,
  ApplayoutStlye,
} from "./AppLayoutStyles";
import RouteConfig from "./RouteConfig";
import AsideNav from "./components/asidenav/AsideNav";
import Navbar from "./components/navbar/Navbar";
import { AntdConfigSettings } from "../utils/stylesVariables";
import { useEffect } from "react";
import {
  getTransactions,
  getUserCurrencyInfo,
} from "redux/actions/actionsTransfer";
import {
  fetchUserNotifications,
  getRecipients,
  toastAction,
} from "redux/actions/actions";

import { useDispatch, useSelector } from "react-redux";
import { AUTH } from "redux/actionTypes";
import { useHistory, useLocation } from "react-router-dom";
import { paths } from "util/paths";
import {
  userIsVerified,
  isUserFirstTransaction,
  userHasReachedFinalVerificationStage,
} from "../utils/reuseableUtils";
import TandCModal from "../app-components/TandCModal";

export default function AppLayout() {
  const auth = useSelector((state: any) => state.auth);
  const { user } = auth || {};
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { trullioVerified } = user?.meta || {};

  useEffect(() => {
    getRecipients();
    getUserCurrencyInfo();
    getTransactions();
    fetchUserNotifications();
    checkIfUserIsVerified(false); // this upadete redux store and does not trigger a redirect

    //check user verification on Payment Method page and redirect if !verified
    if (location.pathname === paths.PAYMENT_METHOD) {
      checkIfUserIsVerified(true);
    }
    return () => {};
  }, []);

  const redirectUser = () => {
    toastAction({
      show: true,
      type: "info",
      timeout: 15000,
      title: "Just a minute, please!",
      message:
        "We need to verify your identity before you can complete this transaction",
    });
    history.push(paths.VERIFICATION);
  };

  const isUserVerificationRequired = !userIsVerified(user); //&&
  // !isUserFirstTransaction(user) &&
  // !userHasReachedFinalVerificationStage(user);

  const checkIfUserIsVerified = (redirect: boolean) => {
    if (trullioVerified && Boolean(trullioVerified)) {
      return dispatch({
        type: AUTH,
        payload: { ...auth, verification: true },
      });
    } else if (isUserVerificationRequired) {
      dispatch({
        type: AUTH,
        payload: { ...auth, verification: false },
      });
      return redirect && redirectUser();
    } else {
      return dispatch({
        type: AUTH,
        payload: { ...auth, verification: true },
      });
    }
  };

  return (
    <ConfigProvider theme={AntdConfigSettings}>
      <ApplayoutStlye>
        <ApplayoutContainerStlye>
          <div className="asidenav">
            <AsideNav />
          </div>
          <div className="body">
            <div className="navbar">
              <Navbar />
            </div>
            <div className="content">
              <ApplayoutBodyStyle>
                <RouteConfig />
              </ApplayoutBodyStyle>
            </div>
          </div>
        </ApplayoutContainerStlye>
        <TandCModal />
      </ApplayoutStlye>
    </ConfigProvider>
  );
}
