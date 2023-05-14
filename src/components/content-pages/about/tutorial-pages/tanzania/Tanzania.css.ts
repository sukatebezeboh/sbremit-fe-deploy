import styled from "styled-components";

export default styled.div.attrs((props) => ({
  className: "about-custom",
}))`
  padding: 100px 0;
  background: #ffffff;
  height: fit-content;

  .tutorials {
    .breadcrumbs {
      background: #f3f7f5;
      padding: 0% 20%;
      @media only screen and (max-width: 1440px) {
        padding: 0 10%;
      }

      span {
        font-weight: 400;
        font-size: 20px;
        line-height: 34px;
        text-decoration: underline;
        cursor: pointer;

        @media only screen and (max-width: 430px) {
          font-size: 18px;
          line-height: 34px;
        }
      }
      span:last-child {
        color: #007b5d;
        text-decoration: none;
      }
    }
    .section-1 {
      padding: 70px 20%;
      background: #f3f7f5;
      width: 100%;
      height: auto;
      display: flex;
      justify-content: space-between;
      position: relative;
      align-items: center;

      @media only screen and (max-width: 1440px) {
        padding: 70px 10%;
      }

      @media only screen and (max-width: 770px) {
        flex-direction: column-reverse;
        gap: 3rem;
      }

      .content {
        width: 661px;
        //margin-top: 71px;
        @media only screen and (max-width: 1024px) {
          width: 450px;
        }
        @media only screen and (max-width: 770px) {
          width: 100%;
        }

        h1 {
          font-weight: 500;
          font-size: 50px;
          line-height: 65px;
          color: #000000;

          @media only screen and (max-width: 430px) {
            font-size: 38px;
            line-height: 55px;
          }
        }
        p {
          font-weight: 400;
          font-size: 24px;
          line-height: 45px;
          color: #424242;

          @media only screen and (max-width: 430px) {
            font-size: 20px;
            line-height: 36px;
          }
        }
        .btn {
          background: #3e947f;
          margin-top: 52px;
          border-radius: 50px;
          width: 250px;
          height: 75px;
          font-weight: 600;
          font-size: 24px;
          line-height: 28px;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;

          @media only screen and (max-width: 430px) {
            font-size: 20px;
            line-height: 36px;
            width: 200px;
            height: 65px;
          }

          &:hover {
            background: #007b5d;
          }
        }
      }
      .img {
        width: 610px;
        height: 403px;
        border-radius: 30px;
        display: flex;
        align-items: center;
        right: 0;

        @media only screen and (max-width: 1024px) {
          width: 510px;
          height: 303px;
        }
        @media only screen and (max-width: 770px) {
          width: 100%;
          height: 403px;
        }

        @media only screen and (max-width: 430px) {
          height: auto;
        }
        img {
          width: inherit;
          height: inherit;
          border-radius: 30px;
        }
      }
    }
    .section-2 {
      margin-top: 200px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20%;

      @media only screen and (max-width: 1440px) {
        padding: 0 10%;
      }
      @media only screen and (max-width: 770px) {
        flex-direction: column;
        gap: 3rem;
      }
      @media only screen and (max-width: 430px) {
        margin-top: 120px;
      }

      .content {
        width: 599px;
        @media only screen and (max-width: 1024px) {
          width: 499px;
        }
        @media only screen and (max-width: 770px) {
          width: 100%;
        }

        h3 {
          font-weight: 600;
          font-size: 28px;
          line-height: 28px;
          color: #000000;

          @media only screen and (max-width: 430px) {
            font-size: 24px;
            line-height: 36px;
          }
        }
        p {
          font-weight: 400;
          font-size: 20px;
          line-height: 35px;
          color: #000000;

          @media only screen and (max-width: 430px) {
            font-size: 16px;
            line-height: 28px;
          }
        }
      }

      .img {
        width: 627px;
        height: 592px;

        @media only screen and (max-width: 1024px) {
          width: 427px;
          height: 392px;
        }

        @media only screen and (max-width: 430px) {
          width: 100%;
          height: auto;
        }

        img {
          width: inherit;
          height: inherit;
        }
      }
    }

    .section-3 {
      margin-top: 200px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20%;

      @media only screen and (max-width: 1440px) {
        padding: 0 10%;
      }
      @media only screen and (max-width: 770px) {
        flex-direction: column-reverse;
        gap: 3rem;
      }
      @media only screen and (max-width: 430px) {
        margin-top: 120px;
      }

      .content {
        width: 599px;
        @media only screen and (max-width: 1024px) {
          width: 499px;
        }

        @media only screen and (max-width: 770px) {
          width: 100%;
        }

        h3 {
          font-weight: 600;
          font-size: 28px;
          line-height: 28px;
          color: #000000;

          @media only screen and (max-width: 430px) {
            font-size: 24px;
            line-height: 36px;
          }
        }
        p {
          font-weight: 400;
          font-size: 20px;
          line-height: 35px;
          color: #000000;

          @media only screen and (max-width: 430px) {
            font-size: 16px;
            line-height: 28px;
          }
        }
      }
      .img {
        width: 700px;
        height: 661px;
        @media only screen and (max-width: 1024px) {
          width: 427px;
          height: 392px;
        }
        @media only screen and (max-width: 430px) {
          width: 100%;
          height: auto;
        }
        img {
          width: inherit;
          height: inherit;
        }
      }
    }
    .section-4 {
      margin-top: 200px;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      flex-direction: column;
      padding: 0 20%;
      color: #000000;

      @media only screen and (max-width: 1440px) {
        padding: 0 10%;
      }
      @media only screen and (max-width: 770px) {
        margin-top: 100px;
      }
      @media only screen and (max-width: 430px) {
        margin-top: 100px;
      }

      h3 {
        font-weight: 700;
        font-size: 32px;
        line-height: 44px;

        @media only screen and (max-width: 430px) {
          font-size: 24px;
          line-height: 36px;
        }
      }
      p {
        font-weight: 400;
        font-size: 20px;
        line-height: 34px;
        color: #121212;

        @media only screen and (max-width: 430px) {
          font-size: 14px;
          line-height: 20px;
        }

        .steps {
          .step {
            p {
              font-weight: 500;
              font-size: 20px;
              line-height: 34px;
              color: #121212;

              @media only screen and (max-width: 430px) {
                font-size: 14px;
                line-height: 20px;
              }
            }
            p:last-child {
              font-weight: 400;
              font-size: 20px;
              line-height: 34px;
              color: #263238;

              @media only screen and (max-width: 430px) {
                font-size: 14px;
                line-height: 20px;
              }
            }
          }
        }
      }
    }
    .section-5 {
      margin-top: 150px;
      margin-bottom: 100px;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      padding: 0 10%;
      background: #f3f7f5;
      height: 335px;

      @media only screen and (max-width: 770px) {
        //height: fit-content;
        padding: 0% 10%0;
        height: 435px;
      }

      @media only screen and (max-width: 430px) {
        height: 535px;
        margin-top: 120px;
      }

      p {
        font-weight: 400;
        font-size: 20px;
        line-height: 34px;
        text-align: center;
        color: #263238;
        width: 966px;

        @media only screen and (max-width: 770px) {
          width: 100%;
        }

        @media only screen and (max-width: 430px) {
          font-size: 20px;
          line-height: 36px;
        }
      }
      .btn {
        background: #3e947f;
        margin-top: 25px;
        border-radius: 50px;
        width: 250px;
        height: 75px;
        font-weight: 600;
        font-size: 24px;
        line-height: 28px;
        color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        @media only screen and (max-width: 430px) {
          font-size: 20px;
          line-height: 36px;
          width: 200px;
          height: 65px;
        }

        &:hover {
          background: #007b5d;
        }
      }
    }
  }
`;
