import React from 'react'
import styled from "styled-components";
import NavBar from '../../ui-components/navbar/NavBar';
import PageHeading from '../../ui-components/page-heading/PageHeading';
import {asset} from '../../../util/util';

const style = () => styled.div`
    .box {
        background: #ffffff;
        /* height: 706px; */
        margin: 50px 0px;
        border-radius: 15px;
        box-shadow: 0px 10px 12px #CCCCCC80;
        padding: 30px 50px;
        >div:first-child {
            display: grid;
            grid-template-columns: 3fr 2fr;
            div.left{
                display: grid;
                grid-template-columns: 0.7fr 3fr 2fr;
                >img {
                    width: 59px;
                    height: 59px;
                    border-radius: 50%;
                }  
                div{
                    div {
                        :first-child {
                            margin-top: 10px;
                            font: normal normal bold 19px/22px Montserrat;
                            color: #424242;
                        }
                        :last-child {
                            font: normal normal normal 15px/41px Montserrat;
                            color: #A3A3A3;
                        }
                    }
                    span.status {
                        display: inline-block;
                        background: #007B5D;
                        border-radius: 15px;
                        font: normal normal normal 12px Montserrat;
                        color: #FFFFFF;
                        padding: 7px 20px 8px 20px;
                        margin-top: 15px;
                    }
                }
            }
            div.right {
                text-align: right;
                padding-top: 15px;
                span{
                    margin-left: 54px; 
                    img {
                        width: 13px;
                        height: 13px;
                        margin-right: 10px;
                    } 
                }
                
            }
        }
        hr {
            border: 1px solid #f5f4f5;
        }
        div.down {
            display: grid;
            grid-template-columns: 2fr 2fr 0.5fr;
            .detail-grp {
                margin: 40px 0px;
                div{
                    :first-child{
                        font: normal normal normal 16px Montserrat;
                        color: #A3A3A3;
                    }
                    :last-child {
                        font: normal normal normal 20px/44px Montserrat;
                        color: #424242;
                        width: 60%;
                    }
                }
            }
        }
    }
`

const Body = style();

const UserProfile = () => {
    return (
        <Body>
            <NavBar />
            <div className="page-content">
                <PageHeading heading="My Profile" subheading="View my personal and account information"/>

                <div className="box">
                    <div className="up">
                        <div className="left">
                            <img src={asset('images', 'noimage.png')} alt="user pic"/>
                            <div>
                                <div>Bunmi0034</div>
                                <div>Membership number SBR899065</div>
                            </div>
                            <div>
                                <span className="status">Active</span>
                            </div>
                        </div>
                        <div className="right">
                            <span><img src={asset('icons', 'lock.svg')} alt="lock-icon" /> Change password</span>
                            <span><img src={asset('icons', 'pencil.svg')} alt="pen-icon" /> Edit profile</span>
                        </div>
                    </div>
                    <hr/>
                    <div className="down">
                        <div className="detail-grp">
                            <div>First name</div>
                            <div>Bunmi</div>
                        </div>
                        <div className="detail-grp">
                            <div>Last Name</div>
                            <div>Adewunmi</div>
                        </div>
                        <div className="detail-grp">
                            <div>Gender</div>
                            <div>Female</div>
                        </div>
                        <div className="detail-grp">
                            <div>Email</div>
                            <div>bunmiadewunmi@email.com</div>
                        </div>
                        <div className="detail-grp">
                            <div>Mobile</div>
                            <div>+447967885952</div>
                        </div>
                        <div className="detail-grp">
                            <div>DOB</div>
                            <div>05/09/2020</div>
                        </div>
                        <div className="detail-grp">
                            <div>Address</div>
                            <div>1594 St Helens Road Flat 223 Shemi Building</div>
                        </div>
                        <div className="detail-grp">
                            <div>City / Town</div>
                            <div>Swansea</div>
                        </div>
                        <div className="detail-grp">
                            <div>State</div>
                            <div>Wales</div>
                        </div>
                        <div className="detail-grp">
                            <div>Postal / zip code</div>
                            <div>SW9 0BZ</div>
                        </div>
                        <div className="detail-grp">
                            <div>Country</div>
                            <div>United Kingdom</div>
                        </div>
                    </div>
                </div>
            </div>
        </Body>
    )
}

export default UserProfile;
