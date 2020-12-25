import './App.css';
import LandingPage from './components/pages/landing-page/LandingPage'
import { Route, Switch } from 'react-router-dom';
import SignUp from './components/pages/sign-up/SignUp';
import SignIn from './components/pages/sign-in/SignIn';
import AccountConfirmation from './components/email-templates/account-confirmation/AccountConfirmation';
import PasswordReset from './components/email-templates/password-reset/PasswordReset';


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
      <Route path="/email/confirm-account" component={AccountConfirmation} />
      <Route path="/email/password-reset" component={PasswordReset} />
    </Switch>
    
  );
}

export default App;
