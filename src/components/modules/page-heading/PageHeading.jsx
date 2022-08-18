import React from "react";
import { useHistory } from "react-router-dom";
import { asset } from "../../../util/util";
import style from "./PageHeading.css";



const PageHeading = (props) => {
    const {heading, subheading, back, mobileHide, callBack} = props;
    const Div = style(back);
    const history = useHistory();
    return (
        <Div className="page-heading">
            {<img className={back ? 'back mobile-back is-link' : 'mobile-back is-link'} src={asset('icons', 'prev.svg')} alt="back" onClick={callBack ?? (() => history.push(back || '/dashboard'))}/>}
            <div>
                <div className="heading">{heading}</div>
                <div className={"subheading "+ (mobileHide==="subheading" ? "mobile-hide" : "")}>{subheading}</div>
            </div>
        </Div>
    )
}

export default PageHeading;
