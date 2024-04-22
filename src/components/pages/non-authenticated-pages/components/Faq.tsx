import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { Collapse } from "antd";
import { PageResponsiveWidth } from "components/pages/non-authenticated-pages/global-styles/styles";
import {
  H3,
  H4,
  Paragraph,
} from "components/pages/non-authenticated-pages/global-styles/typogarphy";
import { Faqs } from "components/pages/non-authenticated-pages/layouts/components/FaqData";
import {
  Breakpoint,
  Colors,
} from "components/pages/transcations-flow/utils/stylesVariables";
import { useState } from "react";
import styled from "styled-components";

const { Panel } = Collapse;

const Faq = ({ showAllFaqs }: { showAllFaqs?: boolean }) => {
  const [activeFaq, setActiveFaq] = useState<string | string[]>([]);
  const totalFaqs = showAllFaqs ? Faqs.length : 5;

  const togglePanel = (key: string | string[]) => {
    setActiveFaq(key === activeFaq ? [] : key);
  };

  return (
    <FaqStyles>
      <H3 $large>Frequently Asked Questions</H3>
      <Collapse
        accordion
        activeKey={activeFaq}
        onChange={(key) => togglePanel(key)}
        bordered={false}
        className="_collapse"
      >
        {Faqs.slice(0, totalFaqs).map((faq, index) => (
          <Panel
            className="_panel"
            showArrow={false}
            header={
              <HeaderContainer $open={activeFaq.includes(`${index}`)}>
                <Paragraph className="_question">{faq.question}</Paragraph>
                <IconContainer>
                  {activeFaq.includes(`${index}`) ? (
                    <UpOutlined rev={undefined} />
                  ) : (
                    <DownOutlined rev={undefined} />
                  )}
                </IconContainer>
              </HeaderContainer>
            }
            key={index}
          >
            <ContentContainer>{faq.answers}</ContentContainer>
          </Panel>
        ))}
      </Collapse>
    </FaqStyles>
  );
};

export default Faq;

const FaqStyles = styled(PageResponsiveWidth).attrs({as: 'section'})`
  display: flex;
  flex-direction: column;

  gap: 40px;

  @media (max-width: ${Breakpoint.md}) {
    gap: 24px;
  }

  h3 {
    color: ${Colors.textColor3};
    @media (max-width: ${Breakpoint.xl}) {
      align-items: center;
      text-align: center;
    }
    @media (max-width: ${Breakpoint.md}) {
      width: 280px;
      align-self: center;
    }
  }

  ._collapse {
    display: flex;
    flex-direction: column;
    gap: 24px;
    background: none;

    @media (max-width: ${Breakpoint.sm}) {
      gap: 16px;
    }

    ._panel {
      //border: none !important;
      background: #fafafa;
      border-radius: 8px;
      border: 0.5px solid #e5e5e5;
      padding: 0px 20px;

      @media (max-width: ${Breakpoint.xl}) {
        padding: 0px 16px;
      }
      @media (max-width: ${Breakpoint.md}) {
        padding: 0px 12px;
      }

      @media (max-width: ${Breakpoint.sm}) {
        padding: 0px 8px;
      }
    }
  }
`;

const HeaderContainer = styled.div<{ $open: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 12px 0px;

  @media (max-width: ${Breakpoint.xl}) {
    padding: 8px 0px;
  }

  border-bottom: ${(props) => (props.$open ? "1px solid #0000001b" : "none")};

  gap: 8px;

  ._question {
    font-weight: 500;
  }
`;

const IconContainer = styled.div`
  transition: transform 0.3s ease;
`;

const ContentContainer = styled.div`
  margin: 0;
  padding: 8px 0px;

  p {
    font-weight: 300;
  }

  a {
    text-decoration: underline;
    color: ${Colors.sbGreen};
    &:hover {
      opacity: 0.85;
    }
  }
`;
