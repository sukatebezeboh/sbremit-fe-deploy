import { Route, Switch } from "react-router-dom";
import { paths } from "util/paths";
import AxcessMerchant from "../app-components/AxcessPaymentForm";
import Dashboard from "../app-pages/app-dashboard/Dashboard";
import GetQuote from "../app-pages/app-getQuote/GetQuote";
import Pay from "../app-pages/app-pay-methods/PayMethods";
import PaymentComplete from "../app-pages/app-payment-complete/PaymentComplete";
import Profile from "../app-pages/app-profile/Profile";
import Recipients from "../app-pages/app-recipients/Recipients";
import Referrals from "../app-pages/app-referral/Referrals";
import Review from "../app-pages/app-review/Review";
import Settings from "../app-pages/app-settings/Settings";
import AccountStatement from "../app-pages/app-transactions/AccountStatement";
import Transcations from "../app-pages/app-transactions/Transcations";
import Verifications from "../app-pages/app-verifications/Verifications";
import TransferMethod from "../app-pages/transfer-method/TransferMethod";

export default function RouteConfig() {
  return (
    <Switch>
      <Route path={paths.TRANSFER_METHOD} component={TransferMethod} />
      <Route path={paths.GET_QUOTE} component={GetQuote} />
      <Route path={paths.RECIPIENT} component={Recipients} />
      <Route path={paths.REVIEW} component={Review} />
      <Route path={paths.PAYMENT_METHOD} component={Pay} />
      <Route path={paths.AXCESS_MERCHANT} component={AxcessMerchant} />
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
