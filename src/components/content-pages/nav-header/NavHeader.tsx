import React, { useEffect, useState } from 'react';
import { asset } from '../../../util/util';
import SBRemitLogo from '../../modules/sbremit-logo/SBRemitLogo';
import { Link, useHistory } from 'react-router-dom';
import style from './NavHeader.css';
import { constants } from '../../../util/constants';
import { paths } from '../../../util/paths';

const Div = style;
const NavHeader = (props: {page: string}) => {
    const {page} = props;
    const history = useHistory()

    const [mobileNavOpen, setMobileNavOpen] = useState(false)

    return (
    <div id="nav-container" className={page !== 'home' ? 'white-bg-shadow' : ''}>
        <Div>
            <div className="logo"> <SBRemitLogo /> </div>
            <div className="navs">
                <div  onClick={() => history.push('/')} className={`nav mobile-hide ${page === "home" && "selected"}`}>
                    <span>
                        Home
                    </span>
                </div>
                <div onClick={() => history.push('/content/about')} className={`nav mobile-hide ${page === "about" && "selected"}`}>
                    <span>
                         About Us
                    </span>
                </div>
                <div onClick={() => history.push('/support')} className={`nav mobile-hide ${page === "support" && "selected"}`}>
                    <span>
                        Support
                    </span>
                </div>
                <div onClick={() => history.push('/content/contact')} className={`nav mobile-hide ${page === "contact" && "selected"}`}>
                    <span>
                        Contact
                    </span>
                </div>
            </div>
            <div className="btns ">
                    <Link to="/sign-up"><button className="sign-up mobile-hide">Sign up</button></Link>
                    <Link to="/sign-in"><a href="/" className="sign-in mobile-hide ">Sign in</a></Link>
                   <span className="menu desktop-hide">
                       <img onClick={() => setMobileNavOpen(true)} src={asset('icons', 'menu.svg')} alt="" />
                   </span>
            </div>
            { 
            mobileNavOpen &&
            <div className="mobile-nav">
                <div className="header">
                    <div className="logo">
                        <SBRemitLogo />
                    </div>
                    <div className="close-nav" onClick={() => setMobileNavOpen(false)}> &times; </div>
                </div>

                <div className="links">
                    <ul>
                        <li onClick={() => history.push(paths.LANDING)} className={`${page === constants.HOME && "active"}`} >Home</li>
                        <li onClick={() => history.push(paths.ABOUT)} className={`${page === constants.ABOUT && "active"}`} >About</li>
                        <li onClick={() => history.push(paths.SUPPORT)} className={`${page === constants.SUPPORT && "active"}`} >Support</li>
                        <li onClick={() => history.push(paths.CONTACT)} className={`${page === constants.CONTACT && "active"}`} >Contact</li>
                    </ul>
                </div>

                <div className="sign-up-in-mobile">
                        <Link to={paths.SIGN_UP}>Sign up</Link>
                        <Link to={paths.SIGN_IN}>Sign in</Link>
                </div>

                <div className="img">
                    <img src={asset('images', 'mobile-nav.png')} alt="mobile nav" />
                </div>
            </div>
            }
        </Div>

    </div>
    )
}

export default NavHeader;