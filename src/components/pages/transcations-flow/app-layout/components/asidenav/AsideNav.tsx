import {
  AsideNavContainerStyles,
  SBRLogo,
  BannerPromotionStyle,
} from "./AsideNavStyles";
import type { MenuProps } from "antd";
import { Button, Menu } from "antd";
import {
  HomeOutlined,
  SwapOutlined,
  GiftOutlined,
  IdcardOutlined,
  UserOutlined,
  SettingOutlined,
  FilePdfOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { getCurrentPathName } from "components/pages/transcations-flow/utils/reuseableUtils";
import { signOutAction } from "redux/actions/actions";
import { useSelector } from "react-redux";
import { paths } from "util/paths";

const SBlogo = `/assets/main-logo.svg`;
const PromotionSVG = "/assets/icons/promotion_svg_icon.svg";
const PiggyMoneySVG = "/assets/images/piggy-money-box.png";

export default function AsideNav() {
  const isUserVerified = useSelector((state: any) => state.auth.verification);
  const location = useLocation();
  const currentMenu = getCurrentPathName(location.pathname).withDash;
  const history = useHistory();

  const onMenuClick: MenuProps["onClick"] = (e) => {
    if (e.key === "logout") {
      signOutAction();
    } else {
      history.push(`/${e.key}`);
    }
  };

  const menuList: MenuProps["items"] = [
    {
      label: "Dashboard",
      key: "dashboard",
      icon: <HomeOutlined rev={undefined} />,
      //disabled: !isUserVerified,
    },
    {
      label: "Transactions",
      key: "transactions",
      icon: <SwapOutlined rev={undefined} />,
      //disabled: !isUserVerified,
    },
    {
      label: "Referrals",
      key: "referrals",
      icon: <GiftOutlined rev={undefined} />,
      //disabled: true, //!isUserVerified,
    },
    {
      label: "Verification",
      key: "verification",
      icon: <IdcardOutlined rev={undefined} />,
      // disabled: true,
    },
    {
      label: "Profile",
      key: "profile",
      icon: <UserOutlined rev={undefined} />,
      //disabled: !isUserVerified,
    },
    {
      label: "Settings",
      key: "settings",
      icon: <SettingOutlined rev={undefined} />,
      //disabled: !isUserVerified,
    },
    {
      label: "Logout",
      key: "logout",
      icon: <LogoutOutlined rev={undefined} />,
      danger: true,
    },
  ];

  return (
    <AsideNavContainerStyles>
      <div className="logo_and_menu">
        <SBRLogo src={SBlogo} alt="SB logo" />
        <Menu
          onClick={onMenuClick}
          selectedKeys={[currentMenu]}
          mode="inline"
          items={menuList}
          className="menu"
          // defaultOpenKeys={["transactions"]}
        />
      </div>
      <PromotionBanner />
    </AsideNavContainerStyles>
  );
}

const PromotionBanner = () => {
  const history = useHistory();
  return (
    <BannerPromotionStyle>
      <img alt="Piggy Bank" src={PiggyMoneySVG} />
      <p>Invite a friend and earn £10 in credit</p>

      <span>You receive £10 when they send over £200.</span>
      <span>They also get a £3 reward for using your referral code.</span>
      <div className="CTA">
        <Button
          onClick={() => history.push(paths.REFERRALS)}
          className="button"
          size="large"
          type="primary"
        >
          Start earning!
        </Button>
        <span onClick={() => history.push(paths.LEGAL + "/terms")}>
          Terms & Conditions apply
        </span>
      </div>
      <div className="svg">
        <img alt="svg-icons" src={PromotionSVG} />
      </div>
    </BannerPromotionStyle>
  );
};
