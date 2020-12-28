import React from 'react'
import styled from 'styled-components';
import { asset } from '../../../util/util';
import NavBar from '../../ui-components/navbar/NavBar';

const style = () => styled.div`
    >div.dash {
        margin: 150px auto;
        width: 65%;
        >.heading {
            font: normal normal 600 25px/40px Montserrat;
            color: #424242;
        }
        >.subheading {
            font: normal normal normal 20px/30px Montserrat;
            color: #A3A3A3;
        }
        >.transactions {
            margin-top: 50px;
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr;
            >div {
                width: 300px;
                height: 150px;
                box-shadow: 0px 10px 12px #CCCCCC80;
                padding: 30px;
                border-radius: 15px;
                background: #fff;
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
                    margin-bottom: 16px;
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
                grid-template-columns: 2fr 1fr;
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
                        }
                    }
                }
            }
        }
    }
`

const Body = style();

const Dashboard = () => {
    return (
        <Body>
            <NavBar />
            <div className="dash">
                <div className="heading">Dashboard</div>
                <div className="subheading">View recent transactions and analytics</div>
                <div className="transactions">
                    <div> 
                        <div className="green-txt">10</div>  
                        <div>Complete Transactions</div>
                    </div>
                    <div> 
                        <div className="yellow-txt">2</div>  
                        <div>Pending Transactions</div>
                    </div>
                    <div> 
                        <div className="red-txt">1</div>  
                        <div>Cancelled Transactions</div>
                    </div>
                    <div className="green-bg start-transfer"> 
                        <div> <img src={asset('icons', 'add.svg')} alt=""/> </div>  
                        <div> Start new transfer</div>
                    </div>
                </div>
                <div className="t-history">Transaction History <span>(13)</span></div>
                <div className="history">
                    <div className="up">
                        <div><img src={asset('images', 'noimage.png')} alt=""/></div>
                        <div>
                            <div>20 Nov 2020</div>
                            <div>To <b>Ifepade Adewunmi</b></div>
                        </div>
                        <div><span>Pending</span></div>
                        <div>
                            <div>51,585.92 NGN</div>
                            <div>100 GBP</div>
                        </div>
                    </div>
                    <hr/>
                    <div className="down">
                        <div>Transaction #: <span>SBR334908</span></div>
                        <div>
                            <span><img src={asset('icons', 'reload.svg')} alt="resend"/> Resend</span> 
                            <span><img src={asset('icons', 'show.svg')} alt="view"/> View details</span>
                        </div>
                    </div>
                </div>
                <div className="pagination">
                    <img src="" alt=""/> 
                    <span>1</span>
                    <img src="" alt=""/>
                 </div>
            </div>
        </Body>
    )
}

export default Dashboard;
