import React, { useEffect } from 'react';
import { asset } from '../../../util/util';
import SBRemitLogo from '../../ui-components/sbremit-logo/SBRemitLogo';
import { Link, useHistory } from 'react-router-dom';
import style from './NavHeader.css';

const Div = style;
const NavHeader = (props: {page: string}) => {
    const {page} = props;
    const history = useHistory()

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
                       <img src={asset('icons', 'menu.svg')} alt="" />
                   </span>
            </div>
        </Div>
    </div>
    )
}

export default NavHeader;