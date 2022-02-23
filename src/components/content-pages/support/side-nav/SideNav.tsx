import React, { useEffect } from 'react'
import styled from 'styled-components';
import { asset } from '../../../../util/util';
import { Link, useHistory } from 'react-router-dom';
import Scrollspy from 'react-scrollspy'

const Div = styled.div`
    width: 383px;
    height: 100%;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    position: fixed;
    top: 90px;
    padding: 40px 0px;
    z-index: 101;
    ul {
        list-style: none;
        padding-left: 20px;
        li.section-nav {
            font: normal normal normal 14px Montserrat;
            color: #1F1F1F;
            margin: 20px;
            cursor: pointer;
            padding-left: 13px;
            &.selected{
                font: normal normal bold 14px Montserrat;
                color: #007B5D;
                border-left: 4px solid #007B5D;
            }
        }
    }
    .contact {
        display: none;
        position: fixed;
        bottom: 0;
        padding: 40px 20px 40px 40px ;
        h4 {
            color: #1F1F1F;
        }
        .info {
            margin-top: 20px;
            .text {
                font: normal normal normal 14px/30px Montserrat;
                color: #A3A3A3;
            }
            .value {
                font: normal normal normal 14px/32px Montserrat;
                color: #424242;
                display: grid;
                grid-template-columns: 0fr 1fr;;
                img {
                    width: 24px;
                    height: 24px;
                    margin-right: 20px;
                }
                .value-text {
                    display: inline-block;

                }
            }
        }
    }
`
const SideNav = (props: {list: string[]}) => {
    const {list} = props
    const sections = [
        "Overview",
        "Definitions",
        "Use of Service",
        "Our Obligations",
        "Your Obligations",
        "Our Right to Refuse, Suspend or Cancel a Payment Instruction or The Services",
        "Your Right to Cancel; Refunds",
        "Collection & Use of Information",
        "Intellectual Property",
        "Electronic Communications",
        "Warranties & Liability",
        "Modifications",
        "Termination",
        "Complaints / Compensation",
        "General"
    ]

    const scrollSections = list.map((d, i) => "section_" + i);
    const history = useHistory()

    useEffect(() => {
        // history.push('#section_1')
    }, [])
    return (
        <Div>

            <Scrollspy style={{listStyle: "none", paddingLeft: "20px"}} items={ scrollSections } currentClassName="selected">
                    {
                        list.map((section, i) => {
                            return <li className={`section-nav`}> <a href={`#section_${i}`}>{section}</a></li>
                        })
                    }
            </Scrollspy>

            <div className="contact">
                <h4>Contact Information</h4>

                <div className="info">
                    <div className="text">The best way to contact us for any issue:</div>
                    <div className="value"> <img src={asset('icons', 'email.svg')} alt="mail" /> <div className="value-text">support@sbremit.com.</div> </div>
                </div>

                <div className="info">
                    <div className="text">You may also call us at:</div>
                    <div className="value"> <img src={asset('icons', 'phone-call.svg')} alt="call" /> <div className="value-text">+44(0)3301334158</div> </div>
                </div>

            </div>
        </Div>
    )
}

export default SideNav
