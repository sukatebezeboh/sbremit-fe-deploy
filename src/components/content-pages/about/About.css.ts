import styled from "styled-components";

export default styled.div.attrs((props) => ({
  className: "about-custom",
}))`
  margin-top: 100px; // 48px plus navbar height;
  background: #ffffff;
  .about-page {
    display: flex;
    flex-direction: column;
    align-items: center;

    .hero {
      width: 100%;
      height: 600px;
      position: relative;
      @media only screen and (max-width: 770px) {
        height: 350px;
      }
      @media only screen and (max-width: 450px) {
        height: 250px;
      }
      img {
        width: inherit;
        height: inherit;
        transform: scale(1, 1.3);
        transform-origin: center;
      }
      .hero-text-container {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      .hero-text {
        background: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 1140px;
        height: fit-content;
        padding: 1.5rem 0.5rem;
        //box-shadow: 0px 4px 20px 2px rgba(0, 0, 0, 0.25);

        @media only screen and (max-width: 770px) {
          padding: 1rem 0.5rem;
          width: 700px;
          //height: 800px;
        }
        @media only screen and (max-width: 450px) {
          max-width: 400px;
        }

        @media only screen and (max-width: 350px) {
          max-width: 300px;
        }

        h2 {
          font-weight: 700;
          font-size: 48px;
          line-height: 65px;
          color: #121212;
          text-align: center;

          @media only screen and (max-width: 770px) {
            font-size: 28px;
            line-height: 48px;
          }

          @media only screen and (max-width: 450px) {
            font-size: 14px;
            line-height: 24px;
          }
        }
      }
    }

    .info {
      margin-top: 120px;
      width: 1140px;
      display: flex;
      flex-direction: column;
      align-items: center;
      @media only screen and (max-width: 770px) {
        width: 700px;
        margin-top: 70px;
      }

      @media only screen and (max-width: 450px) {
        max-width: 400px;
      }

      @media only screen and (max-width: 350px) {
        max-width: 300px;
      }

      p {
        font-weight: 400;
        font-size: 32px;
        line-height: 44px;
        color: #000000;

        @media only screen and (max-width: 770px) {
          font-size: 24px;
          line-height: 38px;
        }

        @media only screen and (max-width: 450px) {
          font-size: 20px;
          line-height: 30px;
        }
      }

      .vision-mission {
        width: 750px;

        @media only screen and (max-width: 770px) {
          width: 600px;
        }
        @media only screen and (max-width: 450px) {
          max-width: 400px;
        }
        @media only screen and (max-width: 350px) {
          max-width: 300px;
        }
        .mission {
          .heading {
            h2 {
              margin-top: 72px;
              font-weight: 700;
              font-size: 32px;
              line-height: 35px;
              text-align: center;
              color: #000000;

              @media only screen and (max-width: 770px) {
                font-size: 26px;
                line-height: 24px;
                margin-top: 52px;
              }

              @media only screen and (max-width: 450px) {
                font-size: 20px;
                line-height: 30px;
              }
            }
            .bottom-border {
              width: 50px;
              height: 4px;
              background: #007b5d 0% 0% no-repeat padding-box;
              border-radius: 15px;
              margin: 0px auto;
            }
          }
        }

        p {
          margin-top: 26px;
          font-weight: 400;
          font-size: 20px;
          line-height: 34px;
          text-align: center;

          @media only screen and (max-width: 770px) {
            font-size: 18px;
            line-height: 28px;
          }

          @media only screen and (max-width: 450px) {
            font-size: 14px;
            line-height: 20px;
          }
        }
      }
    }
    .brand {
      margin-top: 72px;
      width: 100%;
      background: #f5f7f7;
      display: flex;
      align-items: center;
      justify-content: center;

      .brand-content {
        width: 1140px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 4rem 0;

        @media only screen and (max-width: 770px) {
          width: 700px;
        }

        @media only screen and (max-width: 450px) {
          flex-direction: column;
          max-width: 300px;
          gap: 2rem;
          padding: 3rem 0;
        }
        @media only screen and (max-width: 350px) {
          max-width: 250px;
        }
        .brand-title {
          display: flex;
          flex-direction: column;
          span {
            margin-top: 72px;
            font-weight: 700;
            font-size: 32px;
            line-height: 35px;
            text-align: center;
            color: #000000;

            @media only screen and (max-width: 770px) {
              font-size: 26px;
              line-height: 24px;
            }

            @media only screen and (max-width: 450px) {
              font-size: 20px;
              line-height: 30px;
              margin-top: 0;
            }
          }
          .bottom-border {
            width: 50px;
            height: 4px;
            background: #007b5d 0% 0% no-repeat padding-box;
            border-radius: 15px;
            margin: 10px auto;
          }
        }
        .brand-points {
          .point {
            img {
              width: 60px;
              height: 60px;
              margin-top: 20px;

              @media only screen and (max-width: 770px) {
                width: 45px;
                height: 45px;
                margin-top: 10px;
              }

              @media only screen and (max-width: 450px) {
                width: 35px;
                height: 35px;
                margin-top: 8px;
              }
            }
          }
        }
        .brand-points {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-gap: 80px;
          width: 750px;
          @media only screen and (max-width: 770px) {
            display: flex;
            flex-direction: column;
            gap: 40px;
            width: 350px;
          }
          @media only screen and (max-width: 450px) {
            max-width: 400px;
          }
          .point {
            display: flex;
            gap: 3rem;
            align-items: center;
            .desc {
              .topic {
                font: normal normal bold 20px/50px Montserrat;

                @media only screen and (max-width: 450px) {
                  font-size: 16px;
                  line-height: 28px;
                }
              }
              .detail {
                font: normal normal normal 16px/30px Montserrat;
                color: #424242;

                @media only screen and (max-width: 450px) {
                  font-size: 14px;
                  line-height: 20px;
                }
              }
            }
          }
        }
      }
    }
    .journey {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 52px;
      margin-bottom: 150px;

      @media only screen and (max-width: 450px) {
        margin-bottom: 100px;
        margin-top: 32px;
      }
      .journey-content {
        width: 1140px;
        display: flex;
        align-items: center;
        gap: 1rem;
        @media only screen and (max-width: 770px) {
          width: 700px;
        }

        @media only screen and (max-width: 450px) {
          max-width: 400px;
        }
        @media only screen and (max-width: 350px) {
          max-width: 300px;
        }
        .info {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          text-align: left;
          width: 100%;
          .bg-img {
            width: 100%;
            height: 100%;

            img {
              width: inherit;
              height: inherit;
            }
          }
          .heading {
            span {
              margin-top: 72px;
              font-weight: 700;
              font-size: 32px;
              line-height: 35px;
              text-align: center;
              color: #000000;

              @media only screen and (max-width: 770px) {
                font-size: 26px;
                line-height: 24px;
              }

              @media only screen and (max-width: 450px) {
                font-size: 20px;
                line-height: 30px;
              }
            }
            .bottom-border {
              width: 50px;
              height: 4px;
              background: #007b5d 0% 0% no-repeat padding-box;
              border-radius: 15px;
              margin: 10px auto;
            }
          }
          .detail {
            p {
              margin-top: 26px;
              font-weight: 400;
              font-size: 20px;
              line-height: 34px;
              text-align: left;

              @media only screen and (max-width: 770px) {
                font-size: 18px;
                line-height: 28px;
              }

              @media only screen and (max-width: 450px) {
                font-size: 14px;
                line-height: 20px;
              }
            }
          }
        }
      }
    }
  }
`;
