import styled from "styled-components";

export default styled.div.attrs((props) => ({
  className: "about-custom",
}))`
  .card {
    background: #ffffff;
    border: 1px solid rgba(196, 196, 196, 0.8);
    border-radius: 16px;
    width: 378px;

    @media only screen and (max-width: 430px) {
      width: 100%;
    }
    .img {
      border-radius: 16px;
      width: 378px;
      height: 261px;
      position: relative;
      @media only screen and (max-width: 430px) {
        width: 100%;
      }
      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 16px 16px 0 0;
      }
    }
    .card-info {
      padding: 8px 16px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      span {
        font-weight: 700;
        font-size: 24px;
        line-height: 32px;
        color: #121212;
      }
      span:last-child {
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 20px;
        color: #263238;
      }
    }
    .card-bottom {
      padding: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .date {
        display: flex;
        flex-direction: column;
        font-weight: 400;
        font-size: 12px;
        line-height: 16px;
        font-style: italic;
        display: flex;
        flex-direction: column;

        span:last-child {
          font-size: 16px;
          line-height: 20px;
          font-weight: 600;
          color: #000000;
          font-style: normal;
        }
      }
      .btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 110px;
        height: 30px;
        background: #3e947f;
        border-radius: 200px;
        font-weight: 500;
        font-size: 14px;
        line-height: 17px;
        color: #ffffff;
        cursor: pointer;

        &:hover {
          background: #287461;
        }
      }
    }
  }
`;
