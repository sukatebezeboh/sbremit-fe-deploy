import { Button } from "antd";
import { PageResponsiveWidth } from "components/pages/non-authenticated-pages/global-styles/styles";
import {
  H3,
  Paragraph,
} from "components/pages/non-authenticated-pages/global-styles/typogarphy";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Breakpoint } from "components/pages/transcations-flow/utils/stylesVariables";

const QuoteIcon = "/assets/icons/quote_svg.svg";

const whatTheySaysArray = [
  {
    message:
      "They are very efficient and always helpful. The Set up process for their app was very easy and rapid. They are easy and straight forward to contact directly, and also responsive. I will recommend them for their excellent customer service and professionalism. For the past two years, I have been able to send money to family and my business in Cameroon at the touch of a button with assurance and security. I have never had any issue with any of my transactions.",
    name: "Charles Mambo",
    location: "London",
  },
  {
    message:
      "Excellent customer service! Prompt and efficient communication and a really easy way to transfer funds. SB Remit offers great rates and the staff is always helpful, courteous and pleasant to work with. SB Remit makes money transfer a walk in the park!",
    name: "Cynthia",
    location: "London",
  },
  {
    message:
      "I have been using SB remit to send money back home since May 2021. The service is great every time, and now even better with the launch of their website. The registration process is easy and straightforward. I am most impressed by how quickly my loved ones receive their money. Literally a few minutes after sending.",
    name: "Tina Ntube",
    location: "London",
  },
];

const WhatTheySay = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isNextDisabled, setIsNextDisabled] = useState<boolean>(false);
  const [isPrevDisabled, setIsPrevDisabled] = useState<boolean>(false);

  const handleScroll = (scrollDirection: string) => {
    const contentElement = contentRef.current;

    if (contentElement) {
      const scrollAmount = 550;
      const currentScrollLeft = contentElement.scrollLeft;

      if (scrollDirection === "next") {
        contentElement.scrollTo({
          left: currentScrollLeft + scrollAmount,
          behavior: "smooth",
        });
      } else if (scrollDirection === "prev") {
        contentElement.scrollTo({
          left: currentScrollLeft - scrollAmount,
          behavior: "smooth",
        });
      }
    }
  };

  useEffect(() => {
    const contentElement = contentRef.current;

    if (contentElement) {
      const handleScrollEnd = () => {
        const maxScroll =
          contentElement.scrollWidth - contentElement.clientWidth;
        setIsNextDisabled(contentElement.scrollLeft >= maxScroll);

        setIsPrevDisabled(contentElement.scrollLeft === 0);
      };

      contentElement.addEventListener("scroll", handleScrollEnd);

      handleScrollEnd();

      return () => {
        contentElement.removeEventListener("scroll", handleScrollEnd);
      };
    }
  }, []);

  return (
    <WhatTheySayStyles>
      <div className="_header">
        <H3 $large>What Our Happy Customers Say</H3>
        <div className="_buttons">
          <Button
            size="large"
            onClick={() => handleScroll("prev")}
            disabled={isPrevDisabled}
            icon={<LeftOutlined rev={undefined} />}
          />

          <Button
            size="large"
            onClick={() => handleScroll("next")}
            disabled={isNextDisabled}
            icon={<RightOutlined rev={undefined} />}
          />
        </div>
      </div>
      <div className="_content" ref={contentRef}>
        {whatTheySaysArray.map((item, index) => (
          <CardStyle key={item.name + index}>
            <img src={QuoteIcon} />
            <div className="_messages">
              <Paragraph $small>{item.message}</Paragraph>
              <div className="_footer">
                <span>{item.name}</span>
                <span>{item.location}</span>
              </div>
            </div>
          </CardStyle>
        ))}
      </div>
    </WhatTheySayStyles>
  );
};

export default WhatTheySay;

const WhatTheySayStyles = styled(PageResponsiveWidth).attrs({ as: "section" })`
  display: flex;
  flex-direction: column;
  gap: 40px;

  ._header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    @media (max-width: ${Breakpoint.md}) {
      justify-content: center;
      h3 {
        width: 280px;
        text-align: center;
      }
    }

    ._buttons {
      display: none;
      gap: 16px;
      @media (max-width: ${Breakpoint.md}) {
        display: none;
      }
    }
  }

  ._content {
    display: flex;
    gap: 24px;
    width: auto;
    justify-content: space-between;
    transition: transform 0.3s ease;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }

    @media (max-width: 1440px) {
      overflow-x: auto;
      gap: 18px;
    }
  }
`;

const CardStyle = styled.div`
  display: flex;
  width: 500px;
  padding: 40px;
  flex-direction: column;
  align-items: flex-start;

  gap: 24px;
  /* align-self: stretch; */
  box-sizing: border-box;
  flex-shrink: 0;

  ._messages {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    gap: 24px;
  }

  @media (max-width: ${Breakpoint.xl}) {
    width: 400px !important;
    padding: 32px;
  }

  @media (max-width: ${Breakpoint.md}) {
    width: 320px !important;
    padding: 22.258px;
    gap: 18px;

    img {
      width: 20%;
    }
  }

  @media (max-width: ${Breakpoint.sm}) {
    width: 276px !important;
  }

  border-radius: 16px;
  background: var(--Not-white, #fafafa);

  ._footer {
    width: 100%;
    border-top: 1px solid #e5e5e5;
    padding: 16px 0px;
    display: flex;
    flex-direction: column;
    gap: 16px;

    @media (max-width: ${Breakpoint.sm}) {
      gap: 10px;
    }

    span {
      color: #1e1e1e;
      font-size: 20px;
      font-weight: 700;
      letter-spacing: -1px;

      @media (max-width: ${Breakpoint.sm}) {
        font-size: 16px;
        letter-spacing: -0.2px;
      }
    }
    span:last-child {
      color: #6a6a6a;
      font-weight: 300;
    }
  }
`;
