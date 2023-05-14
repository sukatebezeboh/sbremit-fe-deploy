import React from "react";
import style from "./Tanzania.css";
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

const Tanzania = () => {
  return (
    <Body>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Tanzania | SB Remit</title>
        <meta
          name="keywords"
          content="
          send money to tanzania,
          send money from uk,
          how to send money to tanzania,
          send to africa,
          send money online instantly,
          africa money transfer,
          "
        />
        <meta
          name="description"
          content="
          Looking for a reliable way to send money to Tanzania? Then, look no further than SB Remit. We offer alternative means of remittance for our customers.
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
          {">"} <span>Tanzania</span>
        </div>
        <div className="section-1">
          <div className="content">
            <h1>Send Money Online Instantly to Tanzania with SB Remit</h1>
            <p>
              With SB Remit, sending money to Tanzania has never been easier.
              Our remittance services offer an expert alternative solution to
              easily send money across the world in an instant.
            </p>

            <div className="btn">
              <Link to={paths.REGISTER_COUNTRY}>
                <a href="/">Get Started</a>
              </Link>
            </div>
          </div>
          <div className="img">
            <img
              src={asset("images", "send-money-bg-4.png")}
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
            <h3> Remittances in Tanzania</h3>
            <p>
              About 75 per cent of remittances are used to put food on the table
              and cover medical expenses, school fees or housing expenses. In
              times of crisis, migrant workers may send more money home to cover
              crop losses or family emergencies.
            </p>

            <p>
              Remittances remain critical to Tanzanian society because they help
              to increase the amount of disposable money for spending on
              education, health, consumption, business formation, and
              investments. They are absolutely critical to helping poverty
              reduction and development in Tanzania.
            </p>
          </div>
        </div>
        <div className="section-3">
          <div className="content">
            <h3>How We Can Help</h3>
            <p>
              At SB Remit, we have a rich knowledge of the industry and a wealth
              of experience in remittances, enabling us to offer a platform for
              individuals and businesses to seamlessly send money across the
              world.{" "}
            </p>

            <p>
              With an initial focus on Africa, our company transforms the way
              money is transferred and our vision is to build a money transfer
              platform that will enable businesses and individuals to pay for
              goods and services and transfer money all around the world.
            </p>

            <p>
              We have the knowledge, systems, management team and network to
              carry out transactions seamlessly and in record time to meet
              customers’ expectations.{" "}
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
            <h3>How to Send Money To Tanzania </h3>
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
            If you are looking to conveniently and securely send money to
            Tanzania, please don’t hesitate to get in touch with a member of our
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

export default Tanzania;
