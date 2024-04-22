import { Helmet } from "react-helmet";
import EndBanner from "../../components/EndBanner";
import { PageWrapperStyles } from "../../global-styles/styles";
import { BrandValues, Hero, OurJourney, OurMission } from "./sections";

const AboutPage = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>About Us | SB Remit</title>
        <meta
          name="keywords"
          content="money transfer,
        money transfer from uk"
        />
        <meta
          name="description"
          content="
            SB Remit provides a quick, easy, and secure way for businesses and individuals to transfer money, 
            primarily to and from Africa. Learn more about us today.
            "
        />
      </Helmet>

      <PageWrapperStyles $hideMarginTop>
        <Hero />
        <OurJourney />
        <OurMission />
        <BrandValues />
        <EndBanner />
      </PageWrapperStyles>
    </>
  );
};

export default AboutPage;
