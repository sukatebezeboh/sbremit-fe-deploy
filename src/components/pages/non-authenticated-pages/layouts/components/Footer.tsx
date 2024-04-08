import { SendOutlined } from "@ant-design/icons";
import { Button, Input, Space } from "antd";
import {
  Breakpoint,
  Colors,
} from "components/pages/transcations-flow/utils/stylesVariables";
import styled from "styled-components";
import { PageResponsiveWidth } from "../../global-styles/styles";
import { H4, Paragraph } from "../../global-styles/typogarphy";
import { paths } from "util/paths";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { subscribe } from "redux/actions/actions";

const SBremitWhiteLogo = "/assets/main-logo-white.svg";

const CompanyLinks = [
  {
    name: "About Us",
    link: paths.ABOUT,
  },
  {
    name: "FAQs",
    link: paths.HELP,
  },
  // {
  //   name: "Blog",
  //   link: paths.OUR_BLOG,
  // },
];

const LegalsLinks = [
  {
    name: "Privacy Policy",
    link: paths.PRIVACY_POLICY,
  },
  {
    name: "Terms & Conditions",
    link: paths.TERMS,
  },
  {
    name: "Cookie Policy",
    link: paths.COOKIE_POLICY,
  },
];

const ContactLinks = [
  {
    name: "+44(0)3301334158",
    link: paths.HELP,
  },
  {
    name: "contact@sbremit.com",
    link: paths.HELP,
  },
];

const Footer = () => {
  return (
    <FooterStyles>
      <FooterContentStyles>
        <div className="_top">
          <div className="_top_left">
            <img src={SBremitWhiteLogo} alt="SBremit logo" />
            <Paragraph $small>Copyright 2023. All rights reserved.</Paragraph>
          </div>
          <div className="_top_right">
            <TopRightContent />
          </div>
        </div>
        <div className="_bottom">
          <Paragraph>
            SB Remit is the trading name of Sukate & Bezeboh Ltd, registered in
            England and Wales, Company number 12735266, registered office 78
            Woodlands Way, Leeds, LS14 2AW. Sukate & Bezeboh Ltd is registered
            and regulated in the United Kingdom by the Financial Conduct
            Authority under electronic money regulations 2011 with firm
            reference number 935783 for the provision of payment services. SB
            Remit, Canada, is registered and regulated by the Financial and
            Reporting Analysis Centre of Canada as a Foreign Money Service
            Business. FMSB registration number: M21646577.
          </Paragraph>
        </div>
      </FooterContentStyles>
    </FooterStyles>
  );
};

export default Footer;

const TopRightContent = () => {
  const history = useHistory();
  return (
    <TopRightContentStyles>
      <div className="_links">
        <div className="_link">
          <H4>Company</H4>
          {CompanyLinks.map((link, index) => (
            <LinkStyles
              key={link.name + index}
              onClick={() => history.push(link.link)}
            >
              {link.name}
            </LinkStyles>
          ))}
        </div>

        <div className="_link">
          <H4>Legal</H4>
          {LegalsLinks.map((link, index) => (
            <LinkStyles
              key={link.name + index}
              onClick={() => history.push(link.link)}
            >
              {link.name}
            </LinkStyles>
          ))}
        </div>

        <div className="_link">
          <H4>Contact</H4>
          {ContactLinks.map((link, index) => (
            <LinkStyles
              key={link.name + index}
              onClick={() => history.push(link.link)}
            >
              {link.name}
            </LinkStyles>
          ))}
        </div>
      </div>

      <Subscribe />
    </TopRightContentStyles>
  );
};

const Subscribe = () => {
  const [inputValue, setInputValue] = useState("");

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubscribeClick = (e: any) => {
    e.preventDefault();
    const data = { email: inputValue };
    inputValue !== "" && subscribe(data);
  };

  return (
    <SubscribeStyles>
      <Paragraph>Stay tuned for the latest updates</Paragraph>

      <Space.Compact className="_compact">
        <form onSubmit={handleSubscribeClick}>
          <Input
            type="email"
            size="large"
            placeholder="Enter your email address"
            onChange={onChangeInput}
          />
          <Button
            htmlType="submit"
            size="large"
            icon={<SendOutlined rev={undefined} />}
          />
        </form>
      </Space.Compact>
    </SubscribeStyles>
  );
};

const FooterStyles = styled.footer`
  width: 100vw;
  padding: 86px 0px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: ${Colors.sbGreen};

  @media (max-width: ${Breakpoint.md}) {
    padding: 66px 0px;
  }

  @media (max-width: ${Breakpoint.sm}) {
    padding: 46px 0px;
  }
`;

const FooterContentStyles = styled(PageResponsiveWidth)`
  display: flex;
  flex-direction: column;
  gap: 100px;

  @media (max-width: ${Breakpoint.sm}) {
    gap: 60px;
  }

  ._top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    color: #fff;

    @media (max-width: ${Breakpoint.md}) {
      flex-direction: column;
      gap: 40px;
      align-items: center;
      text-align: center;
    }

    ._top_left {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 20px;

      @media (max-width: ${Breakpoint.xl}) {
        width: 250px;
      }

      @media (max-width: ${Breakpoint.md}) {
        width: 100%;
        gap: 14px;
        align-items: center;
      }

      @media (max-width: ${Breakpoint.sm}) {
        width: 100%;
        gap: 14px;
      }

      img {
        height: 42px;

        @media (max-width: ${Breakpoint.md}) {
          height: 32px;
        }
      }
    }
  }
  ._bottom {
    p {
      color: rgba(255, 255, 255, 0.7);
      font-weight: 300;

      @media (max-width: ${Breakpoint.md}) {
        text-align: center;
      }
    }
  }
`;

const TopRightContentStyles = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;

  ._links {
    display: flex;
    align-items: flex-start;
    gap: 150px;
    @media (max-width: ${Breakpoint.xl}) {
      gap: 60px;
    }

    @media (max-width: ${Breakpoint.md}) {
      text-align: left;
      align-items: center;
      gap: 120px;
      justify-content: space-between;
      width: 100%;
      text-align: center;
    }

    @media (max-width: ${Breakpoint.sm}) {
      flex-direction: column;
      gap: 42px;
    }
    ._link {
      display: flex;
      flex-direction: column;
      gap: 16px;

      h4 {
        font-weight: 700;
      }

      @media (max-width: ${Breakpoint.md}) {
        justify-content: center;
      }
    }
  }
`;

const LinkStyles = styled(Paragraph).attrs({ as: "a" })`
  cursor: pointer;

  &:hover,
  &:active {
    opacity: 0.85;
  }
`;

const SubscribeStyles = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;

  @media (max-width: ${Breakpoint.md}) {
    justify-content: center;
  }

  @media (max-width: ${Breakpoint.sm}) {
    flex-direction: column;
  }
  p {
    width: 200px;

    @media (max-width: ${Breakpoint.xl}) {
      width: 160px;
    }

    @media (max-width: ${Breakpoint.md}) {
      text-align: left;
    }

    @media (max-width: ${Breakpoint.sm}) {
      width: 100%;
      text-align: center;
    }
  }

  ._compact {
    Input {
      height: 64px;
      width: 400px;
      background: none;

      color: #fff;

      &::placeholder {
        color: #fff;
      }

      @media (max-width: ${Breakpoint.xl}) {
        width: 290px;
      }
      @media (max-width: ${Breakpoint.md}) {
        width: 300px;
      }

      @media (max-width: ${Breakpoint.sm}) {
        width: 260px;
      }
    }

    Button {
      height: 64px;
      width: 62px !important;
    }
  }
`;
