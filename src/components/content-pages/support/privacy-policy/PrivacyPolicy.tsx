import React, { ReactNode, useEffect } from 'react';
import PageHeading from '../../../modules/page-heading/PageHeading';
import styled from 'styled-components';

const Div = styled.div`
    .data-content {

        .content-body {

            .paragraphs {

                p {

                }
                ul {

                    li {
                        grid-template-columns: 0fr 1fr!important;
                    }
                }
            }
        }
    }
`
const PrivacyPolicy = (props: {setNavLink: Function}) => {

    const {setNavLink} = props;

    const data = [
        {
            title: "Introduction",
            content: [
                    {
                        text: [
                            `This Privacy Policy explains what you can expect from us and what we need from you in relation to your personal data. If you live in the UK, the data controller is Sukate & Bezeboh Ltd at 78 Woodlands Way, Leeds, LS14 2AW. Our registration number with the Information Commissioner’s Office UK is ZB047653. If you have any questions about how we protect or use your data, please email us at info@sukatebezeboh.com.`,
                            `Sukate & Bezeboh Ltd (“SB Remit”) offer a software platform and services to help individuals send money around the world. We collect data about our customers and their payees (“Data”) when they use our platform, our services, and our websites (collectively, “Services”). This privacy policy describes how we collect, use and disclose Data. 
                            `,
                            `In this privacy policy, we sometimes refer to “You”. “You” may be a Visitor to one of our websites, a customer of one or more of our Services (“Customer”), or a payor / payee of a Customer (“Payee”). This policy does not apply to third-party websites, products, or services even if they link to our Services, and you should consider the privacy practices of those third-parties carefully. If you object to the practices described in this policy, you should (a) remove cookies from Your computer after leaving our website, and (b) discontinue your use of our Services. 
                            `,
                            `We may change this Privacy Policy from time to time. We will post any changes, and such changes will become effective when they are posted. Your continued use of our Services following the posting of any changes will mean you accept those changes. We encourage you to review the Privacy Policy whenever you interact with us to stay informed about our information practices and the ways you can help protect your privacy.`
                        ],
                    },
                ]
        },
        {
            title: "How we handle your data",
            content: [
                {
                    text: [
                        `We receive Data from Visitors to our website, and Customers using our Services. The collection and use of data is crucial to providing our Services and keeping the Services safe. Data helps us increase the safety of your online payments, while reducing the risk of fraud, money laundering and other harmful activity. Generally, Data can be categorized into data that directly identifies you individually (“Personal Information”) and data associated with your activities (“Activity Information”). All information you provide to us is stored on our secure servers. Any payment transactions will be encrypted using Transport Layer Security technology. You are responsible for keeping confidential any passwords we give you. We ask you not to share this password with anyone else and not to use this password for other services or products.`
                    ]
                }
            ]
        },
        {
            title: "Collecting Personal Information",
            content: [
                {
                    text: [
                        `You may have to provide us with Personal Information to sign up for, or make use of, our Services. This data includes the following, for yourself and your recipient:`
                    ],
                },
                {
                    text: [
                        "Name",
                        "Address",
                        "Date of birth",
                        "Place of birth",
                        "E-mail address",
                        "Demographic information (e.g., gender)",
                        "Phone number",
                        "Evidence of your identity (for example, passport information)",
                        "Financial information (including credit card, debit card, or bank account information),",
                        "Payment reason",
                        "Geographical location",
                        "Government ID number",
                        "Personal description",
                        "Photograph",
                        "IP address",
                        "Device ID",
                        "Device settings (e.g., language preference, time zone)",
                    ],
                    type: "list"
                },
                {
                    text: [
                        `We may collect Personal Information about you from other sources. For example, we may:`
                    ],
                },
                {
                    text: [
                        "Retrieve names associated with particular phone numbers from our payment service providers; and",
                        "Verify your identity against third party databases for anti-money laundering and fraud purposes."
                    ],
                    type: "list"
                }
            ]
        },
        {
            title: "Collecting Activity Information",
            content: [
                {
                    text: [
                        `We also automatically collect Activity Information based on your use of our Services. This data would include your activities on our website, or actions performed on our payment platform. For example, we may collect:`
                    ],
                        
                },
                {
                    text: [
                        `Details of the transactions you carry out when using our Services, including geographic location from which the transaction originates; Technical information, including the Internet protocol (IP) address used to connect your computer to the Internet, your login information, browser type and version, time zone setting, browser plug-in types and versions, operating system and platform;`,
                        `Information about your visit, including the full URL clickstream to, through and from our Website or App (including date and time); page response times, download errors, length of visits to certain pages, page interaction information, methods used to browse away from the page; and`,
                        `Any phone number used to call our customer support center, as well as a recording of that call. By continuing to speak to a customer support agent after calling our customer support center, you are agreeing to our collection of this data.`,
                        `Details of the transactions you carry out when using our Services, including geographic location from which the transaction originates; Technical information, including the Internet protocol (IP) address used to connect your computer to the Internet, your login information, browser type and version, time zone setting, browser plug-in types and versions, operating system and platform;`,
                    ],
                    type: "list"
                },
                {
                    text: [
                        `Our Website also uses cookies to distinguish you from other users of our Website. This helps us to provide you with a good experience when you use our Website and also allows us to improve our Website. By continuing to use our Website, you are agreeing to our use of cookies.`, 
                        `Personal Information and Activity Information we collect is stored in compliance with our various regulatory obligations for anti-money laundering and fraud purposes.`
                    ]
                }
            ]
        },
        {
            title: "Data use",
            content: [
                {
                    text: [
                        `When you sign up to effectuate payments through our Service, you enter into a contract with us to make these payments on your behalf. We must process your Data to fulfil this contract. Further, we are required by law to collect, process, and retain your Data, in fulfilment of our anti-money laundering regulatory obligations. We use your Data in the following ways:`
                    ]
                },
                {
                    text: [
                        `Carry out our obligations relating to your contracts with us and to provide you with the information, products and services that you request from us;`,
                        `Provide, maintain, personalize, optimize, and improve the Services, including research and analytics regarding use of the Services, or to remember you when you leave and return to the Services;`,
                        `Provide and improve our products and services;`,
                        `Provide you with more relevant content in marketing, promotional or other communications to which you may be subscribed;`,
                        `Detect, investigate, and prevent activities that may violate our policies or be fraudulent or illegal.`,
                        
                    ],
                    type: "list"
                },
                {
                    text: [
                        `We may combine information from the Services together and with other information we obtain from our business records or from third party sources.`, 
                        `SB Remit will only use your Data for marketing and promotional purposes if you “opt in” to such uses, and you can withdraw this permission at any time. You have the right to ask us not to contact you for marketing purposes by contacting us at info@sukatebezeboh.com`,
                        `As a regulated financial institution, we are required by law to store some of your Data beyond the termination of your relationship with us. After such time, your Data will only be accessed or processed if absolutely necessary. We will always delete Data that is no longer required by relevant legislation.`
                    ]
                }
            ]
        },
        {
            title: "Data Sharing",
            content: [
                {
                    text: [
                        `We may share Data to ensure that we can continue providing you with the Services you have contracted. SB Remit may share your Personal Information and Activity Information with:`
                    ]
                },
                {
                    text: [
                        `Sukate & Bezeboh Ltd Affiliates. We share Data with members of the Sukate & Bezeboh ltd (i.e., entities that are under common control of Sukate & Bezeboh ltd.) to provide our Services;`,
                        `SB Remit Service Providers. We share Data with service providers who help us provide the Services. Service providers help us with things like payment processing (i.e., banks, mobile network operators), website hosting, data analysis, information technology and related infrastructure, customer service, email delivery, and auditing;`,
                        `Third Parties Authorized by You. We share Data with parties directly authorized by a Customer to receive Data, such as when a Customer authorizes a third party application provider to access the Customer’s SB Remit information through the third party’s own system or software. The use of Data by an authorized third party is subject to the third party’s privacy policy and any agreements the Customer has with the third party.`,
                        `Authorized Financial Institution(s). We share Data with the financial institution that holds the account you have designated for the sending or receiving transaction. By requesting a payment, you are consenting to sharing of Data by and between both SB Remit and the relevant Financial Institution(s) as necessary for the provision of payment services.`,
                        `Successors-in-Interest. We will share Data with third parties in the event of any reorganization, merger, sale, joint venture, assignment, transfer or other disposition of all or any portion of our business, assets or stock (including in connection with any bankruptcy or similar proceedings); and`,
                        `Safety, Legal Purposes and Law Enforcement. We use and disclose Data as we believe necessary: (i) under applicable law, or payment method rules; (ii) to enforce our terms and conditions; (iii) to protect our rights, privacy, safety or property, and/or that of our affiliates, you or others; and (iv) to respond to requests from courts, law enforcement agencies, regulatory agencies, and other public and government authorities, which may include authorities outside your country of residence.`
                    ],
                    type: "list"
                },
                {
                    text: [
                        `SB Remit may share only Activity Information (and not Personal Information) with:`
                    ]
                },
                {
                    text: [
                        `Advertisers and advertising networks solely to select and serve relevant adverts to you and others; and`,
                        `Analytics and search engine providers that assist us in the improvement and optimisation of our site.`
                    ],
                    type: "list"
                }
            ]
        },
        {
            title: "How We Protect Your Data",
            content: [
                {
                    text: [
                        `All information you provide to us is stored on our secure servers. Any payment transactions will be encrypted using Transport Layer Security technology. We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction. If you feel your interaction with us is no longer secure (e.g., you believe your log in or other security credentials have been compromised), please contact us immediately.`
                    ]
                }
            ]
        },
        {
            title: "Your Rights",
            content: [
                {
                    text: [
                        `If you are a resident of the UK, the following information applies to your Personal Information that we have processed or collected.`, 
                        `Purposes of processing and legal basis for processing: As explained above, we process Personal Information in various ways depending upon your use of our Services. We process Personal Information on the following legal bases: (1) with your consent; (2) as necessary to perform our agreement to provide Services; and (3) as necessary for our legitimate interests in providing the Services where those interests do not override your fundamental rights and freedom related to data privacy.`, 
                        `Right to lodge a complaint: Users that reside in the UK have the right to lodge a complaint about our data collection and processing actions with the supervisory authority concerned. Contact details for data protection authorities are available below.`, 
                        `Personal Information that we collect may be transferred to, and stored and processed in, the United Kingdom or any other country in which we or our affiliates, subcontractors, or partner payment processors maintain facilities. The laws in the UK and other countries regarding personal information may be different from the laws of your state or country. Any such transfers will comply with safeguards as required by relevant law. It may also be processed by staff operating outside the UK who work for us or for one of our payment processors. Such staff maybe engaged in, among other things, the fulfillment of your payment order, the processing of your payment details and the provision of support services. By submitting your personal data, you agree to this transfer, storing or processing.`, 
                        `Individual Rights: If you are a resident of the UK, you are entitled to certain rights under the General Data Protection Regulation (or any such similar legislation in the UK) (“GDPR”) over Personal Information that we have processed or collected. We have listed below how these rights operate in the context of using SB Remit’s Services. You may contact us at info@sukatebezeboh.com to request the exercise of these rights. We will make every effort to respond promptly, and in any case within 30 days of your request. We may take measures to verify your identity before processing a request.`
                    ]
                },
                {
                    text: [
                        `Your right of access. Upon request, SB Remit will provide you with information about whether we hold any of your Personal Information. We will also provide access to one copy of your Personal Information that we may hold free of charge.`,
                        `Your right of rectification. You may request to review, delete or update your Personal Information to ensure it is accurate. You may update or change certain of your Personal Information by logging into the App and directly making the desired changes. You may also contact us and notify us of the Personal Information you wish changed.`,
                        `Your right to be forgotten. You may request to have us erase your Personal Information that we may hold if the data is no longer necessary for the purpose for which it was collected, you withdraw consent and no other legal basis for processing exists, or you believe your fundamental rights to data privacy and protection outweigh our legitimate interest in continuing the processing. We will inform you which of your Personal Information may be erased without violating our legal obligations.`,
                        `Your right to restrict or object to our processing. You have the right to ask us not to process your Personal Information if we are processing your data based on legitimate interests or the performance of a task in the public interest as an exercise of official authority (including profiling); using your data for direct marketing (including profiling); or processing your Personal Information for purposes of scientific or historical research and statistics. You also have the right to ask us not to process your Personal Information while a rectification request is pending.`,
                        `Your right to data portability. You have the right to request a copy of your Personal Information, including your transaction history. Your transaction history is downloadable in machine-readable format from the App.`
                    ],
                    type: "list"
                },
                {
                    text: [
                        `Your rights related to automated decision making and profiling. SB Remit does not subject you to significant solely automated decisions, as explained in the Data Use section above. However, if you disagree with our decisions with respect to you you may request a review by contacting us.`
                    ]
                }
            ]
        },
        {
            title: "Our Partners",
            content: [
                {
                    text: [
                        `Our Services may, from time to time, contain links to and from the websites of our partner networks, advertisers and affiliates. If you follow a link to any of these websites, please note that these websites have their own privacy policies and that we do not accept any responsibility for them. Please check these policies before you submit any personal data to these websites.`
                    ]
                }
            ]
        },
        {
            title: "Changes to this Policy",
            content: [
                {
                    text: [
                        `Any changes we may make to our Privacy Policy will be posted on this page and, where appropriate, notified to you by e-mail or in the App. Please check back frequently to see any updates or changes to our privacy policy.`
                    ]
                }
            ]
        }
    ]

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
