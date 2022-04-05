import React from 'react'
import ExchangeRateInputWrapper from './ExchangeRateInputWrapper'
import LandingPageLayout from './layouts/LandingPageLayout'

const LandingPageExchangeRateInput = (props: any) => {
  return (
    <ExchangeRateInputWrapper {...props} LayoutComponent={LandingPageLayout} />
  )
}

export default LandingPageExchangeRateInput
