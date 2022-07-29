
import styled from "styled-components";

export default styled.div`
.table {
    width: 60%;
    margin: 32px auto 50px;
    min-width: 850px;
    @media only screen and (max-width: 900px) {
        width: 90%;
        min-width: unset;
    }

    .custom-page-table {
        border-collapse: collapse;
        width: 100%;
        @media only screen and (max-width: 900px) {
            border: none!important;;
        }
        td {
            text-align: center;
            padding: 13px 0;
            max-height: 73px;
            &.sbremit {
                img.sbremit-logo {
                    max-width: 100px;
                }
            }
        }

        th {
            font-weight: 400;
            font-size: 16px;
            line-height: 21px;
            color: #000000;
            padding: 16px 0;
        }

        th, td {
            border: 1px solid black;
            border-collapse: collapse;
        }

        @media only screen and (max-width: 900px) {


            td, th, tr {
                font-weight: 400;
                font-size: 16px;
                line-height: 21px;
                color: #000000;
                border: none;


                .inline-heading {
                    .line {
                        font-weight: 500;
                        text-align: left!important;
                    }
                }

                .content-wrapper {
                    .line {
                        &.line-1 {
                            display: grid;
                            grid-template-areas: 'b a';

                            span {
                                grid-area: b;
                                margin-top: 10px;
                                margin-right: 10px;
                            }
                        }
                    }
                }
            }

            td {
                &:last-child {
                    margin-bottom: 30px;
                    border-bottom: 1px solid #00000010;
                }
            }
        }
        &.custom-page-green-head-table {
            border: 1px solid #0A0E0D77;
            th, td {
                border: none;
                border-bottom: 1px solid #0A0E0D77;
                &:first-child {
                    border-right: 1px solid #0A0E0D33;
                }
            }

            th {
                background: #227863;
                color: white;
                border: 1px solid #227863;
                padding: 30px 0px;
            }

            td {
                color: #424242;
            }

            td.sbremit {
                background: #F3F5F5;
                @media only screen and (max-width: 900px) {
                    background: none;
                }
            }

            @media only screen and (max-width: 900px) {
                td {
                    border: none;
                    padding-bottom: 21px;
                    &:last-child {
                        margin-bottom: 10px;
                        border-bottom: 1px solid #00000010;
                        padding-bottom: 76px;
                    }
                }
            }

            .table-send-btn {
                padding: 8px 16px;
                font-weight: 500;
                font-size: 16px;
                line-height: 21px;
                text-align: center;
                letter-spacing: -0.01em;
                background: #FCD20F;
                border-radius: 6px;
                border: none;
                color: #000000;
            }
        }
    }
}`