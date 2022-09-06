export const PAYMENT_GATEWAYS: {[x: string]: any} = {
    'truelayer': {
        slug: 'truelayer',
        method: 'Instant bank transfer',
        provider: 'TrueLayer',
        label: (destinationCountryCode?: string) => '0.00 GBP',
        isRecommended: true
    },
    'interac': {
        slug: 'interac',
        method: 'Instant bank transfer',
        provider: 'Interac®',
        label: (destinationCountryCode?: string) => '0.00 CAD (Free)',
        isRecommended: true,
        maxLimit: 30000
    },
    'trust-payment': {
        slug: 'trust-payment',
        method: 'Pay with card',
        provider: 'Trust payment',
        label: (destinationCountryCode: string) => destinationCountryCode === 'CM' ? '0.00 GBP' : '0.99 GBP'
    }
}