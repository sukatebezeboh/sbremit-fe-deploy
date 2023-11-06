import { BellOutlined, DownOutlined, CloseOutlined } from "@ant-design/icons";
import { Avatar, Badge, Button } from "antd";
import {
  MobileMenuStyles,
  NavBarContainerStyle,
  NotificationIcon,
  UserInfo,
  UserInfoAndNotificationIcon,
} from "./NavbarStyles";
import { SBRLogo } from "../asidenav/AsideNavStyles";
import AsideNav from "../asidenav/AsideNav";
import { useState } from "react";
import { Heading } from "components/pages/transcations-flow/utils/stylesVariables";
import { useLocation } from "react-router-dom";
import {
  generateAlphabetColor,
  getCurrentPathName,
  getFirstLetter,
  unreadNotificationsCount,
} from "components/pages/transcations-flow/utils/reuseableUtils";
import { useSelector } from "react-redux";
import Notifications from "components/pages/transcations-flow/app-components/Notifications";

const SBlogo = `/assets/main-logo.svg`;

export default function Navbar() {
  const user = useSelector((state: any) => state.auth.user);
  const notifications = useSelector((state: any) => state.notifications);
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);

  return (
    <NavBarContainerStyle>
      <Notifications open={openNotification} setOpen={setOpenNotification} />
      <Heading>{getCurrentPathName(location.pathname).withoutDash}</Heading>
      {/* display SBlogo at breakpoint of 768px */}
      <SBRLogo src={SBlogo} alt="SB logo" />

      <UserInfoAndNotificationIcon>
        <NotificationIcon onClick={() => setOpenNotification(true)}>
          <Badge count={unreadNotificationsCount(notifications)}>
            <Avatar className="avatar" size={40}>
              <BellOutlined rev={undefined} />
            </Avatar>
          </Badge>
        </NotificationIcon>
        <UserInfo>
          <Avatar
            size={40}
            style={{
              background: generateAlphabetColor(
                String(getFirstLetter(user?.profile?.firstName))
              ),
            }}
          >
            {getFirstLetter(user?.profile?.firstName)}
            {getFirstLetter(user?.profile?.lastName)}
          </Avatar>
          <div className="info">
            <span>
              {user?.profile?.firstName} {user?.profile?.lastName}
            </span>
            <span>Membership ID: {user?.referral?.code}</span>
          </div>
          <div className="chvron">
            <Button
              type="text"
              icon={
                openMenu ? (
                  <CloseOutlined size={18} rev={undefined} />
                ) : (
                  <DownOutlined size={18} rev={undefined} />
                )
              }
              onClick={() => setOpenMenu((prev) => !prev)}
            />
          </div>
        </UserInfo>
      </UserInfoAndNotificationIcon>
      {openMenu && <MobileDeviceMenu />}
    </NavBarContainerStyle>
  );
}

const MobileDeviceMenu = () => {
  return (
    <MobileMenuStyles>
      <AsideNav />
    </MobileMenuStyles>
  );
};
