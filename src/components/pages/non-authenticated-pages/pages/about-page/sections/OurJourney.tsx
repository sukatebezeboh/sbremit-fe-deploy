import { PageResponsiveWidth } from "components/pages/non-authenticated-pages/global-styles/styles";
import {
  H3,
  Paragraph,
} from "components/pages/non-authenticated-pages/global-styles/typogarphy";
import {
  Breakpoint,
  Colors,
} from "components/pages/transcations-flow/utils/stylesVariables";
import React from "react";
import styled from "styled-components";

const BgImage = "/assets/images/our_journey_bg.png";

const OurJourney = () => {
  return (
    <OurJourneyStyles>
      <div className="_left_content">
        <H3 $large>Our Journey</H3>
        <Paragraph>
          Henry Eho and Gaston Fornimoh are Cameroonian migrants living in the
          UK for the last 15 years. They have worked in several industries
          including financial services, retail, digital and consultancy.
          Throughout this time, they have sent money home for several purposes
          including supporting friends and family, paying hospital bills, and
          investing in real estate amongst others.
          <br />
          <br />
          They quickly realised that none of the money transfer agencies serving
          the continent offered tailored products to meet the needs of specific
          countries. Customers are treated as having the same need across the
          African continent.
          <br />
          <br />
          Above all, the customer was not getting the best value for their money
          due to poor exchange rates, high transfer charges and lack of fee
          transparency. Remittance into Africa remains the most expensive in the
          world currently standing at 8.9% cost of remitting $200 according to a
          report from the World Bank. Henry and Gaston are committed to driving
          down cost for the customers by offering them competitive exchange
          rates. They are determined to operate a business that they will use if
          they were a customer.
        </Paragraph>
      </div>
      <div className="_right_content">
        <img src={BgImage} alt="picture of happy people" />
      </div>
    </OurJourneyStyles>
  );
};

export default OurJourney;

const OurJourneyStyles = styled.section`
  display: flex;
  align-items: center;
  height: 1100px;
  width: 100%;
  background: #fafafa;

  justify-content: space-between;

  @media (max-width: ${Breakpoint.xl}) {
    height: auto;
  }

  ._left_content {
    
    display: flex;
    padding: 81px 8%;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 40px;

    width: 100%;
    height: 100%;

    h3 {
      color: ${Colors.textColor3};
    }

    p {
      color: ${Colors.textColor3};
      font-weight: 300;
    }

    @media (max-width: 1440px) {
      padding-left: 5%;
    }
    @media (max-width: ${Breakpoint.xl}) {
      padding: 80px 8%;
    }
    @media (max-width: ${Breakpoint.md}) {
      padding: 60px 8%;
      gap: 28px;
    }
    @media (max-width: ${Breakpoint.sm}) {
      padding: 40px 8%;
      gap: 18px;
    }
  }

  ._right_content {
    width: 787px;
    height: 100%;

    @media (max-width: 1440px) {
        width: 587px;
    }

    @media (max-width: ${Breakpoint.xl}) {
      display: none;
    }
    img {
      width: inherit;
      height: inherit;
    }
  }
`;
