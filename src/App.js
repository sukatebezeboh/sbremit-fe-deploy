import './App.css';
import LandingPage from './components/pages/landing-page/LandingPage'
import { Route, Switch } from 'react-router-dom';
import SignUp from './components/pages/sign-up/SignUp';
import SignIn from './components/pages/sign-in/SignIn';
import AccountConfirmation from './components/email-templates/account-confirmation/AccountConfirmation';
import PasswordReset from './components/email-templates/password-reset/PasswordReset';
import ResetPassword from './components/pages/reset-password/ResetPassword';
import Dashboard from './components/pages/dashboard/Dashboard';
import UserProfile from './components/pages/user-profile/UserProfile';
import ChangePassword from './components/pages/change-password/ChangePassword';
import TransferMethod from './components/pages/transfer-method/TransferMethod';
import GetQuote from './components/pages/get-quote/GetQuote';
import Verification from './components/pages/verification/Verification';
import Recipient from './components/pages/recipient/Recipient';
import RecipientDetails from './components/pages/recipient-details/RecipientDetails';
import Review from './components/pages/review/Review';


function App() {
  return (
    <Switch>
      <Route path="/en/" exact>
        <LandingPage location="london"/>
      </Route>
      <Route path="/ca/" exact>
        <LandingPage location="yaounde"/>
      </Route>
      <Route path="/" exact>
        <LandingPage location="london"/>
      </Route>
      <Route path="/sign-up" component={SignUp} exact/>
      <Route path="/sign-in" component={SignIn} exact/>
      <Route path="/email/confirm-account" component={AccountConfirmation} exact />
      <Route path="/email/password-reset" component={PasswordReset} exact/>
      <Route path="/reset-password" component={ResetPassword} exact/>
      <Route path="/dashboard" component={Dashboard} exact/>
      <Route path="/profile" component={UserProfile} exact/>
      <Route path="/change-password" component={ChangePassword} exact/>
      <Route path="/transfer-method" component={TransferMethod} exact/>
      <Route path="/get-quote" component={GetQuote} exact/>
      <Route path="/verification" component={Verification} exact/>
      <Route path="/recipient" component={Recipient} exact/>
      <Route path="/recipient-details" component={RecipientDetails} exact/>
      <Route path="/review" component={Review} exact/>
    </Switch>
    
  );
}

export default App;
