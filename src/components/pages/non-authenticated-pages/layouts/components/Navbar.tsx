import { CloseOutlined, MenuOutlined } from "@ant-design/icons";
import { Button, Menu, MenuProps } from "antd";
import {
  Breakpoint,
  Colors,
} from "components/pages/transcations-flow/utils/stylesVariables";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import styled from "styled-components";
import { paths } from "util/paths";
import { PageResponsiveWidth, fadeIn } from "../../global-styles/styles";
import { useLocation } from "react-router-dom";

const SBlogo = `/assets/main-logo.svg`;

const Navbar = () => {
  const location = useLocation();
  const isMobile = useSelector((state: any) => state.isMobileView);
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const histrory = useHistory();

  useEffect(() => {
    setOpenMobileMenu(false);
  }, [location?.pathname]);

  return (
    <NavbarStyles>
      <NavbarContentStyles>
        <img
          src={SBlogo}
          alt="sbremit logo"
          onClick={() => histrory.push(paths.LANDING)}
        />
        {isMobile ? (
          <MobileMenu open={openMobileMenu} />
        ) : (
          <NavLinks isMobile={false} />
        )}

        {isMobile ? (
          <Button
            size="large"
            type="text"
            icon={
              openMobileMenu ? (
                <CloseOutlined rev={undefined} />
              ) : (
                <MenuOutlined rev={undefined} />
              )
            }
            onClick={() => setOpenMobileMenu(!openMobileMenu)}
          />
        ) : (
          <SignUpAndSignIn />
        )}
      </NavbarContentStyles>
    </NavbarStyles>
  );
};

export default Navbar;

const SignUpAndSignIn = () => {
  const histrory = useHistory();

  return (
    <SignUpAndSignInStyles>
      <Button onClick={() => histrory.push(paths.SIGN_IN)}>Sign in</Button>
      <Button type="primary" onClick={() => histrory.push(paths.SIGN_UP)}>
        Sign up
      </Button>
    </SignUpAndSignInStyles>
  );
};

const NavLinks = ({ isMobile }: { isMobile: boolean }) => {
  const [currentLink, setCurrentLink] = useState("");
  const histrory = useHistory();
  const location = useLocation();

  const isLanding = location.pathname === paths.LANDING; //"/cameroon" || "/uganda" || "/tazania" || "/kenya";

  const items: MenuProps["items"] = [
    isLanding
      ? null
      : {
          label: "Home",
          key: paths.LANDING,
        },
    {
      label: "Company",
      key: "company",
      children: [
        {
          label: "About Us",
          key: paths.ABOUT,
        },
        {
          label: "Careers",
          key: "careers",
        },
        {
          label: "Our Blog",
          key: paths.OUR_BLOG,
        },
        {
          label: "Legal",
          key: "legal",
          children: [
            {
              label: "Privacy Policy",
              key: paths.PRIVACY_POLICY,
            },
            {
              label: "Terms & Conditions",
              key: paths.TERMS,
            },
            {
              label: "Cookie Policy",
              key: paths.COOKIE_POLICY,
            },
          ],
        },
      ],
    },
    {
      label: "How it Works",
      key: paths.HOW_IT_WORKS,
    },
    {
      label: "Help",
      key: paths.HELP,
    },
  ];

  useEffect(() => {
    setCurrentLink(location?.pathname);
  }, [location]);

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrentLink(e.key);
    histrory.replace(e.key);
  };

  return (
    <NavLinksStyles>
      <Menu
        className="_menu"
        onClick={onClick}
        defaultOpenKeys={isMobile ? ["company"] : undefined}
        selectedKeys={[currentLink]}
        mode={isMobile ? "inline" : "horizontal"}
        items={items}
      />
    </NavLinksStyles>
  );
};

const MobileMenu = ({ open }: { open: boolean }) => {
  return open ? (
    <MobileMenuStyles>
      <NavLinks isMobile={true} />
      <SignUpAndSignIn />
    </MobileMenuStyles>
  ) : (
    <></>
  );
};

//styled components
const NavbarStyles = styled.nav`
  position: fixed;
  top: 0;
  width: 100vw;
  background: #fff;

  display: flex;
  align-items: center;
  justify-content: center;

  z-index: 10 !important;

  @media (max-width: ${Breakpoint.md}) {
    border-bottom: 1px solid #e5e5e5;
  }
`;
const NavbarContentStyles = styled(PageResponsiveWidth)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 28px 0px;
  background: ${Colors.bgwhite};

  img {
    width: 205.268px;
    height: 48px;
    cursor: pointer;

    &:hover {
      opacity: 0.85;
    }

    @media (max-width: ${Breakpoint.xl}) {
      width: 160px;
    }
    @media (max-width: ${Breakpoint.md}) {
      width: 120px;
    }
    @media (max-width: ${Breakpoint.sm}) {
      width: 105px;
    }
  }

  @media (max-width: ${Breakpoint.md}) {
    padding: 18px 0px;
  }
`;

const SignUpAndSignInStyles = styled.div`
  display: flex;
  gap: 16px;

  Button {
    height: 60px;
    width: 170px;

    font-size: 20px;

    @media (max-width: ${Breakpoint.xl}) {
      width: 100%;
      font-size: 18px;
      height: 48px;
    }

    @media (max-width: ${Breakpoint.md}) {
      font-size: 18px;
      height: 44px;
    }

    @media (max-width: ${Breakpoint.sm}) {
      font-size: 16px;
      height: 44px;
    }
  }

  @media (max-width: ${Breakpoint.xl}) {
    gap: 12px;
  }

  @media (max-width: ${Breakpoint.md}) {
    width: 100%;
    flex-direction: column-reverse;
    gap: 8px;
  }
`;

const NavLinksStyles = styled.div`
  width: 100%;

  .ant-menu-horizontal {
    border: none !important;
    box-sizing: border-box;
    flex-shrink: 0;
    flex: 1;
    gap: 16px;

    display: flex;
    align-items: center;
    justify-content: center;

    &:focus,
    &:active {
      border: none;
      outline: none;
    }

    li {
      font-size: 20px;
      @media (max-width: ${Breakpoint.xl}) {
        font-size: 18px;
      }
    }

    @media (max-width: ${Breakpoint.xl}) {
      gap: 4px;
    }
  }

  .ant-menu-inline {
    gap: 16px;

    li {
      font-size: 18px;
      @media (max-width: ${Breakpoint.sm}) {
        font-size: 16px;
      }
    }
    .ant-menu-item-only-child,
    .ant-menu-submenu-title,
    .ant-menu-title-content {
      padding: 26px 12px !important;

      flex-shrink: 0;
      box-sizing: border-box;
    }
  }

  .ant-menu-submenu-inline > .ant-menu-sub .ant-menu-item-only-child {
    padding-left: 28px !important;
  }

  .ant-menu-submenu-expand-icon,
  .ant-menu-submenu-arrow {
    rotate: 90deg;
    display: block;
    right: 0;
    margin-right: -16px;

    @media (max-width: ${Breakpoint.md}) {
      rotate: 0deg;
      margin-right: 0px;
      right: 12px;
    }
  }
`;

const MobileMenuStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  max-height: 800px;
  overflow-y: auto;

  background: ${Colors.bgwhite};
  width: auto;
  margin-left: 5%;
  margin-right: 5%;
  margin-top: 88px;
  padding: 28px 20px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  /* transform: translate(-50%, -50%); */
  z-index: 8 !important;

  animation: ${fadeIn} 0.2s ease-in;
  transform-origin: top;
  transform-style: preserve-3d;

  border: 1px solid #e5e5e5;

  box-shadow: 0px 3px 6px -4px rgba(0, 0, 0, 0.12),
    0px 6px 16px 0px rgba(0, 0, 0, 0.08), 0px 9px 28px 8px rgba(0, 0, 0, 0.05);
`;
