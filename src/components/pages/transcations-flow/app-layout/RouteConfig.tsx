import React from "react";
import { Route, Switch } from "react-router-dom";
import { paths } from "util/paths";
import Dashboard from "../app-pages/app-dashboard/Dashboard";
import Transcations from "../app-pages/app-transactions/Transcations";
import TransferMethod from "../app-pages/transfer-method/TransferMethod";
import GetQuote from "../app-pages/app-getQuote/GetQuote";
import Recipients from "../app-pages/app-recipients/Recipients";
import Review from "../app-pages/app-review/Review";
import Pay from "../app-pages/app-pay-methods/PayMethods";
import Profile from "../app-pages/app-profile/Profile";
import Verifications from "../app-pages/app-verifications/Verifications";
import AxcessMerchant from "../app-components/AxcessPaymentForm";
import TrulayerProvider from "../app-components/TrulayerProvider";
import PaymentComplete from "../app-pages/app-payment-complete/PaymentComplete";
import Settings from "../app-pages/app-settings/Settings";
import Referrals from "../app-pages/app-referral/Referrals";
import AccountStatement from "../app-pages/app-transactions/AccountStatement";

export default function RouteConfig() {
  return (
    <Switch>
      <Route path={paths.TRANSFER_METHOD} component={TransferMethod} />
      <Route path={paths.GET_QUOTE} component={GetQuote} />
      <Route path={paths.RECIPIENT} component={Recipients} />
      <Route path={paths.REVIEW} component={Review} />
      <Route path={paths.PAYMENT_METHOD} component={Pay} />
      <Route path={paths.AXCESS_MERCHANT} component={AxcessMerchant} />
      <Route path={paths.TRUELAYER_PROVIDERS} component={TrulayerProvider} />
      <Route path={paths.TRANSFER_COMPLETE_AUTH} component={PaymentComplete} />

      <Route path={paths.TRANSACTIONS} component={Transcations} />
      <Route path={paths.ACCOUNT_STATEMENTS} component={AccountStatement} />
      <Route path={paths.REWARDS} component={Referrals} />
      <Route path={paths.DASHBOARD} component={Dashboard} />
      <Route path={paths.PROFILE} component={Profile} />
      <Route path={paths.USER_SETTINGS} component={Settings} />
      <Route path={paths.VERIFICATION} component={Verifications} />
    </Switch>
  );
}
