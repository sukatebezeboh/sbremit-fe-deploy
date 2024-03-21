import { Button } from "antd";
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

const RemitanceMethodArray = [
  {
    name: "Mobile Money",
    description:
      "Unlock a world of possibilities – Sign up now and start experiencing the future today!",
  },
  {
    name: "Bank Transfer",
    description: "Add a recipient to send money and enhance app experience.",
  },
  {
    name: "Cash Pickup",
    description:
      "Stay in control of your finances- Review transactions and confirm the details.",
  },
];

const RemitanceMethods = () => {
  return (
    <RemitanceMethodsStyles>
      <div className="_left_content">
        <H3 $large>Money Remittance Methods We Offer</H3>
        <Paragraph>
          The cost and speed of a money transfer depends on the receiving
          country, the receive method as well as how it is paid for. Currently,
          there are a maximum of three different receive methods available on SB
          Remit.
        </Paragraph>
        <Button type="primary" size="large">
          Send money
        </Button>
      </div>
      <div className="_right_content">
        {RemitanceMethodArray.map((method, index) => (
          <RemitanceMethodStyles>
            <Paragraph>{method.name}</Paragraph>
            <Paragraph $small>{method.description}</Paragraph>
          </RemitanceMethodStyles>
        ))}
      </div>
    </RemitanceMethodsStyles>
  );
};

export default RemitanceMethods;

const RemitanceMethodsStyles = styled(PageResponsiveWidth)`
  display: flex;
  justify-content: space-between;

  @media (max-width: ${Breakpoint.xl}) {
    flex-direction: column;
    gap: 42px;
    align-items: center;
  }

  ._left_content {
    width: 40%;

    display: flex;
    flex-direction: column;
    gap: 24px;

    @media (max-width: ${Breakpoint.xl}) {
      width: 80%;
      align-items: center;
      text-align: center;
    }

    @media (max-width: ${Breakpoint.md}) {
      width: 100%;
    }

    h3 {
      font-weight: 600;
    }

    Button {
      height: 62px;
      width: 216px;

      @media (max-width: ${Breakpoint.sm}) {
        height: 54px;
        width: 180px;
      }
    }
  }
  ._right_content {
    width: 50%;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;

    @media (max-width: ${Breakpoint.xl}) {
      width: 100%;
      justify-content: center;
      /* flex-direction */
    }
  }
`;

const RemitanceMethodStyles = styled.div`
  display: flex;
  width: 367px;
  padding: 89px 33px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 12px;

  border-radius: 8px;
  background: #fafafa;

  color: ${Colors.textColor3};

  @media (max-width: 1440px) {
    width: 310px;
    padding: 68px 28px;
  }

  @media (max-width: ${Breakpoint.sm}) {
    width: 100%;
    padding: 58px 24px;
  }

  p {
    font-weight: 600;
  }
  p:last-child {
    font-weight: 300;
  }
`;
