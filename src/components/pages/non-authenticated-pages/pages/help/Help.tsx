import {
    FacebookFilled,
    InstagramFilled,
    MailFilled,
    PhoneOutlined,
} from "@ant-design/icons";
import emailjs from "@emailjs/browser";
import { Button, Form, Input } from "antd";
import {
    Breakpoint,
    Colors,
} from "components/pages/transcations-flow/utils/stylesVariables";
import { Helmet } from "react-helmet";
import { toastAction } from "redux/actions/actions";
import styled from "styled-components";
import EndBanner from "../../components/EndBanner";
import Faq from "../../components/Faq";
import {
    PageResponsiveWidth,
    PageWrapperStyles,
} from "../../global-styles/styles";
import { H4, HeroText, Paragraph } from "../../global-styles/typogarphy";

const { TextArea } = Input;

const heroBgImg = "/assets/images/help_page_bgImage.png";

const SocialLinksArray = [
  {
    text: "+44(0)3301334158",
    icon: <PhoneOutlined rev={undefined} />,
    // href: "",
  },
  {
    text: "sbremit",
    icon: <InstagramFilled rev={undefined} />,
    href: "https://www.instagram.com/sb.remit",
  },
  {
    text: "contact@sbremit.com",
    icon: <MailFilled rev={undefined} />,
    href: "",
  },
  {
    text: "SB Remit",
    icon: <FacebookFilled rev={undefined} />,
    href: "https://facebook.com/SBremitt",
  },
];

const Help = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Help Page | SB Remit</title>
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
        <Faq showAllFaqs />
        <EndBanner />
      </PageWrapperStyles>
    </>
  );
};

export default Help;

const Hero = () => {
  return (
    <HeroStyles>
      <HeroContentStyles>
        <LeftHeroContent />
        <RightHeroContent />
      </HeroContentStyles>
    </HeroStyles>
  );
};

const LeftHeroContent = () => {
  return (
    <LeftHeroContentStyles>
      <div className="_hero_texts">
        <HeroText>How can we help you today?</HeroText>
        <Paragraph>
          Let’s get you started with the necessary support you need for your
          business. Contact our support team or read through our FAQs.
        </Paragraph>
      </div>

      <div className="_social_links">
        {SocialLinksArray.map((item) => (
          <div className="_link" key={item.text}>
            <span>{item.icon}</span>
            <a target="_blank" rel="noreferrer" href={item.href}>
              <Paragraph $small>{item.text}</Paragraph>
            </a>
          </div>
        ))}
      </div>
    </LeftHeroContentStyles>
  );
};

type FieldType = {
  fullname?: string;
  mobile?: string;
  email?: string;
  transferId?: string;
  message?: string;
};

const RightHeroContent = () => {
  const [form] = Form.useForm<FieldType>();

  const onFinish = (values: any) => {
    //console.log("Success:", values);

    emailjs
      .send("service_899wtxn", "template_2oj9lu8", values, "p1WYYOlh6LUYqiOST")
      .then(
        (res) => {
          toastAction({
            show: true,
            type: "success",
            timeout: 10000,
            message: "Mail recieved. We will address your request shortly",
          });
        },
        (error) => {
          toastAction({
            show: true,
            type: "error",
            timeout: 10000,
            message: "There was error sending your mail. Retry after 5 minutes",
          });
        }
      );

    form.resetFields();
  };

  const onFinishFailed = (errorInfo: any) => {
    // console.log("Failed:", errorInfo);
  };

  return (
    <RightHeroContentStyles>
      <H4>Leave me a message</H4>
      <Paragraph $small>We’ll get back to you in 24 hours.</Paragraph>
      <Form
        form={form}
        name="contact-us"
        className="_form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
      >
        <Flex>
          <Form.Item<FieldType>
            label="Your Name"
            name="fullname"
            className="_form_item"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input placeholder="Enter your name" />
          </Form.Item>

          <Form.Item<FieldType>
            label="Mobile Number"
            name="mobile"
            className="_form_item"
            rules={[
              { required: true, message: "Please input your mobile number!" },
            ]}
          >
            <Input placeholder="e.g. +44 0 11111 11111" />
          </Form.Item>
        </Flex>

        <Flex>
          <Form.Item<FieldType>
            label="Email Address"
            name="email"
            className="_form_item"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input type="email" placeholder="Enter your email address" />
          </Form.Item>

          <Form.Item<FieldType>
            label="Transfer ID"
            name="transferId"
            className="_form_item"
            rules={[
              { required: true, message: "Please input your transfer ID!" },
            ]}
          >
            <Input placeholder="Enter your transfer ID" />
          </Form.Item>
        </Flex>

        <Flex>
          <Form.Item<FieldType>
            label="Complaint"
            name="message"
            className="_form_item_textArea"
            rules={[
              { required: true, message: "Please input your complaints!" },
            ]}
          >
            <TextArea
              showCount
              maxLength={500}
              placeholder="Type your complaints"
              style={{ height: 170, resize: "none" }}
            />
          </Form.Item>
        </Flex>

        <Flex>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              <Paragraph $small>Submit</Paragraph>
            </Button>
          </Form.Item>
        </Flex>
      </Form>
    </RightHeroContentStyles>
  );
};

const HeroStyles = styled.section`
  width: 100%;
  height: 861px;
  flex-shrink: 0;

  background-image: ${`url(${heroBgImg})`};
  background-size: cover;
  background-repeat: no-repeat;

  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.6);

    width: 100%;
    height: 100%;
    z-index: 0;
  }
  @media (max-width: ${Breakpoint.xl}) {
    height: auto;
    padding: 80px 0px;
    height: auto;
  }

  @media (max-width: ${Breakpoint.md}) {
    padding: 60px 0px;
  }
`;

const HeroContentStyles = styled(PageResponsiveWidth)`
  z-index: 1;

  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 100px;

  @media (max-width: ${Breakpoint.xl}) {
    flex-direction: column;
    gap: 60px;
  }
  @media (max-width: ${Breakpoint.sm}) {
    gap: 40px;
  }
`;

const LeftHeroContentStyles = styled.div`
  width: 45%;
  display: flex;
  flex-direction: column;
  gap: 80px;

  @media (max-width: ${Breakpoint.xl}) {
    width: 80%;
    text-align: center;
    gap: 30px;
  }

  @media (max-width: ${Breakpoint.md}) {
    width: 100%;
  }

  @media (max-width: ${Breakpoint.sm}) {
    gap: 20px;
  }

  ._hero_texts {
    display: flex;
    flex-direction: column;
    gap: 24px;
    h1 {
      background: linear-gradient(98deg, #007b5d 22.72%, #ffe62e 78.19%);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  ._social_links {
    width: 431px;
    display: flex;
    gap: 30px;
    flex-wrap: wrap;

    @media (max-width: ${Breakpoint.xl}) {
      width: 100%;
      text-align: center;
      justify-content: center;
      gap: 16px;
    }

    ._link {
      display: flex;
      gap: 8px;
      align-items: center;
      text-decoration: underline;
      cursor: pointer;

      &:hover,
      &:active {
        opacity: 0.85;
      }
    }
  }
`;

const RightHeroContentStyles = styled.div`
  width: 40%;

  border-radius: 16px;
  background: #fff;
  height: auto;
  flex-shrink: 0;
  overflow: hidden;
  color: ${Colors.textColor3};

  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  padding: 45px;
  flex-shrink: 0;
  box-sizing: border-box;

  @media (max-width: 1440px) {
    width: 44%;
    padding: 40px;
  }

  @media (max-width: ${Breakpoint.xl}) {
    width: 80%;
  }

  @media (max-width: ${Breakpoint.md}) {
    width: 100%;
    padding: 32px;
  }

  @media (max-width: ${Breakpoint.sm}) {
    width: 100%;
    padding: 24px;
    border-radius: 14px;
  }

  h4 {
    font-weight: 700;
  }

  ._form {
    width: 100%;
    padding: 40px 0px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 0px;
    margin-top: 34px;

    @media (max-width: ${Breakpoint.md}) {
      margin-top: 20px;
    }

    Input {
      height: 52px;
      width: 100% !important;
      font-size: 16px;
    }
    Button {
      height: 52px;
      width: 150px;
      margin-top: 14px;

      @media (max-width: ${Breakpoint.md}) {
        margin-top: 0px;
      }
    }
  }
`;

const Flex = styled.div`
  display: flex;
  gap: 14px;
  width: 100%;
  justify-content: space-between;

  ._form_item {
    width: 50%;
  }
  ._form_item_textArea {
    width: 100%;
  }
  Input,
  TextArea {
    width: 100% !important;
    width: max-content !important;
    flex: 1 !important;
    padding: 16px 14px;
  }

  @media (max-width: ${Breakpoint.sm}) {
    flex-direction: column;
    gap: 0px;

    ._form_item {
      width: 100%;
    }
  }
`;
