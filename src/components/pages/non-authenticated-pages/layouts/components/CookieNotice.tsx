import { Button } from "antd";
import { Colors } from "components/pages/transcations-flow/utils/stylesVariables";
import { FC } from "react";
import { CookieService } from "services/CookieService";
import styled from "styled-components";
import { paths } from "util/paths";
import { PageResponsiveWidth } from "../../global-styles/styles";
import { Paragraph } from "../../global-styles/typogarphy";

const CookieNotice: FC<{ close: Function }> = ({ close }) => {
  return (
    <CookieNoticeStyles>
      <CookieNoticeContentStyles>
        <Paragraph $small>
          {" "}
          This site uses cookies to deliver its services effectively.{" "}
          <a href={paths.COOKIE_POLICY} target="_blank" rel="noreferrer">
            Learn more
          </a>
        </Paragraph>
        <Button
          type="primary"
          onClick={() => {
            close();
            CookieService.put("cookie-notice", "cookie-notice", 365);
          }}
        >
          Ok, got it
        </Button>
      </CookieNoticeContentStyles>
    </CookieNoticeStyles>
  );
};

export default CookieNotice;

const CookieNoticeStyles = styled.div`
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  box-shadow: 5px 5px 6px 2px #000;
  background: #fff;
  z-index: 1000;
  padding: 24px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const CookieNoticeContentStyles = styled(PageResponsiveWidth)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;

  a {
    text-decoration: underline;
    color: ${Colors.sbGreen};

    &:hover,
    &:active {
      opacity: 0.85;
    }
  }
`;
