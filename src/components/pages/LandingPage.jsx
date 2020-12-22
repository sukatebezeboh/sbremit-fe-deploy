import React from 'react';
import styled from "styled-components";
import SBRemitLogo from "./../ui-components/SBRemitLogo"

const Body = styled.div`
    background: url('./assets/bg/london-bg.png') grey;
    height: 115vh;
    background-repeat: no-repeat;
    background-size: stretch;
    overflow: hidden;
    .nav {
        width: 100%;
        margin: 0px;
        padding-top: 40px;
        padding-right: 100px;
        button, a {
            float: right;
            margin: 10px;
            padding: 0px;
        }
        .sign-up{
            border: 2px solid var(--unnamed-color-007b5d);
            border: 2px solid #007B5D;
            border-radius: 8px;
            width: 180px;
            height: 48px;
            background: transparent;
            font: normal normal normal 20px/24px Montserrat;
            color: #007B5D;
            :hover{
                background: #007B5D;
                color: white
            }
        }
        a{
            font: normal normal normal 20px/24px Montserrat;
            letter-spacing: 0px;
            color: #424242;
            margin: 24px 50px;
            display: inline-block;
            float: right;
            text-decoration: none;

        }
    }
    .hero-texts {
        color: #1F1F1F;
        width: 60%;
        display: inline-block;
        div{
            width: 75%;
            margin-left: 8.5%;
        }
        div:first-child{
            font: normal normal 700 60px/80px Montserrat;
            margin-top: 290px;
        }
        div:nth-child(2){
            font: normal normal normal 40px/65px Montserrat;
            letter-spacing: 0px;
            color: #1F1F1F;
            margin-top: 75px;
            width: 65%;
        }
    }
    .hero-rect {
        width: 33.5%;
        height: 90vh;
        background: #fff;
        display: inline-block;
        position: absolute;
        top: 155px;
        left: 1180px;
        background: #FFFFFF 0% 0% no-repeat padding-box;
        box-shadow: 0px 15px 30px #CCCCCC80;
        border-radius: 25px;
        padding: 50px;
        div:nth-child(1){
            font: normal normal normal 25px/30px Montserrat;
            letter-spacing: 0px;
            color: #A3A3A3;
        }
        div:nth-child(2){
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            button{
                background: #f8fcfb 0% 0% no-repeat padding-box;
                border: 1px solid #f8fcfb;
                border-radius: 0px 8px 8px 0px;
                font: normal normal normal 20px/24px Montserrat;
                color: #A3A3A3;
            }
        }
    }
}
`
const LandingPage = () => (
    <Body>
        <div>
            <SBRemitLogo />
            <div className="nav">
                <button className="sign-up">Sign up</button>
                <a href="/" className="sign-in">Sign in</a>
            </div>
        </div>
        <div className="hero-texts">
            <div>
                The Fastest Growing Money Transfer Company
            </div>
            <div>
                Our quest to transfer money better starts here, the future chooses Sukate & Bezeboh
            </div>
        </div>
        <div className="hero-rect">
            <div>Choose how receiver gets the money</div>
            <div><button>Mobile Money</button><button>Bank Transfer</button><button>Cash Pickup</button></div>

        </div>
    </Body>

)

export default LandingPage;
