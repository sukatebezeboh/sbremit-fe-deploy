import NavHeader from "components/content-pages/nav-header/NavHeader";
import React from "react";
import style from "./Tutorial.css";
import { asset } from "../../../../../util/util";
import { paths } from "util/paths";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

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

const Tutorial = () => {
  return (
    <Body>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Tutorials | SB Remit</title>
        <meta
          name="keywords"
          content="
          send money overseas,
          transfer money overseas,
          best way to send money abroad,
          how to send money abroad,
          how to send money overseas,
          how to transfer money abroad"
        />
        <meta
          name="description"
          content="
          If you are looking to learn more about transferring money overseas, at SB Remit, we offer tutorials to advise you on the best way to send money abroad. 
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
          {">"} <span>Tutorials</span>
        </div>
        <div className="section-1">
          <div className="content">
            <h1>How to Transfer Money Abroad in an Instant</h1>
            <p>
              Struggling to get your head around Remittances? At SB Remit, we
              can help you to understand remittances and how to conveniently
              send money overseas.
            </p>

            <div className="btn">
              <Link to={paths.REGISTER_COUNTRY}>
                <a href="/">Get Started</a>
              </Link>
            </div>
          </div>
          <div className="img">
            <img
              src={asset("images", "tutorials_banner.png")}
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
            <h3>What are Remittances?</h3>
            <p>
              A remittance is a sum of money transferred from one party to
              another - typically abroad. They are often used by migrants
              sending home part of their earnings in the form of either cash or
              goods to support their families back home.
            </p>

            <p>
              We recognize that remittance rates in Africa are too high, which
              is why we offer an affordable alternative solution to sending
              money overseas to Africa.
            </p>
          </div>
        </div>
        <div className="section-3">
          <div className="content">
            <h3>What Do We Do?</h3>
            <p>
              At SB Remit, we provide a platform for individuals and businesses
              to conveniently transfer money to Africa.{" "}
            </p>
            <p>
              We know how important it is to send money home to support your
              family and ensure that they have the funds to pay for food, clean
              water, education, healthcare and bills, which is why we offer an
              alternative means of remittance for our customers.
            </p>
            <p>
              With a team of experts who are committed to delivering the best
              possible service for our customers, we can offer tutorials and
              advice to provide you with the information you need to securely
              and conveniently send money overseas.
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

export default Tutorial;
