const endpoints = {
    SIGN_UP: '/users/registration',
    SESSION: '/session',
    SIGN_OUT: '/sign-out',
    VALUES: '/values',
    VALUE: '/value',
    USER: '/user/$_1',
    USER_SETTINGS: '/user/settings',
    PASSWORD_REQUEST: '/user/password/request',
    PASSWORD_RESET: '/user/password/reset',
    PASSWORD_CHANGE: '/user/password/change',
    RECIPIENTS: '/user/$_1/recipients',
    RECIPIENT: '/user/$_1/recipient/$_2',
    CREATE_RECIPIENT: '/user/$_1/recipient',
    CREATE_TRANSFER: '/user/$_1/transfer',
    UPDATE_TRANSFER: '/user/transfer/$_1',
    GET_TRANSFER: '/user/$_1/transfer/$_2',
    GET_TRANSFERS: '/user/$_1/transfers?businessId=49',
    QUOTE_SERVICE: '/exchange/$_1/$_2',
    GET_QUOTE: '/quote/$_1',
    GET_SERVICES: '/transfer/services',
    GET_SERVICE: '/transfer/service/$_1',
    INITIATE_PAYMENT: '/user/$_1/payment',
    VERIFICATION: '/user/$_1/verification',
    CONFIRM_ACCOUNT: '/user/email/confirm',
    SUBSCRIBE: '/subscribe',
    NOTIFICATIONS: '/user/$_1/notifications',
    PROMO: '/promo/$_1',
    SAVE_TRULIOO_DOCUMENT_VERIFICATION: '/verification/documents',
    TRUELAYER_INITIATE_PAYMENT: '/truelayer/payment',
    TOAST_NOTIF: '/user/toast',
    USER_REFERRALS: '/user/referrals',
    REGISTER_COUNTRY: '/country/register',
    COMPETITOR_RATES: '/competitors/rates/$_1/$_2/$_3',
    ACCOUNT_ACTIVATION: '/user/activation',
    TRANSFER_QUOTE: '/transfer/quote',
    VERIFY_PIVOT_REFERENCE: '/pivot/payment/validate',
    INVITE_BUSINESS_USERS: '/business/invite',
    UTC_DATE_TIME_UTIL: '/time/utc',
    EXCHANGE_RATE_SPREADS: '/rate/spreads'
}

export default endpoints;
