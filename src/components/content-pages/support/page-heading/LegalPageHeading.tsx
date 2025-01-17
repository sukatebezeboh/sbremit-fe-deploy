import React from "react";
import { Link } from "react-router-dom";
import { asset } from "../../../../util/util";
import style from "./LegalPageHeading.css";



const LegalPageHeading = (props: any) => {
    const {heading, subheading, back, mobileHide, callBack} = props;
    const Div = style(back);

    return (
        <Div className="page-heading">
            {<Link to={back || '/support'}> <img className={back ? 'back mobile-back' : 'mobile-back'} src={asset('icons', 'prev.svg')} alt="back" onClick={callBack}/> </Link>}
            <div>
                <div className="heading">{heading}</div>
                <div className={"subheading "+ (mobileHide==="subheading" ? "mobile-hide" : "")}>{subheading}</div>
            </div>
        </Div>
    )
}

export default LegalPageHeading;
