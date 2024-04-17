import styled from "styled-components";

export const Colors = {
  textColor: "#212121",
  textColor2: "#808080",
  textColor3: "#1E1E1E",
  borderColor: "#EDEDED",
  borderColor2: "#D9D9D9",
  bgwhite: "#FFF",
  bgBodyColor: "#F8F8F8",
  sbGreen: "#007B5D",
  sbRed: "#CF0921",
};

export const Breakpoint = {
  xs: "480px",
  sm: "576px",
  md: "768px",
  lg: "992px",
  xl: "1200px",
  xxl: "1600px",
};

export const AntdConfigSettings = {
  token: {
    colorPrimary: "#007B5D",
    colorPrimaryBg: "#E7EEEC",
    colorError: "#CF0921",
    colorSuccess: "#007B5D",
  },
  components: {
    Button: {
      colorLink: "#007B5D",
    },
    Steps: {
      colorPrimary: "#FFF",
      colorSplit: "rgba(255, 255, 255, 0.4)",
      colorText: "#FFF",
      colorTextDescription: "#D9D9D9",
      fontSize: 14,
      fontSizeHeading3: 16,
    },
    List: {
      headerBg: "#FFF",
    },
  },
};

export const Heading = styled.p`
  color: ${Colors.textColor};
  font-size: 24px;
  font-weight: 500;
  text-transform: capitalize;

  @media (max-width: ${Breakpoint.sm}) {
    font-size: 20px;
  }
`;

export const ResponsiveMarginTopForPagesWithSteps = styled.div`
  margin-top: 210px;
  margin-bottom: 40px;
  @media (max-width: ${Breakpoint.sm}) {
    //margin-top: 360px;
    margin-top: 32px;
  }
`;

export const ModalMarginTop = {
  //top: "15%",
};

export const TransactionDetailModalStyles = {
  header: {
    paddingInlineStart: 20,
    paddingTop: 16,
    paddingBottom: 5,
  },
  body: {
    paddingBottom: 10,
  },
  content: {
    padding: 0,
  },
};

export const columnSizes = { xs: 1, sm: 1, md: 1, lg: 1, xl: 1, xxl: 1 };

export const ContainerBoxShadow = styled.div`
  box-shadow: 0px 4.16441px 5.32008px 0px rgba(0, 0, 0, 0.08),
    0px 11.44983px 17.86905px 0px rgba(0, 0, 0, 0.08);
`;
