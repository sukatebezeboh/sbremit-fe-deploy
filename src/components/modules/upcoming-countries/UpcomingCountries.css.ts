import styled from "styled-components";

export default styled.div`
.modal-content {

    .country-flag-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        text-align: center;
        max-width: 300px  ;
        gap: 10%;
        margin: 0 auto;

        .resize img{
            width: 100px;
            height: 70px;
            border: 1px solid grey;
            border-radius: 5px;

        }
    }

    .info-container {
        padding: 20px;
        text-align: center;

        .info-text {
            font-size: 25px;
            line-height: 55px;

            .green-text {
                color: #007B5D;
                font-weight: bold;
            }
        }

        .modify-btn {
            border: none;
            border-radius: 5px;
            padding: 20px 40px;
            background: #007B5D;
            color: #fff;
            font-size: 20px;
            cursor: pointer;
        }
    }

    .close-btn {
        text-align: right;
        font-size: 50px;
        cursor: pointer;
    }
}
`