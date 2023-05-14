import React from "react";
import style from "./Cameroon.css";
import { asset } from "../../../../../util/util";
import { paths } from "util/paths";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import NavHeader from "components/content-pages/nav-header/NavHeader";

const Body = style;
const Why_choose_sb = [
  "We offer a zero transaction fee for all your transfers meaning more money gets to your recipient. ",
  "Our exchange rates are the best in the market.",
  "We offer multiple delivery options including mobile money, bank transfer and cash pickup.",
  "We take pride in being the most transparent money remittance company with no hidden costs.",
];

const Cameroon = () => {
  return (
    <Body>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Cameroon | SB Remit</title>
        <meta
          name="keywords"
          content="  
          send money to cameroon,
          safest way to send money,
          transfer money to cameroon,
          cheapest way to send money to cameroon,
          send money to cameroon online,
          send money securely,
          cameroon remit"
        />
        <meta
          name="description"
          content="
          Securely transfer money to Cameroon with our expert money remittance services, enabling businesses and individuals to transfer money all around the world.
              "
        />
      </Helmet>
      <NavHeader page="about" />

      <div className="tutorials">
        <div className="breadcrumbs">
          <br></br>
          <span>
            <Link to={paths.ABOUT}>About Us</Link>{" "}
          </span>
          {">"} <span>Cameroon</span>
        </div>
        <div className="section-1">
          <div className="content">
            <h1>An Easier Way to Seamlessly Send Money to Cameroon Online </h1>
            <p>
              If you are looking to securely and reliably transfer money to
              Cameroon, at SB Remit, we are committed to driving down costs for
              our customers by offering competitive exchange rates.
            </p>

            <div className="btn">
              <Link to={paths.REGISTER_COUNTRY}>
                <a href="/">Get Started</a>
              </Link>
            </div>
          </div>
          <div className="img">
            <img
              src={asset("images", "send-money-bg-1.png")}
              alt="tutorials-banner"
            />
          </div>
        </div>

        <div className="section-2">
          <div className="img">
            <img
              src={asset("images", "what_are_remitance_banner.png")}
              alt="what-are-remitance-banner"
            />
          </div>
          <div className="content">
            <h3>Remittances in Cameroon</h3>
            <p>
              Those working and living in Cameroon often rely on remittances
              from families abroad to support them.
            </p>

            <p>
              As Henry Eho and Gaston Fornimoh are Cameroonian migrants who have
              been living in the UK for the last 15 years, we are determined to
              create a service which we would use ourselves if we were a
              customer.
            </p>
          </div>
        </div>
        <div className="section-3">
          <div className="content">
            <h3>What Do We Do?</h3>
            <p>
              At SB Remit, we have extensive experience in a broad range of
              industries including financial services, retail, digital and
              consultancy. Through developing our rich experience in the
              industry, we discovered that none of the existing money transfer
              agencies serving the continent offered tailored products to meet
              the needs of specific countries. Customers were treated as having
              the same need across the African content.{" "}
            </p>
            <p>
              The excessive cost of sending remittances drains money from the
              world’s poorest, creating a huge worry for the millions of
              families already living in extreme poverty.
            </p>
            <p>
              This is why we are committed to building a platform for
              individuals and businesses to conveniently transfer money to
              Cameroon and the rest of the world.
            </p>
          </div>

          <div className="img">
            <img
              src={asset("images", "what_we_do_banner.png")}
              alt="what-we-do-banner"
            />
          </div>
        </div>
        <div className="section-4">
          <div className="content">
            <h3>Why Choose SB Remit</h3>

            <div className="why-choose-sb">
              {Why_choose_sb.map((list, index) => (
                <div className="list" key={index}>
                  <div className="dot"></div>
                  <p>
                   {list}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="section-5">
          <p>
            If you are still unsure about remittances or looking to learn more
            about sending money overseas, please don’t hesitate to get in touch
            with a member of our friendly team here today. We are always on hand
            to answer any questions or queries you may have.{" "}
          </p>
          <div className="btn">
            <Link to={paths.CONTACT}>
              <a href="/">Contact Us</a>
            </Link>
          </div>
        </div>
      </div>
    </Body>
  );
};

export default Cameroon;
