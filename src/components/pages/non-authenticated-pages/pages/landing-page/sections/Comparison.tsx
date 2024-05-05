import { PageResponsiveWidth } from "components/pages/non-authenticated-pages/global-styles/styles";
import {
  H3,
  Paragraph,
} from "components/pages/non-authenticated-pages/global-styles/typogarphy";
import {
  Breakpoint,
  Colors,
} from "components/pages/transcations-flow/utils/stylesVariables";
import styled from "styled-components";
import { css } from "styled-components";

const tableHeader = [
  { img: "empty", alt: "" },
  { img: "/assets/main-logo-white.svg", alt: "SBremit logo" },
  { img: "/assets/logos/world-remit.png", alt: "world-remit logo" },
  { img: "/assets/logos/taptap.png", alt: "Taptap send logo" },
  { img: "/assets/logos/sendwave.png", alt: "sendwave logo" },
  { img: "/assets/logos/lemfi.png", alt: "lemfi logo" },
];

const tableData = [
  {
    label: "No Transfer Fee",
    sbremit: "/assets/icons/white_checkmark.png",
    worldRemit: "/assets/icons/red_cencelled.png",
    toptapSend: "/assets/icons/red_cencelled.png",
    sendWave: "/assets/icons/green_checkmark.png",
    lenfi: "/assets/icons/green_checkmark.png",
  },
  {
    label: "Mobile Money",
    sbremit: "/assets/icons/white_checkmark.png",
    worldRemit: "/assets/icons/green_checkmark.png",
    toptapSend: "/assets/icons/green_checkmark.png",
    sendWave: "/assets/icons/green_checkmark.png",
    lenfi: "/assets/icons/green_checkmark.png",
  },
  {
    label: "Bank Transfer",
    sbremit: "/assets/icons/white_checkmark.png",
    worldRemit: "/assets/icons/green_checkmark.png",
    toptapSend: "/assets/icons/red_cencelled.png",
    sendWave: "/assets/icons/red_cencelled.png",
    lenfi: "/assets/icons/green_checkmark.png",
  },
  {
    label: "Cash Pickup",
    sbremit: "/assets/icons/white_checkmark.png",
    worldRemit: "/assets/icons/green_checkmark.png",
    toptapSend: "/assets/icons/red_cencelled.png",
    sendWave: "/assets/icons/red_cencelled.png",
    lenfi: "/assets/icons/green_checkmark.png",
  },
  {
    label: "Cardless Withrawal",
    sbremit: "/assets/icons/white_checkmark.png",
    worldRemit: "/assets/icons/red_cencelled.png",
    toptapSend: "/assets/icons/red_cencelled.png",
    sendWave: "/assets/icons/red_cencelled.png",
    lenfi: "/assets/icons/green_checkmark.png",
  },
];

const Comparison = () => {
  return (
    <ComparisonStyles>
      <div className="_header">
        <H3 $large>How we compare with others</H3>
        <Paragraph $small>
          To see how we collected this data, <a href="#">click here</a>
        </Paragraph>
      </div>

      <div className="_data_container">
        <div className="_table">
          <div className="_table_header">
            {tableHeader.map((item, index) => (
              <CellStyles
                $filed={index === 1}
                key={"_table_head_" + index}
                $noBorderRight={index === tableHeader.length - 1}
              >
                {index !== 0 && <img src={item.img} alt={item.alt} />}
              </CellStyles>
            ))}
          </div>
          {tableData.map((item, index) => (
            <ColumnStyle
              key={item.label + index}
              $noBorder={index === tableData.length - 1}
            >
              <CellStyles $alignLeft>
                <Paragraph $small>{item.label}</Paragraph>
              </CellStyles>
              <CellStyles $filed>
                <img className="_icon" src={item.sbremit} />
              </CellStyles>
              <CellStyles>
                <img className="_icon" src={item.worldRemit} />
              </CellStyles>
              <CellStyles>
                <img className="_icon" src={item.toptapSend} />
              </CellStyles>
              <CellStyles>
                <img className="_icon" src={item.sendWave} />
              </CellStyles>
              <CellStyles $noBorderRight>
                <img className="_icon" src={item.lenfi} />
              </CellStyles>
            </ColumnStyle>
          ))}
        </div>
      </div>
    </ComparisonStyles>
  );
};

export default Comparison;

const ComparisonStyles = styled(PageResponsiveWidth).attrs({ as: "section" })`
  ._header {
    display: flex;
    flex-direction: column;
    gap: 6px;

    @media (max-width: ${Breakpoint.xl}) {
      align-items: center;
      text-align: center;
    }
    h3 {
      @media (max-width: ${Breakpoint.md}) {
        width: 280px;
      }
    }

    p {
      color: #6a6a6a;

      a {
        color: ${Colors.sbGreen};
        text-decoration: underline;

        &:hover {
          opacity: 0.85;
        }
      }
    }
  }

  ._data_container {
    width: auto;
    padding: 8px 0px;

    ._table {
      margin-top: 32px;
      border-radius: 28px;
      border: 0.7px solid #1e1e1e;
      overflow: hidden;
      /* width: max-content; */

      @media (max-width: ${Breakpoint.md}) {
        overflow-x: auto;
      }

      @media (max-width: ${Breakpoint.sm}) {
        margin-top: 24px;
      }

      ._table_header {
        display: flex;
        border-bottom: 0.7px solid #1e1e1e;
        width: 100%;
        box-sizing: border-box;

        @media (max-width: ${Breakpoint.md}) {
          width: max-content;
        }
      }
    }
  }
`;
const ColumnStyle = styled.div<{ $noBorder?: boolean }>`
  width: 100%;
  display: flex;
  border-bottom: 0.7px solid #1e1e1e;
  ${(props) =>
    props.$noBorder &&
    css`
      border-bottom: none;
    `}

  @media (max-width: ${Breakpoint.md}) {
    width: max-content;
  }
`;

const CellStyles = styled.div<{
  $filed?: boolean;
  $alignLeft?: boolean;
  $noBorderRight?: boolean;
}>`
  min-width: 180px;
  flex: 1;
  height: 100px;
  flex-shrink: 0;
  padding: 8px 0px;

  display: flex;
  align-items: center;
  justify-content: center;

  box-sizing: border-box;
  flex-shrink: 0;

  @media (max-width: 1440px) {
    min-width: 160px;
  }

  @media (max-width: ${Breakpoint.md}) {
    width: 150px;
    height: 66px;
    justify-content: ${(props) =>
      props.$alignLeft ? "flext-start" : "center"};
  }

  ${(props) =>
    props.$filed
      ? `
  border-bottom: 0.7px solid #FFF;
  background: ${Colors.sbGreen};
  color: #FFF;
  `
      : `
      border-right: 0.7px solid #1e1e1e;
      `}

  ${(props) => props.$noBorderRight && "border-right: none;"}

  p {
    text-align: left;
  }
  img {
    width: 50%;
  }

  ._icon {
    width: 28px;

    @media (max-width: ${Breakpoint.sm}) {
      width: 24px;
    }
    /* height: 28px; */
  }
`;
