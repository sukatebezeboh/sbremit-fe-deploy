import { WhatsAppOutlined } from "@ant-design/icons";
import { Alert, Avatar, Space } from "antd";
import {
  Breakpoint,
  Colors,
} from "components/pages/transcations-flow/utils/stylesVariables";
import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import styled from "styled-components";
import { isMobileOrTablet } from "../../../../../util/util";
import { PageResponsiveWidth } from "../../global-styles/styles";
import { H2, H3, Paragraph, SpanText } from "../../global-styles/typogarphy";
import { Faq } from "../landing-page/sections";

const BGsvg = "/assets/bg/maintenance_svg.svg";
const SBlogo = "/assets/main-logo.svg";
const FaceBookLogo = "/assets/icons/facebook-rounded.svg";
const InstagramLogo = "/assets/icons/instagram-colorful.svg";

const getMobilePlatform = () => {
  const userAgent = navigator.userAgent;

  // Check for iOS
  if (/iPad|iPhone|iPod/.test(userAgent)) {
    return "iOS";
  }

  // Check for Android
  // (/android/i.test(userAgent))
  else {
    return "Android";
  }

  // return "unknown";
};

const SiteMaintenance = ({ data }: { data: any }) => {
  const { redirectToMobile, maintenanceCarouselMessage } = data || {};

  const isRedirectToMobile = Boolean(Number(redirectToMobile)) || false;

  const [countDown, setCountDown] = useState(5);

  // handle isRedirectToMobile
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isRedirectToMobile) {
      timer = setInterval(() => {
        setCountDown((prevCount) => {
          if (prevCount <= 1) {
            clearInterval(timer);
            const platform = getMobilePlatform();

            if (platform === "iOS") {
              window.location.href =
                "https://apps.apple.com/gb/app/sb-remit-money-transfer/id6443882446";
            } else if (platform === "Android") {
              window.location.href =
                "https://play.google.com/store/apps/details?id=com.sbremit&gl=GB&authuser=1";
            }
          }
          return prevCount - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isRedirectToMobile]);

  return (
    <SiteMaintenanceWrapper>
      <Navbar />
      {isRedirectToMobile && (
        <AlertWarpper>
          <Alert
            message={`You will be redirected to the SBremit mobile app to continue your transfer in ${countDown}s...`}
            type="warning"
            banner
            className="_alert"
          />
        </AlertWarpper>
      )}

      <Hero />
      <FaqContainer
        maintenanceCarouselMessage={maintenanceCarouselMessage || ""}
      />
    </SiteMaintenanceWrapper>
  );
};

export default SiteMaintenance;

const Navbar = () => {
  return (
    <NavbarWrapper>
      <img src={SBlogo} alt="SBremit logo" />
    </NavbarWrapper>
  );
};

const Hero = () => {
  const getWhatsappLink = () => {
    return `https://${
      isMobileOrTablet() ? "api" : "web"
    }.whatsapp.com/send?phone=${"443301334158"}`;
  };

  return (
    <HeroWrapper>
      <div className="_text">
        <H2>Get your money ready — We will be right back.</H2>
        <Paragraph>
          SB Remit is down for scheduled maintenance. We expect to be back
          online in a couple of hours.
        </Paragraph>

        <a
          className="_whatsapp_link"
          href={getWhatsappLink()}
          target="_blank"
          rel="noreferrer"
        >
          <Avatar
            icon={<WhatsAppOutlined rev={undefined} />}
            style={{ background: "#25D366" }}
          />
          <SpanText $small>Click to message us on whatsApp</SpanText>
        </a>
      </div>
      <img
        src={BGsvg}
        alt="Illustration of a wrench and gears symbolizing maintenance work"
      />
    </HeroWrapper>
  );
};

const FaqContainer = ({
  maintenanceCarouselMessage,
}: {
  maintenanceCarouselMessage: string;
}) => {
  return (
    <FaqContainerWrapper>
      <div className="_header">
        <Paragraph $small>FOLLOW US ON:</Paragraph>
        <div className="_social_Links">
          <a
            href="https://facebook.com/SBremitt"
            target="_blank"
            rel="noreferrer"
          >
            <img src={FaceBookLogo} alt="Facebook logo" />
          </a>
          <a
            href="https://www.instagram.com/sb.remit"
            target="_blank"
            rel="noreferrer"
          >
            <img src={InstagramLogo} alt="Facebook logo" />
          </a>
        </div>
      </div>

      <MarqueeContainer
        maintenanceCarouselMessage={maintenanceCarouselMessage}
      />

      <H3>Have some questions? We’ve got answers!</H3>

      <Faq showAllFaqs hideHeader />
    </FaqContainerWrapper>
  );
};

const MarqueeContainer = ({
  maintenanceCarouselMessage,
}: {
  maintenanceCarouselMessage: string;
}) => {
  return (
    <MarqueeContainerWarpper>
      <div className="_marquee_content">
        <Marquee pauseOnHover gradient={false}>
          <Space size={44}>
            {Array(5)
              .fill(null)
              .map((_, index) => (
                <Space key={index + "_marquee_text"} size={44}>
                  <Dot />
                  <Paragraph>
                    {maintenanceCarouselMessage ||
                      "Thank you for your patience!"}
                  </Paragraph>
                </Space>
              ))}
          </Space>
        </Marquee>
      </div>
    </MarqueeContainerWarpper>
  );
};

const SiteMaintenanceWrapper = styled.div`
  background-color: #ffffff;
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AlertWarpper = styled(PageResponsiveWidth)`
  max-width: 1138px;
  ._alert {
    width: 100%;
  }
`;

const NavbarWrapper = styled(PageResponsiveWidth).attrs({ as: "nav" })`
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

const HeroWrapper = styled(PageResponsiveWidth).attrs({ as: "section" })`
  max-width: 1138px;
  padding: 38px 0px;

  display: flex;
  /* flex-wrap: wrap; */
  align-items: center;
  justify-content: space-between;

  @media (max-width: ${Breakpoint.md}) {
    padding: 28px 0px;
  }

  ._text {
    display: flex;
    flex-direction: column;
    gap: 32px;
    width: 50%;

    @media (max-width: ${Breakpoint.md}) {
      width: 80%;
      gap: 24;
    }
    @media (max-width: ${Breakpoint.sm}) {
      width: 90%;
      gap: 18px;
    }

    h2 {
      color: rgba(66, 66, 66, 1);
    }
    p {
      color: rgba(112, 112, 112, 1);
    }

    ._whatsapp_link {
      height: 56px;
      border-radius: 200px;
      border-width: 2px;

      border: 3px solid rgba(0, 123, 93, 1);

      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;

      width: auto;
      max-width: 340px;

      color: rgba(66, 66, 66, 1);
      font-weight: 500 !important;

      &:hover {
        background-color: rgba(0, 123, 93, 0.05);
      }

      @media (max-width: ${Breakpoint.md}) {
        height: 48px;
        width: 300px;
      }
    }
  }

  img {
    @media (max-width: ${Breakpoint.md}) {
      display: none;
    }
  }
`;

const FaqContainerWrapper = styled(PageResponsiveWidth).attrs({
  as: "section",
})`
  border: 1px solid rgba(144, 152, 178, 0.3);
  border-radius: 4px;
  background: #fafafa;
  max-width: 1138px;
  margin: 60px 0px;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 64px;

  padding: 40px;

  @media (max-width: ${Breakpoint.md}) {
    margin: 30px 0px;
    padding: 20px;
    gap: 44px;
  }

  ._header {
    display: flex;
    flex-direction: column;
    gap: 24px;
    ._social_Links {
      display: flex;
      gap: 20px;
      align-items: center;
      justify-content: center;

      padding: 12px 16px;
      background: #fff;
      border-radius: 200px;
    }
  }

  h3 {
    width: 494px;
    text-align: center;
    color: rgba(66, 66, 66, 1);

    @media (max-width: ${Breakpoint.md}) {
      width: 100%;
    }
  }
`;

const MarqueeContainerWarpper = styled.div`
  width: 100vw;
  background: rgba(66, 66, 66, 1);
  padding: 0px 2vw;

  ._marquee_content {
    background: ${Colors.sbGreen};
    padding: 20px 0px;
    color: #fff;

    @media (max-width: ${Breakpoint.md}) {
      padding: 12px 0px;
    }
  }
`;

const Dot = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 200px;
  background: #fff;
  margin: 0 12px;
`;
