import styled from "styled-components";

export default styled.div.attrs((props) => ({
  className: "navbar-custom",
}))`
  /* display: grid;
    grid-template-columns: 1fr 1fr 1fr; */
  width: 100%;
  height: 98px;
  //overflow-y: hidden;
  padding: 0px 100px;
  position: fixed;
  top: 0;
  z-index: 100;
  align-items: center;
  justify-content: space-between;
  display: flex;
  align-items: center;
  //gap: 5rem;

  @media only screen and (max-width: 1024px) {
    padding: 0 50px;
  }

  .logo {
    width: 214px;
    height: 50px;

    @media only screen and (max-width: 780px) {
      top: 24px;
      left: 20px;
      width: 99px;
    }
    img {
      top: 20px;
      width: inherit;
      height: inherit;
    }
  }
  .navs {
    display: flex;
    gap: 4rem;

    @media only screen and (max-width: 1024px) {
      gap: 2.5rem;
    }
    //padding-left: 5rem;
    //grid-template-columns: repeat( 4, 1fr);
    //padding-top: 10px;
    .nav {
      font: normal normal normal 20px/24px Montserrat;
      color: #424242;
      cursor: pointer;

      .about-link {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;

        .dropdown-icon {
          //font-weight: 900;
          padding-top: 5%;
        }
      }
      .about-dropdown-links {
        margin-top: 1rem;
        display: flex;
        flex-direction: column;
        padding: 1rem;
        background: #ffff;
        box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
        position: absolute;
        width: fit-content;

        align-items: flex-start;
        border-radius: 5px;
        font-size: 16px;
        line-height: 0;
        font-weight: 500;

        .dropdwon-link {
          padding: 0.7rem 1rem;
          padding-right: 4rem;
          width: 100%;
          text-align: left;
          position: relative;
          color: #333333;
          p {
            &.active {
              font-weight: 500;
              color: #007b5d;
            }
          }
          &:hover {
            color: #007b5d;
            font-weight: 700;

            .active-link-indicator {
              position: absolute;
              width: 35px;
              height: 1px;
              background: #007b5d;
              bottom: 0;
              margin-bottom: 5px;
            }
          }
        }
      }
      .hide-about-dropdown-links {
        display: none;
      }
    }
    .nav.selected {
      font: normal normal bold 20px/24px Montserrat;
      color: #007b5d;
      span {
        width: fit-content;
        //display: inline-block;
        display: flex;
        //flex-direction: column;
        text-align: center;
        justify-content: center;
        &::after {
          content: "";
          position: absolute;
          bottom: 0;
          margin-bottom: 25px;
          width: 20px;
          height: 3px;
          background: #007b5d;
          border-radius: 1px;
        }
      }
      .about-link {
      }
    }
  }

  .btns {
    margin: 0px;
    //padding-right: 100px;
    white-space: nowrap;
    //justify-items: center;
    //display: flex;
    //gap: 10px;
    button,
    a {
      float: right;
      margin: 0px 10px;
      padding: 0px;
    }
    .sign-up {
      //border: 2px solid #007B5D;
      border: none;
      border-radius: 8px;
      width: 150px;
      height: 52px;
      //background: transparent;
      background: #3e947f;
      font: normal normal normal 20px/24px Montserrat;
      //color: #007B5D;
      color: #ffffff;
      :hover {
        background: #007b5d;
        color: white;
      }
    }
    a.sign-in {
      margin-top: 15px;
    }
    a {
      font: normal normal normal 20px/24px Montserrat;
      letter-spacing: 0px;
      margin: 0px 15px 0px;
      display: inline-block;
      float: right;
      text-decoration: none;
      //color: #007B5D;
      color: #000000;
    }
  }

  .menu {
    z-index: 2;
    float: right;

    img {
      width: 30px;
      height: 35px;
      margin-top: 10px;
    }
  }

  .mobile-nav {
    display: none;
  }

  @media only screen and (max-width: 900px) {
    .btns {
      padding-right: 20px;
    }

    .mobile-nav {
      display: block;
      background: red;
      //grid-column: 1/4;
      position: fixed;
      width: 100%;
      top: 0;
      background: #f0f5f4;
      height: 100%;
      .header {
        width: inherit;
        height: 100px;
        padding: 0 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .logo {
        }
        .close-nav {
          //float: right;
          font-size: 46px;
          color: #007b5d;
          cursor: pointer;
          margin: 0 60px;
        }
      }
      .links {
        ul {
          list-style-type: none;
          padding-left: 20px;
          margin-left: 0px;
          li {
            color: #424242;
            font-size: 13px;
            margin-bottom: 30px;
            width: fit-content;
            &.active {
              font-weight: bold;
              color: #007b5d;
              ::after {
                content: "";
                display: block;
                height: 1px;
                //background: #007b5d;
                width: 15px;
              }
            }
            .mobile-about-link {
              display: flex;
              flex-direction: column;
              gap: 0.7rem;
              .about-link {
                display: flex;
                align-items: center;
                gap: 1rem;

                .icon {
                  padding-top: 5%;
                }
              }
              .about-dropdown-links {
                padding: 0 0.5rem;
                padding-right: 4rem;
                width: 100%;
                text-align: left;
                display: flex;
                flex-direction: column;
                gap: 1rem;
                color: #333333;
                font-weight: 400;
                .dropdwon-link {
                  &:hover {
                    color: #007b5d;
                    font-weight: 700;
                  }
                  span {
                    &.active {
                      font-weight: 500;
                      color: #007b5d;
                    }
                  }
                }
              }
              .hide-about-dropdown-links {
                display: none;
              }
            }
          }
        }
      }

      .sign-up-in-mobile {
        display: grid;
        grid-template-rows: 1fr 1fr;
        margin-top: 50px;
        a {
          font: normal normal normal 13px/16px Montserrat;
          color: #007b5d;
          display: inline-block;
          width: fit-content;
          padding: 10px 20px;
          border-radius: 5px;
          margin: 7px auto;
          &:first-child {
            border: 1px solid #007b5d;
          }
          &:last-child {
          }
        }
      }

      .img {
        width: 100%;
        margin-top: 30px;
        img {
          width: 100%;
        }
      }
    }
  }
`;
