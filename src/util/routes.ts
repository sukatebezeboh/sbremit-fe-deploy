import LandingPage from '../components/pages/landing-page/LandingPage'
import SignUp from '../components/pages/sign-up/SignUp';
import SignIn from '../components/pages/sign-in/SignIn';
import AccountConfirmation from '../components/email-templates/account-confirmation/AccountConfirmation';
import PasswordReset from '../components/email-templates/password-reset/PasswordReset';
import ResetPassword from '../components/pages/reset-password/ResetPassword';
import Dashboard from '../components/pages/dashboard/Dashboard';
import UserProfile from '../components/pages/user-profile/UserProfile';
import ChangePassword from '../components/pages/change-password/ChangePassword';
import TransferMethod from '../components/pages/transfer-method/TransferMethod';
import GetQuote from '../components/pages/get-quote/GetQuote';
import Verification from '../components/pages/verification/Verification';
import Recipient from '../components/pages/recipient/Recipient';
import RecipientDetails from '../components/pages/recipient-details/RecipientDetails';
import Review from '../components/pages/review/Review';
import PaymentMethod from '../components/pages/payment-method/PaymentMethod';
import CardPayment from '../components/pages/card-payment/CardPayment';
import CreateTransfer from '../components/pages/create-transfer/CreateTransfer';
import TransferComplete from '../components/pages/transfer-complete/TransferComplete';
import { paths } from './paths';
import EditProfile from '../components/pages/edit-profile/EditProfile';
import Legal from '../components/content-pages/support/legal-wrapper/Legal';
import About from '../components/content-pages/about/About';
import Support from '../components/content-pages/support/support/Support';
import Contact from '../components/content-pages/contact/Contact';
import ConfirmAccount from '../components/pages/confirm-account/ConfirmAccount';


export interface IRoute {
    path: string,
    component: (props: any) => JSX.Element,
    protected?: boolean,
    props?: any,
    exact?: boolean,
    footerless?: boolean
}
export const Routing: IRoute[] = [
    {
        path: paths.EN_LANDING,
        component: LandingPage,
        protected: false,
        props: {location: 'london'},
        exact: false
    },
    {
        path: paths.CA_LANDING,
        component: LandingPage,
        protected: false,
        props: {location: 'yaounde'},
        exact: false
    },
    {
        path: paths.LANDING,
        component: LandingPage,
        protected: false,
        props: {location: 'london'}
    },
    {
        path: paths.LEGAL,
        component: Legal,
        protected: false,
        exact: false,
        footerless: true
    },
    {
        path: paths.SUPPORT,
        component: Support,
        protected: false,
        exact: true
    },
    {
        path: paths.ABOUT,
        component: About,
        protected: false,
        exact: true,
        footerless: false
    },
    {
        path: paths.CONTACT,
        component: Contact,
        protected: false,
        exact: true
    },
    {
        path: paths.SIGN_UP,
        component: SignUp,
        protected: false,
    },
    {
        path: paths.SIGN_IN,
        component: SignIn,
        protected: false,
    },
    {
        path: paths.CONFIRM_ACCOUNT_EMAIL,
        component: AccountConfirmation,
        protected: false,
    },
    {
        path: paths.CONFIRM_ACCOUNT,
        component: ConfirmAccount,
        protected: false,
    },
    { 
        path: paths.PASSWORD_RESET_EMAIL, 
        component: PasswordReset, 
        protected: false 
    },
    { 
        path: paths.RESET_PASSWORD, 
        component: ResetPassword, 
        protected: false 
    },
    { 
        path: paths.DASHBOARD, 
        component: Dashboard, 
        protected: true 
    },
    { 
        path: paths.PROFILE, 
        component: UserProfile,
        protected: true 
    },
    { 
        path: paths.EDIT_PROFILE, 
        component: EditProfile,
        protected: true 
    },
    { 
        path: paths.CHANGE_PASSWORD, 
        component: ChangePassword,
        protected: true 
    },
    { 
        path: paths.TRANSFER_METHOD, 
        component: TransferMethod,
        protected: true 
    },
    { 
        path: paths.GET_QUOTE, 
        component: GetQuote,
        protected: true 
    },
    { 
        path: paths.VERIFICATION, 
        component: Verification,
        protected: true 
    },
    { 
        path: paths.RECIPIENT, 
        component: Recipient,
        protected: true 
    },
    {
        path: paths.RECIPIENT_DETAILS,
        component: RecipientDetails,
        protected: true
    },
    {
        path: paths.REVIEW,
        component: Review,
        protected: true
    },
    {
        path: paths.PAYMENT_METHOD,
        component: PaymentMethod,
        protected: true
    },
    {
        path: paths.CARD_PAYMENT,
        component: CardPayment,
        protected: true
    },
    {
        path: paths.CREATE_TRANSFER,
        component: CreateTransfer,
        protected: true
    },
    {
        path: paths.TRANSFER_COMPLETE,
        component: TransferComplete,
        protected: true
    },

]
