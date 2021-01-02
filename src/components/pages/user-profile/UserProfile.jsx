import React from 'react'
import NavBar from '../../ui-components/navbar/NavBar';
import PageHeading from '../../ui-components/page-heading/PageHeading';
import {asset} from '../../../util/util';
import { Link } from 'react-router-dom';
import style from './UserProfile.css'

const Body = style();

const UserProfile = () => {
    return (
        <Body>
            <NavBar />
            <div className="page-content">
                <PageHeading heading="My Profile" subheading="View my personal and account information" mobileHide="subheading" />

                <div className="box">
                    <div className="up">
                        <div className="left">
                            <img src={asset('images', 'noimage.png')} alt="user pic"/>
                            <div>
                                <div>Bunmi0034</div>
                                <div>Membership number SBR899065</div>
                            </div>
                            <div>
                                <span className="status">Active</span>
                            </div>
                        </div>
                        <div className="right">
                            <span> <Link to="/change-password"> <img src={asset('icons', 'lock.svg')} alt="lock-icon" /> Change password </Link></span> 
                            <span><img src={asset('icons', 'pencil.svg')} alt="pen-icon" /> Edit profile</span>
                        </div>
                    </div>
                    <hr/>
                    <div className="down">
                        <div className="detail-grp">
                            <div>First name</div>
                            <div>Bunmi</div>
                        </div>
                        <div className="detail-grp">
                            <div>Last Name</div>
                            <div>Adewunmi</div>
                        </div>
                        <div className="detail-grp">
                            <div>Gender</div>
                            <div>Female</div>
                        </div>
                        <div className="detail-grp">
                            <div>Email</div>
                            <div>bunmiadewunmi@email.com</div>
                        </div>
                        <div className="detail-grp">
                            <div>Mobile</div>
                            <div>+447967885952</div>
                        </div>
                        <div className="detail-grp">
                            <div>DOB</div>
                            <div>05/09/2020</div>
                        </div>
                        <div className="detail-grp">
                            <div>Address</div>
                            <div>1594 St Helens Road Flat 223 Shemi Building</div>
                        </div>
                        <div className="detail-grp">
                            <div>City / Town</div>
                            <div>Swansea</div>
                        </div>
                        <div className="detail-grp">
                            <div>State</div>
                            <div>Wales</div>
                        </div>
                        <div className="detail-grp">
                            <div>Postal / zip code</div>
                            <div>SW9 0BZ</div>
                        </div>
                        <div className="detail-grp">
                            <div>Country</div>
                            <div>United Kingdom</div>
                        </div>
                    </div>
                </div>
            </div>
        </Body>
    )
}

export default UserProfile;
