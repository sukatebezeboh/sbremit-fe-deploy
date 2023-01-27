import styled from "styled-components";

export default styled.label`
        position: relative;
        display: inline-block;
        .payment-options-card {
            background: #fff;
            padding: 20px 15px 15px;
            display: inline-grid;
            grid-template-columns: 0fr 1fr;
            margin: 10px 10px 50px;
            min-width: 200px;
            cursor: pointer;
            box-shadow: 1px 1px 3px grey;
            border-radius: 5px;
            &.selected-pm-green {
                color: white;
                background: #007B5D;
                .method-container {
                    .label {
                        color: white;
                    }
                }
            }

            &.is-recommended-pm {
                ::before {
                    content: 'Recommended';
                    display: inline-block;
                    background: #FCD20F;
                    border-radius: 15px;
                    color: #000000;
                    width: fit-content;
                    position: absolute;
                    top: 0;
                    right: 25px;
                    padding: 2px 10px;
                    border: 1px solid #000000;
                    font-size: smaller;
                }
            }
            .inp-container {
                display: block;
                position: relative;
                padding-left: 35px;
                margin-bottom: 12px;
                cursor: pointer;
                font-size: 22px;
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;

                input {
                    position: absolute;
                    opacity: 0;
                    cursor: pointer;
                    height: 0;
                    width: 0;

                }

                .checkmark {
                    position: absolute;
                    top: 4px;
                    left: 0;
                    height: 21px;
                    width: 21px;
                    /* background-color: #cfcfcf; */
                    border-radius: 50%;
                    border: 2px solid #FCD20F;
                }

                .container:hover input ~ .checkmark {
                    background-color: #ccc;
                }

                input:checked ~ .checkmark {
                    background-color: #007B5D;
                }

                .checkmark:after {
                    content: "";
                    position: absolute;
                    display: none;
                }

                input:checked ~ .checkmark:after {
                    display: block;
                }

                .checkmark:after {
                    top: 2px;
                    left: 2px;
                    width: 13px;
                    height: 13px;
                    border-radius: 50%;
                    background: #FCD20F;
                }

            }

            .method-container {
                min-width: 250px;
                .title {
                    font-size: 18px;
                    font-weight: bold;
                }
                .provider {
                    font-size: 12px;
                    color: #bbbbbb;
                    margin-top: 10px;
                }
                .label {
                    display: grid;
                    grid-template-columns: 1fr 0fr;
                    font-weight: bold;
                    margin-top: 20px;
                    color: #007B5D;
                    img {
                        height: 35px;
                    }
                }
            }
        }
`