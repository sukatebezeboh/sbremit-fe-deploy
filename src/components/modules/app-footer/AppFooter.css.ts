import styled from 'styled-components'

export default styled.footer`
background: #007B5D;
.footer-inner { 
    width: 80%;
    margin: auto;
    padding: 80px 0px;
    .logo-line { 
        display: grid;
        grid-template-columns: 1fr 0fr;
        @media only screen and (max-width: 900px) {
            grid-template-columns: 1fr;
            grid-gap: 32px;
        }
        .sb-logo { 

            img { 
                width: 200px;
                /* height: 31px; */
            }
        }

        .social-links { 
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            grid-gap: 16px;
            width: fit-content;
            a {
                display: block;
                border: 1px solid white;
                border-radius: 50%;
                padding: 11px;
                img { 
                    width: 23px;
                    height: 23px;
                }
            }
        }
    }

    .copyright-line { 
        padding-bottom: 16px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.25);
        margin-top: 55px;
        @media only screen and (max-width: 900px) {
            margin-top: 45px;
        }
        .text { 
            font-weight: 400;
            font-size: 16px;
            line-height: 28px;
            letter-spacing: -0.01em;
            color: #FFFFFF;
        }
    }

    .main-area { 
        margin: 60px auto;
        display: grid;
        grid-template-columns: 2fr 1fr;
        @media only screen and (max-width: 900px) {
            grid-template-columns: 1fr;
        }
        .nav-links { 
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            
            .footer-nav { 
                margin-bottom: 24px;
                .title { 
                    /* font-family: 'Faro'; */
                    font-style: normal;
                    font-weight: 400;
                    font-size: 24px;
                    line-height: 32px;
                    color: rgba(255, 255, 255, 0.65);
                    margin-bottom: 24px;

                    @media only screen and (max-width: 900px) {
                        font-size: 20px;
                    }
                }

                ul.links { 
                    font-weight: 400;
                    font-size: 16px;
                    line-height: 28px;
                    letter-spacing: -0.01em;
                    padding: 0;
                    margin: 0;
                    list-style-type: none;
                    color: rgba(255, 255, 255, 0.65);
                    @media only screen and (max-width: 900px) {
                        font-size: 16px;
                    }
                    li { 
                        margin: 14px 0;
                        a {

                        }
                    }
                }
            }
        }

        .search-area { 

            .title { 
                font-weight: 400;
                font-size: 24px;
                line-height: 32px;
                color: rgba(255, 255, 255, 0.35);
                margin-bottom: 32px;

                @media only screen and (max-width: 900px) {
                    font-size: 20px;
                    margin-bottom: 24px;
                }
            }

            .search-box { 
                display: grid;
                /* grid-template-columns: 1fr 0fr; */
                grid-gap: 16px;
                /* max-width: 570px; */
                grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                input.search-input { 
                    width: 100%;
                    background: #FBFCFB;
                    border: 0.3px solid rgba(0, 0, 0, 0.33);
                    box-sizing: border-box;
                    border-radius: 6px;
                    padding: 16px 24px;
                    font-weight: 400;
                    font-size: 16px;
                    line-height: 28px;
                    letter-spacing: -0.01em;
                    color: #000000;
                    min-width: 250px;

                    @media only screen and (max-width: 900px) {
                        font-size: 14px;
                        padding: 13px 16px;
                    }
                }


                .search-btn { 
                    padding: 16px 5px;
                    background: #FDDB3A;
                    border-radius: 6px;
                    border: none;
                    font-weight: 500;
                    font-size: 16px;
                    line-height: 28px;
                    letter-spacing: -0.01em;
                    color: #000000;
                    min-width: 187px;
                    @media only screen and (max-width: 900px) {
                        padding: 14px 5px;
                    }
                }
            }
        }
    }

    .summary-line { 
        font-weight: 400;
        font-size: 15px;
        line-height: 28px;
        letter-spacing: -0.01em;
        color: rgba(255, 255, 255, 0.65);
        margin-top: 50px;
        padding-top: 24px;
        border-top: 1px solid rgba(255, 255, 255, 0.25);
        @media only screen and (max-width: 900px) {
            font-size: 12px;
        }
    }
}

`