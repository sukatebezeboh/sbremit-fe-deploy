import { Helmet } from "react-helmet";
import EndBanner from "../../components/EndBanner";
import { PageWrapperStyles } from "../../global-styles/styles";
import {
  Comparison,
  Faq,
  Hero,
  HowToTransfer,
  Promotions,
  TransferingMoneyTo,
  WhatTheySay,
  WhySB,
} from "./sections";

const LandingPage = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Homepage | SB Remit</title>
        <meta
          name="keywords"
          content="money transfer,
                money transfer from uk,
                send money to africa,
                remit,
                money transfer to africa,
                transferring money to africa,
                money remittance company,"
        />
        <meta
          name="description"
          content="
                SB Remit provides a quick, easy, and secure way for businesses and individuals to transfer money, 
                primarily to and from Africa. Learn more about us today.
                "
        />
        <meta
          name="variation"
          content="send money to africa,
                  remit,
                  money transfer to africa,
                  transferring money to africa,
                  money remittance company"
        />
        <meta name="question" content="What are the means of money transfer?" />
        <meta
          name="queries"
          content="How do you transfer money from UK to Africa?"
        />
      </Helmet>

      <PageWrapperStyles>
        <Hero />
        <Promotions />
        <WhySB />
        <HowToTransfer />
        <Comparison />
        <WhatTheySay />
        <Faq />
        <TransferingMoneyTo />
        <EndBanner />
      </PageWrapperStyles>
    </>
  );
};

export default LandingPage;
