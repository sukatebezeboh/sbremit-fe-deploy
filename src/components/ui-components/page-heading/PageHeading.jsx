import React from "react";
import { Link } from "react-router-dom";
import { asset } from "../../../util/util";
import style from "./PageHeading.css";



const PageHeading = (props) => {
    const {heading, subheading, back} = props;
    const Div = style(back);

    return (
        <Div>
            {back && <Link to={back}> <img className="back" src={asset('icons', 'prev.svg')} alt="back"/> </Link>}
            <div>
                <div className="heading">{heading}</div>
                <div className="subheading">{subheading}</div>
            </div>
        </Div>
    )
}

export default PageHeading;
