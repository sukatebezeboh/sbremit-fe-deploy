import { WhatsAppOutlined, FacebookFilled } from "@ant-design/icons";
import { Avatar, Button, Space } from "antd";
import { Breakpoint } from "components/pages/transcations-flow/utils/stylesVariables";
import styled from "styled-components";
import { PageResponsiveWidth } from "../../global-styles/styles";
import { H2, H4, Paragraph, SpanText } from "../../global-styles/typogarphy";
import { Faq } from "../landing-page/sections";

const BGsvg = "/assets/bg/maintenance_svg.svg";
const SBlogo = `/assets/main-logo.svg`;

const SiteMaintenance = () => {
  return (
    <SiteMaintenanceWrapper>
      <Navbar />
      <Hero />
      <FaqContainer />
    </SiteMaintenanceWrapper>
  );
};

export default SiteMaintenance;

const Navbar = () => {
  return (
    <NavbarWrapper>
      <img src={SBlogo} alt="sbremit logo" />
    </NavbarWrapper>
  );
};

const Hero = () => {
  return (
    <HeroWrapper>
      <div className="_text">
        <H2>Get your money ready — We will be right back.</H2>
        <Paragraph>
          SB Remit is down for scheduled maintenance. We expect to be back
          online in a couple of hours.
        </Paragraph>

        <Button>
          <Avatar
            icon={<WhatsAppOutlined rev={undefined} />}
            style={{ background: "#25D366" }}
          />
          <SpanText $small>Click to message us on whatsApp</SpanText>
        </Button>
      </div>
      <img src={BGsvg} />
    </HeroWrapper>
  );
};

const FaqContainer = () => {
  return (
    <FaqContainerWrapper>
      <div className="_header">
        <Paragraph $small>FOLLOW US ON:</Paragraph>
        {/* icon */}
      </div>

      <H4>Have some questions? We’ve got answers!</H4>

      <Faq showAllFaqs hideHeader />
    </FaqContainerWrapper>
  );
};

//styled(PageResponsiveWidth).attrs({as: 'section'})`

const SiteMaintenanceWrapper = styled.div`
  background-color: #ffffff;
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NavbarWrapper = styled(PageResponsiveWidth)`
  padding: 48px 0px;

  @media (max-width: ${Breakpoint.md}) {
    padding: 38px 0px;
  }

  img {
    width: 148px;
    cursor: pointer;

    &:hover {
      opacity: 0.85;
    }

    @media (max-width: ${Breakpoint.xl}) {
      width: 120px;
    }
    @media (max-width: ${Breakpoint.md}) {
      width: 100px;
    }
    @media (max-width: ${Breakpoint.sm}) {
      width: 100px;
    }
  }
`;

const HeroWrapper = styled(PageResponsiveWidth)`
  max-width: 1138px;
  padding: 38px 0px;

  display: flex;
  /* flex-wrap: wrap; */
  align-items: center;
  justify-content: space-between;

  ._text {
    display: flex;
    flex-direction: column;
    gap: 32px;
    width: 50%;
    h2 {
      color: rgba(66, 66, 66, 1);
    }
    p {
      color: rgba(112, 112, 112, 1);
    }

    Button {
      height: 56px;
      border-radius: 200px;
      border-width: 2px;

      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;

      width: auto;
      max-width: 340px;

      color: rgba(66, 66, 66, 1);
      font-weight: 500 !important;
    }
  }

  img {
  }
`;

const FaqContainerWrapper = styled(PageResponsiveWidth)`
  border: 1px solid rgba(144, 152, 178, 0.3);
  border-radius: 4px;
  background: rgba(249, 250, 252, 1);
  max-width: 1138px;
  margin: 60px 0px;

  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 40px;
`;
