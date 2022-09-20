import PageHeading from 'components/modules/page-heading/PageHeading';
import React, { useEffect } from 'react'
import { generateLegalPageContent } from '../legal-wrapper/Legal.helper';
import  Div from './CookiePolicy.css'
import { data } from './CookiePolicy.helper';

const CookiePolicy = ({ setNavLink }: {setNavLink: Function}) => {
 

  useEffect(() => {
    const list = data.map(d=> d.title);
    setNavLink(list)
    
}, [])

  return (
      <Div>
          <PageHeading heading="Cookie Policy" subheading="Statement disclosing how SBremit gathers, uses, discloses, and manages your cookies" back="/content/support" />
          {
              data.map((datum: any, index: number) => {
                  return (
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

export default CookiePolicy
