import { Suspense, lazy, LazyExoticComponent } from "react";
import { paths } from "./paths";
// import AppLayout from "components/pages/transcations-flow/app-layout/AppLayout";

//redesigned pages
const TransferCompleteAuth = lazy(
  () =>
    import(
      "../components/pages/transcations-flow/app-pages/app-payment-complete/PaymentComplete"
    )
);
const AppTransactions = lazy(
  () =>
    import(
      "../components/pages/transcations-flow/app-pages/app-transactions/Transcations"
    )
);
//----
const SignUp = lazy(() => import("../components/pages/sign-up/SignUp"));
const SignIn = lazy(() => import("../components/pages/sign-in/SignIn"));
const ForgetPassword = lazy(
  () => import("../components/pages/forget-password/ForgetPassword")
);
const PasswordEmailReset = lazy(
  () => import("../components/pages/password-email-reset/PasswordEmailReset")
);
const EmailLinkSent = lazy(
  () => import("../components/pages/email-link-sent/EmailLinkSent")
);
const PasswordSMSReset = lazy(
  () => import("../components/pages/password-sms-reset/PasswordSMSReset")
);
const ResetSmsCode = lazy(
  () => import("../components/pages/reset-sms-code/ResetSmsCode")
);
const ResetPassword = lazy(
  () => import("../components/pages/reset-password/ResetPassword")
);
const PasswordResetComplete = lazy(
  () =>
    import("../components/pages/password-reset-complete/PasswordResetComplete")
);
const AccountConfirmation = lazy(
  () =>
    import(
      "../components/email-templates/account-confirmation/AccountConfirmation"
    )
);
const PasswordReset = lazy(
  () => import("../components/email-templates/password-reset/PasswordReset")
);
const Dashboard = lazy(() => import("../components/pages/dashboard/Dashboard"));
const UserProfile = lazy(
  () => import("../components/pages/user-profile/UserProfile")
);
const ChangePassword = lazy(
  () => import("../components/pages/change-password/ChangePassword")
);
const TransferMethod = lazy(
  () => import("../components/pages/transfer-method/TransferMethod")
);
const GetQuote = lazy(() => import("../components/pages/get-quote/GetQuote"));
const Verification = lazy(
  () => import("../components/pages/verification/Verification")
);
const Recipient = lazy(() => import("../components/pages/recipient/Recipient"));
const RecipientDetails = lazy(
  () => import("../components/pages/recipient-details/RecipientDetails")
);
const Review = lazy(() => import("../components/pages/review/Review"));
const PaymentMethod = lazy(
  () => import("../components/pages/payment-method/PaymentMethod")
);
const CardPayment = lazy(
  () => import("../components/pages/card-payment/CardPayment")
);
const CreateTransfer = lazy(
  () => import("../components/pages/create-transfer/CreateTransfer")
);
const TransferComplete = lazy(
  () => import("../components/pages/transfer-complete/TransferComplete")
);
const EditProfile = lazy(
  () => import("../components/pages/edit-profile/EditProfile")
);
const Legal = lazy(
  () => import("../components/content-pages/support/legal-wrapper/Legal")
);
const About = lazy(() => import("../components/content-pages/about/About"));
const Tutorial = lazy(
  () =>
    import("../components/content-pages/about/tutorial-pages/tutorial/Tutorial")
);
const Cameroon = lazy(
  () =>
    import("../components/content-pages/about/tutorial-pages/cameroon/Cameroon")
);
const Kenya = lazy(
  () => import("../components/content-pages/about/tutorial-pages/kenya/Kenya")
);
const Uganda = lazy(
  () => import("../components/content-pages/about/tutorial-pages/uganda/Uganda")
);
const Tanzania = lazy(
  () =>
    import("../components/content-pages/about/tutorial-pages/tanzania/Tanzania")
);
// const Blog = lazy(() => import('../components/content-pages/blog/Blog'));
const Support = lazy(
  () => import("../components/content-pages/support/support/Support")
);
const Contact = lazy(
  () => import("../components/content-pages/contact/Contact")
);
const ConfirmAccount = lazy(
  () => import("../components/pages/confirm-account/ConfirmAccount")
);
const NotFound = lazy(() => import("../components/pages/not-found/NotFound"));
const TruelayerProviders = lazy(
  () => import("../components/pages/truelayer-providers/TruelayerProviders")
);
const UserSettings = lazy(
  () => import("../components/pages/user-settings/UserSettings")
);
const Referrals = lazy(() => import("../components/pages/referrals/Referrals"));
const AccountConfirmationSMSCode = lazy(
  () =>
    import(
      "../components/pages/account-confirmation-sms-code/AccountConfirmationSmsCode"
    )
);
const LandingPage = lazy(
  () => import("../components/pages/landing-page/LandingPage")
);
const RegisterCountry = lazy(
  () => import("../components/pages/register-country/RegisterCountry")
);
const Notifications = lazy(
  () => import("../components/pages/notifications/Notifications")
);
const InviteBusinessUser = lazy(
  () => import("../components/pages/invite-business-user/InviteBusinessUser")
);
const MobileMoneyRate = lazy(
  () =>
    import(
      "../components/content-pages/support/mobile-money-rate/MobileMoneyRate"
    )
);
const TransferStatus = lazy(
  () => import("../components/pages/transfer-status/TransferStatus")
);
const TrustPaymentForMobile = lazy(
  () =>
    import("../components/pages/Trust-payment-for-mobile/TrustPaymentForMobile")
);
const AxcessMerchant = lazy(
  () => import("../components/pages/Trust-payment-for-mobile/AxcessMerchant")
);

const SucessPageForAuthUsers = lazy(
  () => import("../components/pages/transfer-complete/ForAuthUsers")
);

export interface IRoute {
  path: string;
  component:
    | ((props: any) => JSX.Element)
    | LazyExoticComponent<(props: any) => JSX.Element>;
  protected?: boolean;
  props?: any;
  exact?: boolean;
  footerless?: boolean;
}
export const Routing: IRoute[] = [
  {
    path: paths.EN_LANDING,
    component: LandingPage,
    protected: false,
  },
  {
    path: paths.CA_LANDING,
    component: LandingPage,
    protected: false,
    props: { location: "yaounde" },
    exact: false,
  },
  {
    path: paths.LANDING,
    component: LandingPage,
    protected: false,
    props: { location: "london" },
  },
  {
    path: paths.REGISTER_COUNTRY,
    component: RegisterCountry,
    protected: false,
    footerless: true,
  },
  {
    path: paths.LEGAL,
    component: Legal,
    protected: false,
    exact: false,
    footerless: true,
  },
  {
    path: paths.TRANSACTIONS,
    component: AppTransactions,
    protected: true,
    footerless: true,
  },
  {
    path: paths.AXCESS_MERCHANT,
    component: AxcessMerchant,
    protected: true,
    footerless: true,
  },
  {
    path: paths.TRANSFER_COMPLETE_AUTH,
    component: TransferCompleteAuth,
    protected: true,
    footerless: true,
  },
  // ----
  // {
  //     path: paths.BLOG,
  //     component: Blog,
  //     protected: false,
  //     exact: true,
  //     footerless: false
  // },
  {
    path: paths.SUPPORT,
    component: Support,
    protected: false,
    exact: true,
  },
  {
    path: paths.ABOUT,
    component: About,
    protected: false,
    exact: true,
    footerless: false,
  },
  {
    path: paths.TUTORIALS,
    component: Tutorial,
    protected: false,
    exact: true,
    footerless: false,
  },
  {
    path: paths.CAMEROON,
    component: Cameroon,
    protected: false,
    exact: true,
    footerless: false,
  },
  {
    path: paths.KENYA,
    component: Kenya,
    protected: false,
    exact: true,
    footerless: false,
  },
  {
    path: paths.UGANDA,
    component: Uganda,
    protected: false,
    exact: true,
    footerless: false,
  },
  {
    path: paths.TANZANIA,
    component: Tanzania,
    protected: false,
    exact: true,
    footerless: false,
  },
  {
    path: paths.CONTACT,
    component: Contact,
    protected: false,
    exact: true,
  },
  {
    path: paths.MOBILE_MONEY_RATE,
    component: MobileMoneyRate,
    protected: false,
    exact: true,
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
    path: paths.FORGET_PASSWORD,
    component: ForgetPassword,
    protected: false,
  },
  {
    path: paths.PASSWORD_EMAIL_RESET,
    component: PasswordEmailReset,
    protected: false,
  },
  {
    path: paths.EMAIL_LINK_SENT,
    component: EmailLinkSent,
    protected: false,
  },
  {
    path: paths.PASSWORD_SMS_RESET,
    component: PasswordSMSReset,
    protected: false,
  },
  {
    path: paths.SMS_CODE_SENT,
    component: ResetSmsCode,
    protected: false,
  },
  {
    path: paths.CONFIRM_ACCOUNT_SMS,
    component: AccountConfirmationSMSCode,
    protected: false,
  },
  {
    path: paths.RESET_PASSWORD,
    component: ResetPassword,
    protected: false,
  },
  {
    path: paths.PASSWORD_RESET_COMPLETE,
    component: PasswordResetComplete,
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
    protected: false,
  },
  {
    path: paths.DASHBOARD,
    component: Dashboard,
    protected: true,
  },
  {
    path: paths.NOTIFICATIONS,
    component: Notifications,
    protected: true,
  },
  {
    path: paths.USER_SETTINGS,
    component: UserSettings,
    protected: true,
  },
  {
    path: paths.PROFILE,
    component: UserProfile,
    protected: true,
  },
  {
    path: paths.EDIT_PROFILE,
    component: EditProfile,
    protected: true,
  },
  {
    path: paths.CHANGE_PASSWORD,
    component: ChangePassword,
    protected: true,
  },
  {
    path: paths.TRANSFER_METHOD,
    component: TransferMethod,
    protected: true,
  },
  {
    path: paths.GET_QUOTE,
    component: GetQuote,
    protected: true,
  },
  {
    path: paths.VERIFICATION,
    component: Verification,
    protected: true,
  },
  {
    path: paths.RECIPIENT,
    component: Recipient,
    protected: true,
  },
  {
    path: paths.RECIPIENT_DETAILS,
    component: RecipientDetails,
    protected: true,
  },
  {
    path: paths.REVIEW,
    component: Review,
    protected: true,
  },
  {
    path: paths.REFERRALS,
    component: Referrals,
    protected: true,
  },
  {
    path: paths.PAYMENT_METHOD,
    component: PaymentMethod,
    protected: true,
  },
  {
    path: paths.CARD_PAYMENT,
    component: CardPayment,
    protected: true,
  },
  {
    path: paths.CREATE_TRANSFER,
    component: CreateTransfer,
    protected: true,
  },
  {
    path: paths.TRANSFER_COMPLETE,
    component: TransferComplete,
    protected: false,
    footerless: true,
  },
  {
    path: paths.TRANSFER_COMPLETE_FORAUTH_USER,
    component: SucessPageForAuthUsers,
    protected: true,
  },
  {
    path: paths.TRANSFER_STATUS,
    component: TransferStatus,
    protected: true,
  },
  {
    path: paths.TRUELAYER_PROVIDERS,
    component: TruelayerProviders,
    protected: true,
  },
  {
    path: paths.TRUSTPAYMENT_FOR_MOBILE,
    component: TrustPaymentForMobile,
    protected: false,
  },
  {
    path: paths.INVITE_BUSINESS_USER,
    component: InviteBusinessUser,
    protected: true,
  },
  {
    path: paths.NOT_FOUND,
    component: NotFound,
    exact: false,
    protected: false,
  },
];
