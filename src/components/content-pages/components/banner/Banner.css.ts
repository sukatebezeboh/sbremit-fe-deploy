import styled from "styled-components";

export default styled.div.attrs((props) => ({
  className: "about-custom",
}))`
  padding: 3rem;
  .register_interest {
    margin-bottom: 94px;
    width: 866px;
    height: 334px;
    background: #ffffff;
    border: 1px solid rgba(196, 196, 196, 0.8);
    box-shadow: 0px 16px 68px rgba(0, 0, 0, 0.08);
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;

    @media only screen and (max-width: 430px) {
      width: 100%;
      //margin-top: 70px;
      height: 336px;
    }

    @media only screen and (max-width: 375px) {
      justify-content: center;
      height: 400px;
    }

    .banner {
      position: absolute;
      top: 0;
      //left: 0;
      right: 0;
      margin-right: -6.5%;
      margin-top: -6.5%;
      object-fit: cover;
      height: 90%;

      @media only screen and (max-width: 430px) {
        height: 45%;
      }

      @media only screen and (max-width: 375px) {
        height: 30%;
      }

      @media only screen and (max-width: 320px) {
        height: 25%;
      }
    }
    .content {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 48px;
      gap: 16px;
      width: 100%;

      span {
        font-weight: 700;
        font-size: 36px;
        line-height: 44px;
        text-align: center;
        color: #000000;
        width: 485px;

        @media only screen and (max-width: 430px) {
          font-size: 24px;
          line-height: 36px;
          width: 70%;
        }
      }
      span:last-child {
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;
        text-align: center;
        color: #263238;
        width: 515px;

        @media only screen and (max-width: 430px) {
          font-size: 14px;
          line-height: 20px;
          width: 70%;
        }
      }
    }
    .btn {
      margin-top: 32px;
      width: 240px;
      height: 62px;
      background: #fddb3a;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;

      font-weight: 500;
      font-size: 20px;
      line-height: 28px;
      color: #000000;
      letter-spacing: -0.01em;
      cursor: pointer;

      @media only screen and (max-width: 430px) {
        height: 52px;
        white-space: 206;
        font-size: 16px;
        line-height: 28px;
      }

      &:hover {
        background: #fddb3a;
      }
    }
  }
`;
