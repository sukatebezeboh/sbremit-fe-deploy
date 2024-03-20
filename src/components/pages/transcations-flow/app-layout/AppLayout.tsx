import { ConfigProvider } from "antd";
import { useEffect, useState } from "react";
import {
  fetchUserNotifications,
  getClientIp,
  getRecipients,
  refreshUserDetails,
  toastAction,
} from "redux/actions/actions";
import {
  getTransactions,
  getUserCurrencyInfo,
} from "redux/actions/actionsTransfer";
import { AntdConfigSettings } from "../utils/stylesVariables";
import {
  ApplayoutBodyStyle,
  ApplayoutContainerStlye,
  ApplayoutStlye,
} from "./AppLayoutStyles";
import RouteConfig from "./RouteConfig";
import AsideNav from "./components/asidenav/AsideNav";
import Navbar from "./components/navbar/Navbar";

import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { AUTH } from "redux/actionTypes";
import { paths } from "util/paths";
import TandCModal from "../app-components/TandCModal";
import { userIsVerified } from "../utils/reuseableUtils";
import RewardModal from "../app-components/RewardModal";

export default function AppLayout() {
  const auth = useSelector((state: any) => state.auth);
  const [isRewardAvailable, setIsRewardAvailable] = useState(false);
  const { user } = auth || {};
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { trullioVerified } = user?.meta || {};

  const isDashboardOrTransactionsPage =
    location.pathname === paths.DASHBOARD ||
    location.pathname === paths.TRANSACTIONS ||
    location.pathname === paths.ACCOUNT_STATEMENTS;

  const isDashboardOrRewardPage =
    location.pathname === paths.DASHBOARD ||
    location.pathname === paths.REWARDS;

  const isGetQuotePage = location.pathname === paths.GET_QUOTE;

  const checkIsRewardsAvailable = (data: any) => {
    const { Referral } = data.referral || {};
    const { Voucher } = data.meta || {};

    const isVoucherActive = Voucher && Voucher === "ACTIVE";
    const isNewBonusStateActive = Referral && Referral === "ACTIVE";

    if (isVoucherActive || isNewBonusStateActive) {
      return setIsRewardAvailable(true);
    }

    return setIsRewardAvailable(false);
  };

  useEffect(() => {
    getRecipients();
    getUserCurrencyInfo();
    isDashboardOrTransactionsPage && getTransactions();
    fetchUserNotifications();
    checkIfUserIsVerified(false); // this upadete redux store and does not trigger a redirect
    !isGetQuotePage && getClientIp(); // get user IP address
    isDashboardOrRewardPage &&
      refreshUserDetails(checkIsRewardsAvailable, true); // force refresh to upadate reward props

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
          <aside className="asidenav">
            <AsideNav />
          </aside>
          <div className="body">
            <nav className="navbar">
              <Navbar />
            </nav>
            <div className="content">
              <ApplayoutBodyStyle>
                <RouteConfig />
              </ApplayoutBodyStyle>
            </div>
          </div>
        </ApplayoutContainerStlye>

        {/* General popups/modals */}
        <TandCModal />
        {isRewardAvailable && <RewardModal />}
      </ApplayoutStlye>
    </ConfigProvider>
  );
}
