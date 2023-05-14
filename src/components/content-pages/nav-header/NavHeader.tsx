import React, { useState } from "react";
import { asset } from "../../../util/util";
import SBRemitLogo from "../../modules/sbremit-logo/SBRemitLogo";
import { useLocation, Link, useHistory } from "react-router-dom";
import style from "./NavHeader.css";
import { constants } from "../../../util/constants";
import { paths } from "../../../util/paths";
import { BsChevronDown, BsChevronRight, BsChevronUp } from "react-icons/bs";

const Div = style;

const AboutDropdwonLinks = [
  {
    name: "Tutorials",
    link: paths.TUTORIALS,
    path_name: "/content/about/tutorials",
  },
  {
    name: "Cameroon",
    link: paths.CAMEROON,
    path_name: "/content/about/cameroon",
  },
  {
    name: "Kenya",
    link: paths.KENYA,
    path_name: "/content/about/kenya",
  },
  {
    name: "Uganda",
    link: paths.UGANDA,
    path_name: "/content/about/uganda",
  },
  {
    name: "Tanzania",
    link: paths.TANZANIA,
    path_name: "/content/about/tanzania",
  },
];

const NavHeader = (props: { page: string }) => {
  const { page } = props;
  const history = useHistory();

  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [isHovered, setIsHovered] = React.useState(false);

  const location = useLocation();

  //console.log(location.pathname);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      id="nav-container"
      className={page !== "home" ? "white-bg-shadow" : ""}
    >
      <Div>
        {/* <div className="logo"> <SBRemitLogo /> </div> */}
        <div className="logo">
          <img src={asset("", "main-logo.svg")} alt="SBremit logo" />
        </div>
        <div className="navs">
          <div
            onClick={() => history.push("/")}
            className={`nav mobile-hide ${page === "home" && "selected"}`}
          >
            <span>Home</span>
          </div>

          <div className={`nav mobile-hide ${page === "about" && "selected"}`}>
            <div className="about-link" onMouseEnter={handleMouseEnter}>
              <span onClick={() => history.push("/content/about")}>
                About Us
              </span>
              <div className="dropdown-icon">
                {isHovered ? <BsChevronUp /> : <BsChevronDown />}
              </div>
            </div>
            <div
              className={
                isHovered ? "about-dropdown-links" : "hide-about-dropdown-links"
              }
              onMouseLeave={handleMouseLeave}
            >
              {AboutDropdwonLinks.map((link, index) => (
                <div
                  className="dropdwon-link"
                  key={index}
                  onClick={() => history.push(link.link)}
                >
                  <p
                    className={`${
                      location.pathname === link.path_name && "active"
                    }`}
                  >
                    {link.name}
                  </p>
                  <div className="active-link-indicator"></div>
                </div>
              ))}
            </div>
          </div>

          <div
            onClick={() => history.push("/support")}
            className={`nav mobile-hide ${page === "support" && "selected"}`}
          >
            <span>Support</span>
          </div>
          {/* <div onClick={() => history.push('/content/blog')} className={`nav mobile-hide ${page === "blog" && "selected"}`}>
                    <span>
                        Blog
                    </span>
                </div> */}
          <div
            onClick={() => history.push("/content/contact")}
            className={`nav mobile-hide ${page === "contact" && "selected"}`}
          >
            <span>Contact</span>
          </div>
          {/* <div className={`nav mobile-hide ${page === "contact" && "selected"}`}>
                    <span>
                        Contact
                    </span>
                </div> */}
        </div>
        <div className="btns ">
          <Link to="/sign-up">
            <button className="sign-up mobile-hide">Sign up</button>
          </Link>
          <Link to="/sign-in">
            <a href="/" className="sign-in mobile-hide ">
              Sign in
            </a>
          </Link>
          <span className="menu desktop-hide">
            <img
              onClick={() => setMobileNavOpen(true)}
              src={asset("icons", "menu.svg")}
              alt=""
            />
          </span>
        </div>
        {mobileNavOpen && (
          <div className="mobile-nav">
            <div className="header">
              <div className="logo">
                <img src={asset("", "main-logo.svg")} alt="SBremit logo" />
              </div>
              <div
                className="close-nav"
                onClick={() => setMobileNavOpen(false)}
              >
                {" "}
                &times;{" "}
              </div>
            </div>

            <div className="links">
              <ul>
                <li
                  onClick={() => history.push(paths.LANDING)}
                  className={`${page === constants.HOME && "active"}`}
                >
                  Home
                </li>
                <li className={`${page === constants.ABOUT && "active"}`}>
                  <div className="mobile-about-link">
                    <div className="about-link">
                      <span onClick={() => history.push(paths.ABOUT)}>
                        About
                      </span>
                      <div
                        className="icon"
                        onClick={() => setIsHovered(!isHovered)}
                      >
                        {" "}
                        {isHovered ? <BsChevronUp /> : <BsChevronDown />}
                      </div>
                    </div>

                    <div
                      className={
                        isHovered
                          ? "about-dropdown-links"
                          : "hide-about-dropdown-links"
                      }
                      onMouseLeave={handleMouseLeave}
                    >
                      {AboutDropdwonLinks.map((link, index) => (
                        <div
                          className="dropdwon-link"
                          key={index}
                          onClick={() => history.push(link.link)}
                        >
                          <span
                            className={`${
                              location.pathname === link.path_name && "active"
                            }`}
                          >
                            {link.name}
                          </span>
                          {/* <BsChevronRight /> */}
                        </div>
                      ))}
                    </div>
                  </div>
                </li>
                <li
                  onClick={() => history.push(paths.SUPPORT)}
                  className={`${page === constants.SUPPORT && "active"}`}
                >
                  Support
                </li>
                {/* <li onClick={() => history.push(paths.BLOG)} className={`${page === constants.BLOG && "active"}`} >Blog</li> */}
                <li
                  onClick={() => history.push(paths.CONTACT)}
                  className={`${page === constants.CONTACT && "active"}`}
                >
                  Contact
                </li>
              </ul>
            </div>

            <div className="sign-up-in-mobile">
              <Link to={paths.SIGN_UP}>Sign up</Link>
              <Link to={paths.SIGN_IN}>Sign in</Link>
            </div>

            <div className="img">
              <img src={asset("images", "mobile-nav.png")} alt="mobile nav" />
            </div>
          </div>
        )}
      </Div>
    </div>
  );
};

export default NavHeader;
