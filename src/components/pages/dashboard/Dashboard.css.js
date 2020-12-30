import styled from 'styled-components';

const style = () => styled.div`
    >div.page-content {
        margin: 150px auto;
        width: 65%;
        >.transactions {
            margin-top: 50px;
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr;
            >div, .start-transfer {
                width: 95%;
                height: 150px;
                box-shadow: 0px 10px 12px #CCCCCC80;
                padding: 30px;
                border-radius: 15px;
                background: #fff;
                margin-bottom: 10px;
                >div{
                    :first-child {
                        font: normal normal 600 40px/40px Montserrat;
                        color: #007B5D;
                        margin-top: 5px;
                    }
                    :last-child {
                        font: normal normal normal 16px/19px Montserrat;
                        color: #A3A3A3;
                        margin-top: 20px;
                    }
                }
            }
        }
        .start-transfer {
            text-align: center;
            div {
                color: white!important;
                img {
                    width: 50px;
                    height: 50px;
                    position: relative;
                    top: -5px;
                    margin-bottom: 18px;
                }
                :last-child {
                    position: relative;
                    top: -35px;
                }
            }
        }
        .t-history {
            font: normal normal normal 20px/30px Montserrat;
            margin-top: 50px;
            margin-bottom: 20px;
            span {
                color: #A3A3A3;
            }
        }
        .history {
            background: #FFFFFF 0% 0% no-repeat padding-box;
            box-shadow: 0px 10px 12px #CCCCCC80;
            border-radius: 15px;
            padding: 30px 30px 20px;
            margin-bottom: 20px;
            .up {
                display: grid;
                grid-template-columns: 1fr 3fr 4fr 3fr;
                div {
                    img {
                        border-radius: 50%;
                        width: 60px;
                        height: 60px;
                    }
                    :first-child {

                    }
                    :nth-child(2){
                        /* display: grid;
                        grid-template-rows: 1fr 1fr; */
                        div:first-child {
                            font: normal normal normal 16px Montserrat;
                            color: #A3A3A3;
                        }
                        div:last-child{
                            width: 100%;
                            font: normal normal normal 20px Montserrat;
                            margin-top: 10px;
                        }
                    }
                    :nth-child(3){
                        span {
                            background: #FCD20F;
                            color: white;
                            display: inline-block;
                            padding: 7px 15px;
                            border-radius: 15px;
                            font-size: 14px;
                        }
                    }
                    :nth-child(4) {
                        text-align: right;
                        div {
                            :first-child{
                                font: normal normal normal 20px/44px Montserrat;
                                color: #424242;
                            }
                            :last-child{
                                font: normal normal normal 16px/44px Montserrat;
                                color: #A3A3A3;
                                margin-top: -10px;
                            }
                        }
                    }
                }

            }
            hr {
                border: 1px solid #f8f7f8;
            }
            .down {
                display: grid;
                grid-template-columns: 1fr 1fr;
                div {
                    font: normal normal normal 16px/44px Montserrat;
                    color: #A3A3A3;
                    :first-child {
                        span {
                            color: #424242;
                        }
                    }
                    :last-child {
                        text-align: right;
                        span {
                            margin-left: 24px;
                            img {
                                width: 16px;
                                height: 16px;
                                position: relative;
                                top: 2px;
                                left: -5px;
                            }
                            :first-child {
                                img {
                                    width: 13px;
                                    height: 13px;
                                }
                            }
                        }
                    }
                }
            }
        }
        .pagination {
            margin: 53px auto;
            width: 100%;
            text-align: center;
            img {
                width: 20px;
                height: 20px;
                margin: 0px 30px;
                position: relative;
                top: 5px;

            }
            span {
                display: inline-block;
                padding: 9px 16px;
                border: 1px solid #007B5D;
                border-radius: 5px;
                margin: 0px 6px;
                font: normal normal normal 13px/20px Montserrat;
                color: #A3A3A3;
                :hover {
                    background: #007B5D;
                }
            }
        }
    }
    @media only screen and (max-width: 1444px) { 
        
        >div.page-content {
            width: 95%;
            >.transactions {
                grid-template-columns: 1fr 1fr;
            }
        }
    }
    @media only screen and (max-width: 900px) { 
        
        >div.page-content{
            width: 90%;
            margin-top: 100px;
            >.heading {
                font-size: 18px;
            }
            >.subheading {
                font-size: 14px;
                margin-bottom: -20px;
            }
            >.transactions {
                >div, .start-transfer {
                    div:last-child{
                        font-size: 14px;
                    }
                }
            }

            .history {
                font-size: 12px;
                .up {
                    grid-template-columns: 1fr 3fr;
                    grid-template-rows: 2fr 2fr;
                    div{
                        span {
                            position: relative;
                            left: 100%;
                            
                            @media only screen and (max-width: 375px) { 
                                left: 0%;
                            }
                        }
                        div b{
                            font-size: 16px;
                        }
                    }
                }
                .down {
                    grid-template-columns: 1fr;
                }
                    div {
                        font-size: 14px!important;
                    }
            }
            .pagination {
                transform: scale(0.65, 0.65);  
                width: 120%;
                margin-left: -10%;
                img {
                    margin: 0px;
                    
                }      
            }
        }

    }
`

export default style;
