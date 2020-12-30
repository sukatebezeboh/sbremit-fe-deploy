import React from "react";
import style from "./PageHeading.css";

const Div = style()

const PageHeading = (props) => {
    const {heading, subheading} = props;
    return (
        <Div>
            <div className="heading">{heading}</div>
            <div className="subheading">{subheading}</div>
        </Div>
    )
}

export default PageHeading;
