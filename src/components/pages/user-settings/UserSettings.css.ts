import styled from "styled-components";

export default styled.div`
    margin: 100px 0;
    padding: 50px;
    padding-bottom: 100px;
    min-height: 80vh;

    .settings-row{
        border-top: 1px solid lightgrey;
        padding: 20px 10px;
        .label {
            margin-left: 10px;
            margin-top: 0px;
            padding-top: 0px;
            font-size: 20px;
            display: block;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 10%;

            h4 {
                font-weight: 300;
                padding: 0;
                margin: 0;
                small {
                    font-size: small;
                }

            }
        }
  }

  .big-button {
    width: 100%;
    height: 60px;
    background: #007b5d;
    border: none;
    border-radius: 5px;
    color: white;
    margin-top: 50px;
    cursor: pointer;
    &:active {
        opacity: 0.7;
    }
  }
`

