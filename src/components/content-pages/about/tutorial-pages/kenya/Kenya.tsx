import React from "react";
import style from "./Kenya.css";
import { asset } from "../../../../../util/util";
import { paths } from "util/paths";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import NavHeader from "components/content-pages/nav-header/NavHeader";

const Body = style;

const Transfer_steps = [
  {
    SN: "STEP 1:",
    step: "Signup or sign in",
  },
  {
    SN: "STEP 2:",
    step: "Add a recipient",
  },
  {
    SN: "STEP 3:",
    step: "Review Transaction",
  },
  {
    SN: "STEP 4:",
    step: "Transfer successful",
  },
];

const Kenya = () => {
  return (
    <Body>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Kenya | SB Remit</title>
        <meta
          name="keywords"
          content="
          safest way to transfer money,
          send money to kenya,
          transfer money to kenya,
          cheapest way to send money to kenya,
          quick money transfer,
          bank to bank transfer kenya,
          sending money to kenya from uk"
        />
        <meta
          name="description"
          content="
          Use our expert remittance services to conveniently transfer money to Kenya. We have the knowledge, team and systems to carry out transactions seamlessly.
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
          {">"} <span>Kenya</span>
        </div>
        <div className="section-1">
          <div className="content">
            <h1>Securely and Conveniently Transfer Money to Kenya Online</h1>
            <p>
              Remittances are crucial in providing fast, critical support, from
              funding your family with food and clean water to sustaining them
              during international conflict.
            </p>
            <p>
              This is why at SB Remit, we are committed to providing the
              cheapest and fastest remittance services so that you can easily
              and conveniently send money to Kenya and the rest of the world.
            </p>

            <div className="btn">
              <Link to={paths.REGISTER_COUNTRY}>
                <a href="/">Get Started</a>
              </Link>
            </div>
          </div>
          <div className="img">
            <img
              src={asset("images", "send-money-bg-2.png")}
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
            <h3> Remittances in Kenya</h3>
            <p>
              Remittances are one of the most stable sources of foreign money
              for Kenya. These funds have helped to support families all over
              the country and contribute to the country’s growth and
              development.
            </p>

            <p>
              This is why we are dedicated to providing a more affordable and
              convenient solution for people in the UK to quickly and easily
              send money to those in Kenya.
            </p>
          </div>
        </div>
        <div className="section-3">
          <div className="content">
            <h3>What Do We Do?</h3>
            <p>
              At SB Remit, we provide a platform for individuals and businesses
              to conveniently transfer money to Kenya and the rest of the world.
              Our initial focus is on Africa because the charges to send money
              to Africa are currently too high. .{" "}
            </p>

            <p>
              Our remittance services offer a solution to the problem, with
              unparalleled transaction time, competitive rates and a wealth of
              expertise to ensure every transaction works seamlessly.
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
            <h3>How it Works</h3>
            <p>Make a transfer in a few simple steps once you sign up</p>

            <div className="steps">
              {Transfer_steps.map((step, index) => (
                <div className="step">
                  <p>{step.SN}</p>
                  <p>{step.step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="section-5">
          <p>
            If you are looking to conveniently and securely transfer money to
            Kenya, please don’t hesitate to get in touch with a member of our
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

export default Kenya;
