import React, { useEffect } from 'react';
import LegalPageHeading from '../page-heading/LegalPageHeading';
import {termAndConditionsData} from './termAndConditionsData';

const TermsAndConditions = (props: {setNavLink: Function}) => {
    const {setNavLink} = props;

    useEffect(() => {
        const list = termAndConditionsData.map(d=> d.title);
        setNavLink(list)

    }, [])

    const generateContent = (content: any, numbering: string|number) => {
        return (<div>

            {
                content.map((c: any, index: number )=> {
                    return (
                        <div className="content-body">
                            <div className="numbering">
                                {c.type !== "list" ? numbering + '.' + (index + 1) : '' }
                            </div>
                            <div className="paragraphs">
                                {
                                    c.type === "list" ?
                                    (
                                        c.text.constructor === Object ?
                                            <ul>
                                                {
                                                    (Object.keys(c.text).map(key => {
                                                        return <li>
                                                                    <div className="key">{key}</div>
                                                                    <div className="value">{c.text[key]}</div>
                                                            </li>
                                                    }))
                                                }
                                            </ul> :
                                            <ul>
                                                {
                                                    (c.text).map((text: any) => {
                                                        return <li>{text}</li>
                                                    })
                                                }
                                            </ul>
                                    )
                                    :
                                    c.text.map((text: any) => (
                                        <p>{text}</p>
                                    ))
                                }
                                {
                                    c.subcontent ? generateContent(c.subcontent, numbering + '.' + (index + 1)) : ""
                                }
                            </div>
                        </div>
                    )
                })
            }
        </div>)
    }
    return (
        <div>
            <LegalPageHeading heading="Terms and Conditions" subheading="The legal agreements between you and SBremit" mobileHide="subheading" back="/content/support" />
            {
                termAndConditionsData.map((datum: any, index: number) => {
                    return(
                        <div key={index} id={`section_${index}`}>
                            <div className="head">
                                <div className="numbering">
                                    {(index + 1) + '.'}
                                </div>
                                <div className="title">
                                    {datum.title}
                                </div>
                            </div>
                            <div className="data-content">
                                {
                                    generateContent(datum.content, index + 1)
                                }
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default TermsAndConditions
