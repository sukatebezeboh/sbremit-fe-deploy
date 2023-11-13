import styled from "styled-components";

export default styled.div`
  .page-content {
    margin-top: 0px;
    .box-container {
      display: grid;
      grid-template-columns: 1fr;
      padding-top: 50px;
    }
    hr {
      border: 1px solid #f8f7f8;
      margin-bottom: 30px;
    }

    .form {
    }
    .part {
      background: #ffffff;
      box-shadow: 0px 10px 12px #cccccc80;
      border-radius: 15px;
      width: 100%;
      padding: 50px;
      margin: 0px auto;

      .btns {
        display: flex;
        align-items: center;
        gap: 16px;
        flex-direction: row;
        justify-content: flex-end;
      }
      .heading {
        display: grid;
        //grid-template-columns: 1fr 1fr;
        .title {
          font: normal normal normal 20px/24px Montserrat;
          color: #a3a3a3;
        }
        .update {
          text-align: right;
          font: normal normal normal 16px/19px Montserrat;
          color: #007b5d;
        }
      }
      .inputs {
        margin-top: 50px;
        margin: 30px auto;
        width: 100%;
        .radio-span {
          input[type="radio"] {
            width: 19px;
            :before {
              width: 19px;
              height: 19px;
              border-radius: 15px;
              top: 30%;
              left: -5%;
              position: relative;
              background-color: white;
              content: "";
              display: inline-block;
              visibility: visible;
              border: 1px solid #fcd20f;
              pointer-events: none;
              @media only screen and (max-width: 900px) {
                top: 15%;
              }
            }
            :checked {
              :after {
                width: 11px;
                height: 11px;
                border-radius: 15px;
                top: -8px;
                left: 15%;
                position: relative;
                background-color: #fcd20f;
                content: "";
                display: inline-block;
                visibility: visible;
                border: 1px double #fcd20f;
                z-index: 1;
                pointer-events: none;
                @media only screen and (max-width: 900px) {
                  top: -57%;
                }
              }
            }
          }
          .radio-txt {
            padding: 17px 5px;
          }
        }
        input,
        select {
          margin-bottom: 5px;
          width: 100%;
          height: 48px;
          border: 1px solid #7fbcad;
          border-radius: 4px;
          background: #ffffff;
          outline: none;
          font: normal normal normal 14px Montserrat;
          color: #a3a3a3;
          padding: 19px;
          ::placeholder {
            color: #a3a3a3;
          }
        }
        select {
          -webkit-appearance: none;
          -moz-appearance: none;
          background: transparent;
          background-image: url("data:image/svg+xml;utf8,<svg fill='rgb(127, 188, 173)' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
          background-repeat: no-repeat;
          background-position-x: 20%;
          background-position-y: 10px;
          padding: 0px;
          padding-left: 75px;
          &.phone-code-adjust {
            line-height: 10;
            overflow: hidden;
          }
        }
        div.phone-box {
          border: 1px solid #7fbcad;
          border-radius: 4px;
          display: flex;
          flex-direction: row;
          align-items: center;
          margin-bottom: 30px;
          img {
            height: 24px;
            width: 36px;
            margin: 0 8px;
          }
          input {
            width: 50%;
            margin-bottom: 0;
            flex: 1;
            margin-left: 8px;
            border-top: 0;
            border-bottom: 0;
          }
        }
        div.mobile-head {
          margin-bottom: -44px;
        }
        .dob {
          margin-top: 6px;
          input {
            padding: 9px;
          }
        }
        .street-name {
        }
        .building-number {
          width: 200px;
        }
        select + img,
        select + .phone-code-value {
          position: relative;
          top: -35px;
          left: 20px;
          width: 25px;
          height: 19px;
          box-shadow: 0px 3px 6px #00000029;
          border-radius: 1px;
          pointer-events: none;
        }

        select + .phone-code-value {
          left: 15px;
          top: -63px;
          box-shadow: none;
        }
        > div:nth-child(3) {
          margin-top: 0px;
        }
        > div {
          margin-top: 20px;
          font: normal normal normal 15px/19px Montserrat;
          color: #a3a3a3;
          i {
            color: #fcd20f;
          }
          .show-hide {
            width: 16px;
            height: 16px;
            position: relative;
            top: -33px;
            left: 90%;
          }
          > div {
            font: normal normal normal 15px/19px Montserrat;
            line-height: 19px;
          }
        }
        > div:first-child {
          box-sizing: border-box;
          display: grid;
          grid-template-columns: 5fr 1fr 5fr;
        }
      }
    }

    .day-select {
      padding-left: 10px !important;
      background-position-x: 100% !important;
    }
    .month-select {
      padding-left: 3px !important;
      background-position-x: 100% !important;
    }

    .btns {
      text-align: right;
      margin: 65px 0px;
      z-index: 5;
      span {
        display: inline-block;
        margin-right: 50px;
        font: normal normal normal 25px/30px Montserrat;
        color: #424242;
        cursor: default;
      }
      button {
        background: #fcd20f 0% 0% no-repeat padding-box;
        border-radius: 8px;
        width: 300px;
        height: 80px;
        text-align: center;
        font: normal normal normal 25px/30px Montserrat;
        color: #424242;
        border: none;
        outline: none;
        cursor: pointer;
      }
    }
  }
  #trulioo-embedid {
    max-height: 750px;
  }
  #trulioo-embedid:empty {
    background: url("/assets/icons/rolling-loader-black.svg");
    width: 100%;
    min-height: 50vh;
    background-repeat: no-repeat;
    background-position: center;
  }
  @media only screen and (max-width: 900px) {
    .page-content {
      background: #fff;
      width: 100%;
      /* height: 130vh; */
      margin-top: -10px;
      padding-top: 10px;
      margin-bottom: 0px;
      padding-bottom: 20px;
      .page-heading {
        margin-top: 10px;
        .heading {
          z-index: 1;
        }
        .subheading {
          margin-bottom: -5px;
        }
      }
      .box-container {
        grid-template-columns: 1fr;
        padding-top: 0px;
        margin-top: 10px;
        .part {
          padding: 20px;
          box-shadow: none;
          .inputs {
            margin-top: -10px;
            > div {
              grid-template-columns: 1fr;
            }
            input {
              padding: 10px 20px;
            }
            input,
            select {
              height: 30px !important;
              font: normal normal normal 14px/18px Montserrat;
            }
            select {
              /* padding: 10px 50%; */
              background-position-y: 3px;
              background-position-x: 10%;
            }

            .mobile-head {
              margin-bottom: -31px;
            }
            select + img {
              top: -29px;
              left: 10px;
            }
            > div {
              margin-top: 15px;
              > div {
                font: normal normal normal 10px/13px Montserrat;
                line-height: 19px;
              }
              .show-hide {
                top: -25px;
                left: 90%;
              }
            }
            div.email {
              margin-bottom: 20px;
            }
            > button {
              margin-top: 25px;
              height: 40px;
              font: normal normal normal 13px/16px Montserrat;
            }
            .radio-txt {
              padding: 10px 5px;
              font: normal normal normal 14px/19px Montserrat;
            }
          }
        }
      }
      .btns {
        margin-top: -30px;
        padding: 0px 5%;
        button {
          width: 100%;
          height: 40px;
          font: normal normal normal 13px/16px Montserrat;
        }
        span {
          font: normal normal normal 13px/16px Montserrat;
          text-align: center;
          display: block;
          margin-right: 0px;
          position: relative;
          top: 70px;
        }
      }

      .m-grid-col-1-1-1 {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
      }
      .m-grid-col-span-1-4 {
        grid-column: 1/4;
      }
    }
  }
`;
