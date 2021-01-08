import styled from 'styled-components';

export default styled.div`
    .page-content {
        margin-top: 0px;
        .box-container {
            display: grid;
            grid-template-columns: 2fr 1.3fr;
            grid-gap: 2%;
            padding-top: 50px;
        }
        hr {
            border: 1px solid #f8f7f8;
            margin-bottom: 30px;
        }

        .part{
            background: #FFFFFF;
            box-shadow: 0px 10px 12px #CCCCCC80;
            border-radius: 15px;
            width: 100%;
            padding: 50px;
            margin: 0px auto;
            .heading {
                display: grid;
                grid-template-columns: 1fr 1fr;
                .title {
                    font: normal normal normal 20px/24px Montserrat;
                    color: #A3A3A3;
                }
                .update {
                    text-align: right;
                    font: normal normal normal 16px/19px Montserrat;
                    color: #007B5D;
                }
            }

            .small-boxes {
                display: grid;
                grid-template-columns: 1fr 1fr 1fr;
                .recipient {
                    display: grid;
                    grid-template-rows: 1fr 1fr;
                    box-shadow: 0px 2px 4px #CCCCCC80;
                    border-radius: 8px;
                    width: 92%;
                    height: 129px;
                    text-align: center;
                    padding: 20px 0px;
                    box-shadow: 0px 2px 4px #CCCCCC80;
                    margin-top: 35px;
                    font: normal normal normal 16px/20px Montserrat;
                    color: #424242;
                    img{
                        width: 25%;
                        margin: auto;
                        /* width: 55px;
                        height: 55px; */
                        margin-bottom: 15px;
                        border-radius: 50%;
                    }
                }
                .plus {
                    background: #007B5D;
                    color: white;
                    img {
                        border-radius: 0px;
                    }
                }
            }
        }

        .search {
            float: right;
        }
        .btns {
            text-align: right;
            margin: 65px 0px;
            span {
                display: inline-block;
                margin-right: 50px;
                font: normal normal normal 25px/30px Montserrat;
                color: #424242;
                cursor: default;
            }
            button {
                background: #FCD20F 0% 0% no-repeat padding-box;
                border-radius: 8px;
                width: 300px;
                height: 80px;
                text-align: center;
                font: normal normal normal 25px/30px Montserrat;
                color: #424242;
                border: none;
                outline: none;
            }
        }
    }
`