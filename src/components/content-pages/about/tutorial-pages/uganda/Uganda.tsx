import React from "react";
import style from "./Uganda.css";
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

const Uganda = () => {
  return (
    <Body>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Uganda | SB Remit</title>
        <meta
          name="keywords"
          content="  
          send money to uganda,
          international money transfer,
          money transfer to uganda,
          sending money to uganda from uk,
          sending money to uganda on mobile,
          money transfer service,
          money transfer service to uganda
          "
        />
        <meta
          name="description"
          content="
          If you are looking for an affordable and convenient way to transfer money to family or businesses in Uganda, then use our money remittance services today.
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
          {">"} <span>Uganda</span>
        </div>
        <div className="section-1">
          <div className="content">
            <h1>Reliable and Efficient Money Transfer Service to Uganda </h1>
            <p>
              Sending money to Uganda is costly. To help you send money to
              people and businesses in Uganda right away, we offer affordable,
              dependable and efficient remittance solutions.
            </p>

            <div className="btn">
              <Link to={paths.REGISTER_COUNTRY}>
                <a href="/">Get Started</a>
              </Link>
            </div>
          </div>
          <div className="img">
            <img
              src={asset("images", "send-money-bg-3.png")}
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
            <h3>Remittances in Uganda</h3>
            <p>
              With almost 1.5 million refugees living in Uganda, remittance
              remains one of the most stable sources of money for families and
              businesses across the country. While Uganda’s remittance market is
              thriving, costs are high.
            </p>

            <p>
              This is why we offer expert remittance services to provide a
              cheaper alternative to sending money to Uganda.
            </p>
          </div>
        </div>
        <div className="section-3">
          <div className="content">
            <h3>How We Can Help</h3>
            <p>
              At SB Remit, we offer a platform for individuals and businesses to
              conveniently transfer money.{" "}
            </p>
            <p>
              Our company transforms the way money is transferred and our vision
              is to build a money transfer platform that will enable businesses
              and individuals to pay for goods and services and transfer money
              all around the world.
            </p>
            <p>
              We have a team of knowledgeable experts with the best systems in
              place to guarantee a seamless transaction every time.
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
                  <p>{list}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="section-5">
          <p>
            If you are looking to conveniently and securely send money to
            Uganda, please don’t hesitate to get in touch with a member of our
            friendly team here today. We are always on hand to answer any
            questions or queries you may have.{" "}
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

export default Uganda;
