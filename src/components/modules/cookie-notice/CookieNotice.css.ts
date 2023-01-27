import styled from "styled-components";

export default styled.div`
    height: 100%;
    padding: 20px 10px;
    .text-container {
        display: grid;
        grid-template-columns: auto auto;
        width: fit-content;
        margin: auto;
        align-items: center;
        gap: 5%;
        .text {
            font-size: 36px;
            font-weight: lighter;
        }

        .btns {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 5px;
            align-items: center;

            .link {
                font-size: 16px;
                /* font-weight: lighter; */
                color: #007B5D;
                font-style: italic;
                text-decoration: underline;
            }

            .btn {
                background: #FCD20F;
                color: black;
                border: none;
                padding: 10px 20px;
                font-size: 16px;
            }
        }
    }
`