import ExchangeRateInputWrapper from './ExchangeRateInputWrapper';
import LandingPageLayout from './layouts/LandingPageLayout';



const QuoteExchangeRateInput = (props: any) =>{

       return (
            <ExchangeRateInputWrapper {...props} LayoutComponent={LandingPageLayout} />
        )
}

export default QuoteExchangeRateInput;
