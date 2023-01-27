import { useState} from 'react'
import NavHeader from '../../nav-header/NavHeader';
import SideNav from '../side-nav/SideNav';
import { AppFooter } from '../../../modules/app-footer/AppFooter';
import TermsAndConditions from '../terms-and-conditions/TermsAndConditions';
import PrivacyPolicy from '../privacy-policy/PrivacyPolicy';
import {Switch, Route} from 'react-router-dom';

import Wrapper from './Legal.css'
import CookiePolicy from '../cookie-policy/CookiePolicy';

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
                            <Route path={'/support/legal/cookie'} render={() => <CookiePolicy setNavLink={setNavList} />} exact />
                        </Switch>
                    </div>
                    <AppFooter />
                </main>
            </div>
        </Wrapper>
    )
}

export default Legal;