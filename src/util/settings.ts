export const settings : any = {
    MOBILE_MONEY_MAX: 500000,
    CASH_PICKUP_MAX: 20000,
    BANK_TRANSFER_MAX: 20000,
    TRANSFER_TIME_LIMIT_IN_SECONDS: 60 * 60 * 24, // 24 hrs

    TRUST_PAYMENT_SITE_REFERENCE: 'test_sukatebezebohltd89498',
    TRUST_NOTIFICATION_WEBHOOK_URL: 'https://api-uat.sbremit.co.uk/trust/payment/notification',
    TRUST_SUCCESSFUL_REDIRECT_URL: 'https://sbremit.netlify.app/transfer-complete?t='
}