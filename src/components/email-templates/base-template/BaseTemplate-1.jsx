import React from 'react';
import style from "./BaseTemplate-1.css";

const Container = style();

const BaseTemplate = (props) => {
    const {heading, content, buttonText, handleBtn} = props;

    return(
        <Container>
            <br/>
            <div>
                <div><img src="/assets/main-logo.svg" alt="Logo"/></div>
                <hr/>
                <div className="d-1">{heading}</div>
                <div className="d-2">{content}</div>
                <div className="d-3"><button onClick={handleBtn}>{buttonText}</button></div>
                <div className="d-4"> Having issues with your account?<br/> Please contact us by replying to this email </div>
                <hr/>
                <div className="d-5">If you did not make this request, feel free to ignore or <span className="green">contact us</span> by replying to this email</div>
            </div>
        </Container>
    )
}

export default BaseTemplate
