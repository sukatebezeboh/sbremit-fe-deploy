import React from "react";
import styled from "styled-components";
import { asset } from "../../../util/util";
import NavHeader from "../nav-header/NavHeader";
import { Helmet } from "react-helmet";
import style from "./About.css";
import { Link } from "react-router-dom";
import { paths } from "../../../util/paths";

// const Body = styled.div`
//     .hero {
//         background: url('/assets/bg/about-bg.jpg');
//         background-repeat: no-repeat;
//         background-size: cover;
//         height: 917px;
//         .hero-text {
//             max-width: 954px;
//             margin: 350px auto;
//             h2 {
//                 text-align: center;
//                 font: normal normal bold 32px/40px Montserrat;
//                 color: #FFFFFF;
//             }
//             p {
//                 text-align: center;
//                 font: normal normal normal 20px/32px Montserrat;
//                 color: #FFFFFF;
//             }
//         }
//     }

//     .mission-vision {
//         padding: 100px 0px 5px;
//         text-align: center;
//         background: #FFFFFF;
//         .mv {
//             margin: auto;
//             margin-bottom: 100px;
//             max-width: 80%;
//             .heading {
//                 text-align: center;
//                 font: normal normal 600 30px/32px Montserrat;
//                 color: #424242;
//                 margin-bottom: 40px;

//                 &::after {
//                     content: "";
//                     display: block;
//                     width: 50px;
//                     height: 4px;
//                     background: #007B5D 0% 0% no-repeat padding-box;
//                     border-radius: 15px;
//                     margin: 10px auto;
//                 }
//             }
//             .body {
//                 text-align: center;
//                 font: normal normal normal 16px/30px Montserrat;
//                 color: #424242;
//             }
//         }
//     }

//     .brand-values-section {
//         display: grid;
//         grid-template-columns: 1fr 2fr;
//         padding: 100px 5%;
//         background: #F5F7F7;
//         .title {
//             text-align: left;
//             font: normal normal 600 40px/32px Montserrat;
//             color: #424242;
//             margin-top: 140px;
//             &::after {
//                 content: "";
//                 display: block;
//                 width: 50px;
//                 height: 4px;
//                 background: #007B5D 0% 0% no-repeat padding-box;
//                 border-radius: 15px;
//                 margin: 15px 0;
//             }
//         }

//         .points {
//             display: grid;
//             grid-template-columns: 1fr 1fr;
//             grid-gap: 100px;
//             .point {
//                 display: grid;
//                 grid-template-columns: 0fr 1fr;
//                 grid-gap: 50px;
//                 img {
//                     width: 60px;
//                     height: 60px;
//                     margin-top: 20px;
//                 }
//                 .desc {
//                     .topic {
//                         font: normal normal bold 20px/50px Montserrat;
//                         color: #424242;
//                     }
//                     .detail {
//                         font: normal normal normal 16px/30px Montserrat;
//                         color: #424242;
//                     }
//                 }
//             }
//         }
//     }

//     .journey-section {
//         display: grid;
//         grid-template-columns: 1fr 1fr;
//         padding: 100px 0px 100px 5%;
//         background: #FFFFFF;
//         .details {
//             .title {
//                 font: normal normal 600 30px/32px Montserrat;
//                 color: #424242;
//                 margin-bottom: 50px;
//                 margin-top: 50px;
//                 &::after {
//                     content: "";
//                     display: block;
//                     width: 50px;
//                     height: 4px;
//                     background: #007B5D 0% 0% no-repeat padding-box;
//                     border-radius: 15px;
//                     margin: 15px 0;
//                 }
//             }

//             .body {
//                 p {
//                     font: normal normal normal 16px/26px Montserrat;
//                     color: #424242;
//                     margin-bottom: 30px;
//                 }
//             }
//         }
//         .img {
//             text-align: right;
//             img {
//                 width: 75%;
//             }
//         }
//     }

//     @media only screen and (max-width: 900px) {
//         .hero {
//             height: 664px;
//             .hero-text {
//                 width: 90%;
//                 margin: 170px auto;
//                 h2 {
//                     font: normal normal bold 20px/32px Montserrat;
//                 }
//                 p {
//                     margin-top: 20px;
//                     font: normal normal normal 13px/20px Montserrat;
//                 }
//             }
//         }
//         .mission-vision {
//             padding: 50px 0px 5px;
//             .mv {
//                 margin: auto;
//                 margin-bottom: 50px;
//                 max-width: 80%;
//                 .heading {
//                     font: normal normal bold 18px/25px Montserrat;
//                     color: #424242;
//                     margin-bottom: 20px;
//                     &::after {
//                         content: "";
//                         display: block;
//                         width: 25px;
//                         height: 3px;
//                         background: #007B5D 0% 0% no-repeat padding-box;
//                         border-radius: 15px;
//                         margin: 10px auto;
//                     }
//                 }
//                 .body {
//                     text-align: center;
//                     font: normal normal normal 16px/30px Montserrat;
//                     color: #424242;
//                 }
//             }
//         }
//         .brand-values-section {
//             display: grid;
//             grid-template-columns: 1fr;
//             margin-top: 0px;
//             padding-top: 0px;
//             .title {
//                 text-align: center;
//                 font: normal normal bold 20px/25px Montserrat;
//                 margin-bottom: 50px;
//                 &::after {
//                     margin: 15px auto;
//                     width: 26px;
//                     height: 3px;
//                 }
//             }

//             .points {
//                 display: grid;
//                 grid-template-columns: 1fr;
//                 grid-gap: 50px;
//                 .point {
//                     display: grid;
//                     grid-template-columns: 1fr;
//                     grid-gap: 0px;
//                     text-align: center;
//                     img {
//                         width: 40px;
//                         height: 40px;
//                         margin: auto;
//                         margin-top: 0px;
//                     }
//                     .desc {
//                         .topic {
//                             font: normal normal bold 15px/65px Montserrat;
//                             color: #424242;
//                         }
//                         .detail {
//                             font: normal normal normal 16px/30px Montserrat;
//                             color: #424242;
//                         }
//                     }
//                 }
//             }
//         }
//         .journey-section {
//             display: grid;
//             grid-template-areas: "b" "a";
//             grid-template-columns: 1fr;
//             padding: 100px 0px 100px 5%;
//             background: #FFFFFF;
//             .details {
//                 grid-area: a;
//                 .title {
//                     font: normal normal bold 18px/25px Montserrat;
//                     color: #424242;
//                     margin-bottom: 30px;
//                     margin-top: 50px;
//                     &::after {
//                         content: "";
//                         display: block;
//                         width: 50px;
//                         height: 4px;
//                         background: #007B5D 0% 0% no-repeat padding-box;
//                         border-radius: 15px;
//                         margin: 15px 0;
//                     }
//                 }

//                 .body {
//                     p {
//                         font: normal normal normal 16px/26px Montserrat;
//                         color: #424242;
//                         margin-bottom: 30px;
//                     }
//                 }
//             }
//             .img {
//                 grid-area: b;
//                 text-align: right;
//                 img {
//                     width: 100%;
//                 }
//             }
//         }

//     }
// `

const Body = style;

const Points = [
  {
    icon: "rating.svg",
    alt: "experts",
    topic: "Expertise",
    detail:
      "We have the knowledge, systems, management team and network to carry out transactions seamlessly",
  },
  {
    icon: "easy-to-use.svg",
    alt: "easy",
    topic: "Convenience",
    detail: "We provide alternative means of remittance for our customers",
  },
  {
    icon: "rocket.svg",
    alt: "fast",
    topic: "Speed",
    detail:
      "We complete transactions in record time to meet with customers’ expectations",
  },
  {
    icon: "security.svg",
    alt: "secure",
    topic: "Reliability",
    detail: "We ensure that our transactions are safe and secured",
  },
];

const Links = () => {
  const Links = styled.div`
    display: flex;
    gap: 10px;

    .link {
      border: 1px solid #c4c4c4;
      border-radius: 200px;
      width: 48px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `;
  return (
    <Links>
      <div className="link">
        <img src={asset("icons", "copy_link.svg")} alt="copy-link" />
      </div>
      <div className="link">
        <img src={asset("icons", "facebook-blue.svg")} alt="facebook-icon" />
      </div>
      <div className="link">
        <img src={asset("icons", "twitter-blue.svg")} alt="twitter-icon" />
      </div>
      <div className="link">
        <img src={asset("icons", "linkdin-blue.svg")} alt="linkdin-icon" />
      </div>
    </Links>
  );
};

const About = () => {
  return (
    <Body>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Aboutpage | SB Remit</title>
        <meta
          name="keywords"
          content="money transfer,
            money transfer from uk"
        />
        <meta
          name="description"
          content="
                SB Remit provides a quick, easy, and secure way for businesses and individuals to transfer money, 
                primarily to and from Africa. Learn more about us today.
                "
        />
      </Helmet>
      <NavHeader page="about" />

      <div className="about-page">
        <div className="hero">
          <img src={asset("bg", "about-bg.jpg")} alt="About SBremit" />
          <div className="hero-text-container">
            <div className="hero-text">
              <h2>
                SB Remit is a money remittance company trading under Sukate &
                Bezeboh Ltd.
              </h2>
            </div>
          </div>
        </div>

        <div className="info">
          <p>
            We provide a platform for individuals and businesses to conveniently
            transfer money with an initial focus on Africa. Our company
            transforms the way money transfer and bill payment is done by
            blending it with the culture of each country we serve.
          </p>

          <div className="vision-mission">
            <div className="mission">
              <div className="heading">
                <h2>Our Mission</h2>
                <div className="bottom-border"></div>
              </div>
              <p>
                Our mission is to build a platform that will serve as a primary
                provider of money remittance and payment services.
              </p>
            </div>

            <div className="mission">
              <div className="heading">
                <h2>Our Vision</h2>
                <div className="bottom-border"></div>
              </div>
              <p>
                We provide a platform for individuals and businesses to
                conveniently transfer money. With an initial focus on Africa,
                our company transforms the way money is transferred and our
                vision is to build a money transfer platform that will enable
                businesses and individuals to pay for goods and service and
                transfer money all around the world.
              </p>
            </div>
          </div>
        </div>
        <div className="brand">
          <div className="brand-content">
            <div className="brand-title">
              <span> Brand Values</span>
              <div className="bottom-border"></div>
            </div>
            <div className="brand-points">
              {Points.map((point, index) => (
                <div className="point" key={index}>
                  <img src={asset("icons", point.icon)} alt={point.alt} />
                  <div className="desc">
                    <div className="topic">{point.topic}</div>
                    <div className="detail">{point.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="journey">
          <div className="journey-content">
            <div className="info">
              <div className="heading">
                <span>Our Journey</span>
                <div className="bottom-border"></div>
              </div>
              <div className="bg-img">
              <img
                 src={asset("icons", "money-decision.svg")}
                 alt="money-decision"
              />
            </div>
              <div className="detail">
                <p>
                  Henry Eho and Gaston Fornimoh are Cameroonian migrants living
                  in the UK for the last 15 years. They have worked in several
                  industries including financial services, retail, digital and
                  consultancy. Throughout this time, they have sent money home
                  for several purposes including supporting friends and family,
                  paying hospital bills, and investing in real estate amongst
                  others.
                </p>
                <p>
                  They quickly realised that none of the money transfer agencies
                  serving the continent offered tailored products to meet the
                  needs of specific countries. Customers are treated as having
                  the same need across the African continent.
                </p>

                <p>
                  Above all, the customer was not getting the best value for
                  their money due to poor exchange rates, high transfer charges
                  and lack of fee transparency. Remittance into Africa remains
                  the most expensive in the world currently standing at 8.9%
                  cost of remitting $200 according to a report from the World
                  Bank. Henry and Gaston are committed to driving down cost for
                  the customers by offering them competitive exchange rates.
                  They are determined to operate a business that they will use
                  if they were a customer.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="hero">
                <br/>
                <div className="hero-text">
                    <h2>SB Remit is a money remittance company trading under Sukate & Bezeboh Ltd.</h2>
                    <p>We provide a platform for individuals and businesses to conveniently transfer money with an initial focus on Africa. Our company transforms the way money transfer and bill payment is done by blending it with the culture of each country we serve.</p>
                </div>
            </div>

            <div className="mission-vision">
            <div className="mv mission">
                    <div className="heading">Who We Are</div>
                    <div className="body">
                        We are a payment and credit facilitator trading under Sukate &amp; Bezeboh Ltd.
                    </div>
                </div>

                <div className="mv mission">
                    <div className="heading">Our Mission</div>
                    <div className="body">
                        To build a digital finance ecosystem that will handle end to end payments and use machine learning &amp; AI to advance financial inclusiveness in Africa.
                    </div>
                </div>

                <div className="mv vision">
                    <div className="heading">Our Vision</div>
                    <div className="body">
                        Provide a platform for communities to alleviate poverty in their home countries by granting micro credit to operators of the informal sector.
                    </div>
                </div>
            </div>


            <div className="brand-values-section">
                <div className="title">
                    Brand Values
                </div>

                <div className="points">
                    <div className="point">
                        <img src={asset('icons', 'rating.svg')} alt="experts" />
                        <div className="desc">
                            <div className="topic">Expertise</div>
                            <div className="detail">We have the knowledge, systems, management team and network to carry out transactions seamlessly</div>
                        </div>
                    </div>

                    <div className="point">
                        <img src={asset('icons', 'easy-to-use.svg')} alt="easy" />
                        <div className="desc">
                            <div className="topic">Convenience</div>
                            <div className="detail">We provide alternative means of remittance for our customers</div>
                        </div>
                    </div>

                    <div className="point">
                        <img src={asset('icons', 'rocket.svg')} alt="fast" />
                        <div className="desc">
                            <div className="topic">Speed</div>
                            <div className="detail">We complete transactions in record time to meet with customers’ expectations</div>
                        </div>
                    </div>

                    <div className="point">
                        <img src={asset('icons', 'security.svg')} alt="secure" />
                        <div className="desc">
                            <div className="topic">Reliability</div>
                            <div className="detail">We ensure that our transactions are safe and secured</div>
                        </div>
                    </div>

                </div>
            </div>


            <div className="journey-section">
                <div className="details">
                    <div className="title">
                        Our Journey
                    </div>

                    <div className="body">
                            <p>Henry Eho and Gaston Fornimoh are Cameroonian migrants living in the UK for the last 15 years. They have worked in several industries including financial services, retail, digital and consultancy. Throughout this time, they have sent money home for several purposes including supporting friends and family, paying hospital bills, and investing in real estate amongst others.</p>
                            <p>They quickly realised that none of the money transfer agencies serving the continent offered tailored products to meet the needs of specific countries. Customers are treated as having the same need across the African continent.</p>
                            <p>Above all, the customer was not getting the best value for their money due to poor exchange rates, high transfer charges and lack of fee transparency. Remittance into Africa remains the most expensive in the world currently standing at 8.9% cost of remitting $200 according to a report from the World Bank. Henry and Gaston are committed to driving down cost for the customers by offering them competitive exchange rates. They are determined to operate a business that they will use if they were a customer.</p>
                    </div>
                </div>
                <div className="img">
                    <img src={asset('images', 'money-decision.png')} alt="money-decision" />
                </div>
            </div> */}
    </Body>
  );
};

export default About;
