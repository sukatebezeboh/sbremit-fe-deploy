import {
  Breakpoint,
  Colors,
} from "components/pages/transcations-flow/utils/stylesVariables";
import styled from "styled-components";

const AppleStoreIconWhite = "/assets/icons/applestore_icon.svg";
const GooglePlayIconWhite = "/assets/icons/palystore_icon.svg";
const AppleStoreIconDark = "/assets/icons/applestore_icon_white.svg";
const GooglePlayIconDark = "/assets/icons/palystore_icon_white.svg";

export const AppLinks = ({ isDark }: { isDark?: boolean }) => {
  const AppleStoreIcon = isDark ? AppleStoreIconWhite : AppleStoreIconDark;
  const GooglePlayIcon = isDark ? GooglePlayIconWhite : GooglePlayIconDark;

  const textColor = isDark ? "#FFF" : "#1E1E1E";
  const bgColor = isDark ? "#1E1E1E" : "#FFF";

  const links = [
    {
      icon: GooglePlayIcon,
      label: "Google Play",
      link: "https://play.google.com/store/apps/details?id=com.sbremit&gl=GB&authuser=1",
    },
    {
      icon: AppleStoreIcon,
      label: "App Store",
      link: "https://apps.apple.com/gb/app/sb-remit-money-transfer/id6443882446",
    },
  ];

  return (
    <AppLinksStyles $bgColor={bgColor} $textColor={textColor}>
      {links.map((link, index) => (
        <a
          key={"app_link_" + index}
          target="_blank"
          rel="noreferrer"
          href={link.link}
        >
          <img src={link.icon} />
          <div className="_label">
            <span>Get App on</span>
            <span>{link.label}</span>
          </div>
        </a>
      ))}
    </AppLinksStyles>
  );
};

const AppLinksStyles = styled.div<{ $textColor: string; $bgColor: string }>`
  display: flex;
  gap: 20px;

  @media (max-width: ${Breakpoint.xl}) {
    gap: 14px;
  }

  @media (max-width: ${Breakpoint.md}) {
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  @media (max-width: ${Breakpoint.sm}) {
    gap: 10px;
  }

  a {
    width: 200px;
    height: 75px;
    display: flex;
    padding: 16px 24px;
    align-items: center;
    gap: 10px;
    border-radius: 8px;
    background: ${(props) => props.$bgColor};
    border: none;
    outline: none;

    @media (max-width: ${Breakpoint.xl}) {
      /* gap: 8px; */
      width: 180px;
      height: 64px;

      padding: 16px 20px;
    }

    @media (max-width: ${Breakpoint.sm}) {
      padding: 14px;
      width: 100%;
      gap: 6px;
    }

    @media (max-width: ${Breakpoint.xs}) {
      padding: 12px;
    }

    &:hover {
      opacity: 0.85;
      cursor: pointer;
    }

    &:active {
      scale: 0.95;
    }

    img {
      width: 32px;
      height: 37.493px;

      @media (max-width: ${Breakpoint.xl}) {
        width: 28px;
        height: 33px;
      }
    }
    ._label {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 2px;

      span {
        font-size: 16px;
        font-weight: 300;
        color: ${(props) => props.$textColor};
        opacity: 0.7;

        @media (max-width: ${Breakpoint.xl}) {
          font-size: 14px;
        }

        @media (max-width: ${Breakpoint.sm}) {
          font-size: 12px;
        }
      }

      span:last-child {
        font-size: 20px;
        font-weight: 400;
        color: ${(props) => props.$textColor};
        opacity: 1;

        @media (max-width: ${Breakpoint.xl}) {
          font-size: 18px;
        }

        @media (max-width: ${Breakpoint.xl}) {
          font-size: 16px;
        }
      }
    }
  }
`;
