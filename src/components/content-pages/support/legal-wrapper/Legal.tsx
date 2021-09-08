import React, { useState} from 'react'
import styled from 'styled-components';
import NavHeader from '../../nav-header/NavHeader';
import SideNav from '../side-nav/SideNav';
import { AppFooter } from '../../../ui-components/app-footer/AppFooter';
import TermsAndConditions from '../terms-and-conditions/TermsAndConditions';
import PrivacyPolicy from '../privacy-policy/PrivacyPolicy';
import {Switch, Route, Link, useHistory, useLocation} from 'react-router-dom';

const Wrapper = styled.div`
   
    .secondary-wrapper {
        display: grid;
        grid-template-columns: 0fr 1fr;
        .side-nav {
            width: 385px;
        }
        main {
            .content {
                min-height: 100vh;
                width: 100%;
                padding: 150px 50px;
                .numbering {
                    width: 50px;
                    font: normal normal normal 16px/30px Montserrat;
                    color: #A3A3A3;
                }
                .head {
                    display: grid;
                    grid-template-columns: 0fr 1fr;
                    margin-bottom: 30px;
                    .numbering {
                        width: 50px;
                        font: normal normal normal 16px Montserrat;
                        color: #A3A3A3;
                    }
                    .title {
                        font: normal normal bold 16px Montserrat;
                        color: #1F1F1F;
                    }
                }
                .content-body {
                    margin-top: 50px;
                }
                .page-heading {
                    margin-left: -30px;
                }
                .data-content {
                    margin-bottom: 50px;
                    .content-body {
                        display: grid;
                        grid-template-columns: 0fr 1fr;

                        .paragraphs {
                            font: normal normal normal 16px/26px Montserrat;
                            color: #424242;
                            p {
                                margin-top: 0px;
                                margin-bottom: 20px;
                            }
                            ul {
                                list-style: none;
                                margin: 0px;
                                margin-top: -10px;
                                padding: 0px;
                                li {
                                    margin: 10px 0px;
                                    display: grid;
                                    grid-template-columns: 0fr 0.2fr 1.3fr;
                                    &::before {
                                        content: '';
                                        display: inline-block;
                                        width: 5px;
                                        height: 5px;
                                        background: #007B5D;
                                        border-radius: 50%;
                                        margin-right: 10px;
                                        margin-top: 12px;
                                    }
                                    .key {
                                        font: normal normal 600 16px/30px Montserrat;
                                        color: #424242;
                                    }
                                    .value {

                                    }
                                }
                            }

                        }
                    }
                }
            }
        }
    }

@media only screen and (max-width: 900px) { 
    .secondary-wrapper {
        display: grid;
        grid-template-columns: 1fr;
        .side-nav {
            display: none;
        }
        main {
            .content {
                min-height: 100vh;
                width: 100%;
                padding: 150px 50px;
            }
        }
    }
}
`

const Legal = () => {
    const [navList, setNavList] = useState([])
    return (
        <Wrapper>
            <NavHeader page="support" />
            <div className="secondary-wrapper">
                <div className="side-nav">
                    <SideNav list={navList} />
                </div>
                <main>
                    <div className="content">
                        <Switch>
                            <Route path={'/support/legal/privacy'} render={() => <PrivacyPolicy setNavLink={setNavList} />} exact />
                            <Route path={'/support/legal/terms'} render={() => <TermsAndConditions setNavLink={setNavList} />} exact />
                        </Switch>
                    </div>
                    <AppFooter />
                </main>
            </div>
        </Wrapper>
    )
}

export default Legal;