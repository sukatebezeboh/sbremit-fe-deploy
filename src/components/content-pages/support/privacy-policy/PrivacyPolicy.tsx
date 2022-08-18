import React, { useEffect } from 'react';
import PageHeading from '../../../modules/page-heading/PageHeading';
import Div from './PrivacyPolicy.css';
import { data } from './PrivacyPolicy.helper';

const PrivacyPolicy = (props: {setNavLink: Function}) => {

    const {setNavLink} = props;



    useEffect(() => {
        const list = data.map(d=> d.title);
        setNavLink(list)
        
    }, [])
    const generateContent = (content: any, numbering: string|number) => {

        return (<div>

            {
                content.map((c: any, index: number )=> {
                    return (
                        <div className="content-body">
                            <div className="numbering">
                                
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
        <Div>
            <PageHeading heading="Privacy Policy" subheading="Statement disclosing how SBremit gathers, uses, discloses, and manages your data" back="/content/support" />
            {
                data.map((datum: any, index: number) => {
                    return(
                        <div key={index} className="content-body" id={`section_${index}`}>
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
        </Div>
    )
}

export default PrivacyPolicy
