import React, { useEffect } from 'react';
import PageHeading from '../../../modules/page-heading/PageHeading';
import { generateLegalPageContent } from '../legal-wrapper/Legal.helper';
import Div from './PrivacyPolicy.css';
import { data } from './PrivacyPolicy.helper';

const PrivacyPolicy = (props: {setNavLink: Function}) => {

    const {setNavLink} = props;



    useEffect(() => {
        const list = data.map(d=> d.title);
        setNavLink(list)
        
    }, [])

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
                                    generateLegalPageContent(datum.content, index + 1)
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
