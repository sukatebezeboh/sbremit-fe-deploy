const endpoints = {
    SIGN_UP: '/users/registration',
    SIGN_IN: '/session',
    SIGN_OUT: '/sign-out',
    VALUES: '/values',
    VALUE: '/value',
    USER: '/user/$_1',
    PASSWORD_REQUEST: '/user/password/request',
    PASSWORD_RESET: '/user/password/reset',
    RECIPIENTS: '/user/$_1/recipients',
    CREATE_RECIPIENT: '/user/$_1/recipient',
    CREATE_TRANSFER: '/user/$_1/transfer',
    GET_TRANSFER: '/user/$_1/transfer/$_2',
    GET_TRANSFERS: '/user/$_1/transfers',
    QUOTE_SERVICE: '/exchange/$_1/$_2'
}

export default endpoints;
