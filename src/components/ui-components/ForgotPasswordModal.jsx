import React, {useCallback} from 'react'
import styled from 'styled-components';
import {useHistory} from 'react-router-dom';


const Div = styled.div`
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(2px);
    z-index: 1;
    >div{
        background: #FFFFFF;
        box-shadow: 0px 10px 12px #CCCCCC80;
        border-radius: 15px;
        width: 50%;
        height: 690px;
        margin: 120px auto;
        margin-left: 18%;
        padding: 100px;
        .heading {
            font: normal normal 600 30px/32px Montserrat;
            color: #007B5D;
        }
        .content {
            height: 183px;
            text-align: left;
            font: normal normal normal 25px/45px Montserrat;
            color: #424242;
            margin-top: 100px;
            margin-bottom: 52px;
        }
        .form{
            display: grid;
            grid-template-columns: 9fr 1fr 4fr;
            input{
                height: 48px;
                background: #FFFFFF;
                border: 2px solid #7FBCAD;
                border-radius: 4px;
                font: normal normal normal 16px/19px Montserrat;
                color: #A3A3A3;
                padding: 15px 20px;
                outline: none;
                width: 100%;
                ::placeholder{
                    font: normal normal normal 16px/19px Montserrat;
                    color: #A3A3A3;
                }
            }
            button{
                background: #FCD20F;
                border-radius: 4px;
                border: none;
                font: normal normal normal 16px/19px Montserrat;
                color: #424242;
                outline: none;
                width: 100%;
                height: 48px;
            }
        }
        .footer{
            font: normal normal normal 17px/19px Montserrat;
            color: #A3A3A3;
            margin-top: 50px;
            span{
                text-decoration: underline;
                font: normal normal normal 17px/19px Montserrat;
                color: #007B5D;
                cursor: pointer;
            }
        }
    }
    @media only screen and (max-width: 1200px) { 
        >div{
            .content{
                margin-top: 50px;
                margin-bottom: 125px;
            }
        }
    }
    @media only screen and (max-width: 954px) { 
        background: #fff;
        z-index: 1;
        >div{
            box-shadow: none;
            border-radius: 0px;
            width: 100%;
            height: 690px;
            margin: 103px auto;
            margin-left: 0;
            padding: 37px;
            z-index: 3;
            background: #fff;
            text-align: center;
            .heading{
                font: normal normal 600 20px/32px Montserrat;
            }
            .content {
                font: normal normal normal 13px/20px Montserrat;
                text-align: center;
                width: 100%;
                margin: 30px auto;
                height: 90px;
            }
            .form {
                margin-top: 0px;
                grid-template-columns: 1fr;
                input {
                    border: 1px solid #7FBCAD;
                    border-radius: 4px;
                    height: 30px;
                }
                button {
                    margin: 30px auto;
                    width: 250px;
                    font: normal normal normal 13px/16px Montserrat;
                }
            }
            .footer{
                font: normal normal normal 11px/12px Montserrat;
                span{
                    font: normal normal normal 11px/12px Montserrat;
                }
            }
        }
    }
`

const ForgotPasswordModal = (props) => {
    let {show, setShow} = props;
    const history = useHistory();

    const handleSendLink = useCallback(() => history.push('/email/password-reset'), [history]);

    const handleCloseModal = () => {
        setShow(false);
    }

    return (
        <Div className={show ? 'show' : 'hide'}>
            <div>
                <div className="heading">Forgot Password?</div>
                <div className="content">Don’t worry, resetting your password is easy. Please enter the email address you registered with, you will be sent a link to reset your password.</div>
                <div className="form"><input type="text" placeholder="Your email address" /> <span></span> <button onClick={handleSendLink}>Send Link</button> </div>
                <div className="footer">Remember your password? <span onClick={handleCloseModal}>Try Logging in</span></div>
            </div>
        </Div>
    )
}

export default ForgotPasswordModal;
