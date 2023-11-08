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

export default function AppLayout() {
  const auth = useSelector((state: any) => state.auth);
  const { user } = auth || {};
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  useEffect(() => {
    getRecipients();
    getUserCurrencyInfo();
    getTransactions();
    fetchUserNotifications();
    checkIfUserIsVerified(false);

    //check user verification on paymentmethod page
    if (location.pathname === paths.PAYMENT_METHOD) {
      checkIfUserIsVerified(true);
    }
    return () => {};
  }, []);

  const checkIfUserIsVerified = (redirect: boolean) => {
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

    if (
      !userIsVerified(user) &&
      !isUserFirstTransaction(user) &&
      !userHasReachedFinalVerificationStage(user)
    ) {
      dispatch({
        type: AUTH,
        payload: { ...auth, verification: false },
      });
      redirect && redirectUser();
    } else {
      dispatch({
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
      </ApplayoutStlye>
    </ConfigProvider>
  );
}
