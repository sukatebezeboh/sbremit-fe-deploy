import React from 'react'
import NavBar from '../../ui-components/navbar/NavBar';
import PageHeading from '../../ui-components/page-heading/PageHeading';
import {asset} from '../../../util/util';
import { Link, useHistory } from 'react-router-dom';
import style from './UserProfile.css'
import { useSelector } from 'react-redux';
import { paths } from '../../../util/paths';

const Body = style();

const UserProfile = () => {
    const user = useSelector((state: any)=> state.auth.user)
    const countries: any = useSelector((state: any) => state.appValues.countries)    
    const history = useHistory()
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
                                <div>{user.profile.firstName + ' ' + user.profile.lastName}</div>
                                <div>Membership number SBR899065</div>
                            </div>
                            <div>
                                <span className="status">{user.status}</span>
                            </div>
                        </div>
                        <div className="right">
                            <span> <Link to="/change-password"> <img src={asset('icons', 'lock.svg')} alt="lock-icon" /> Change password </Link></span> 
                            <span> <Link to={paths.EDIT_PROFILE}><img src={asset('icons', 'pencil.svg')} alt="pen-icon" /> Edit profile</Link></span>
                        </div>
                    </div>
                    <hr/>
                    <div className="down">
                        <div className="detail-grp">
                            <div>First name</div>
                            <div>{user.profile.firstName}</div>
                        </div>
                        <div className="detail-grp">
                            <div>Last Name</div>
                            <div>{user.profile.lastName}</div>
                        </div>
                        <div className="detail-grp">
                            <div>Gender</div>
                            <div>{user.profile.gender || '-'}</div>
                        </div>
                        <div className="detail-grp">
                            <div>Email</div>
                            <div>{user.username}</div>
                        </div>
                        <div className="detail-grp">
                            <div>Mobile</div>
                            <div>{user.mobile || '-'}</div>
                        </div>
                        <div className="detail-grp">
                            <div>DOB</div>
                            <div>{user.profile.dob || '-'}</div>
                        </div>
                        <div className="detail-grp">
                            <div>Address</div>
                            <div>{user.profile.address || '-'}</div>
                        </div>
                        <div className="detail-grp">
                            <div>City / Town</div>
                            <div>{user.profile.city || '-'}</div>
                        </div>
                        <div className="detail-grp">
                            <div>State</div>
                            <div>{user.profile.state || '-'}</div>
                        </div>
                        <div className="detail-grp">
                            <div>Postal / zip code</div>
                            <div>{user.profile.zip || '-'}</div>
                        </div>
                        <div className="detail-grp">
                            <div>Country</div>
                            <div>{countries[user.profile.location_country] || '-'}</div>
                        </div>
                    </div>
                </div>
            </div>
        </Body>
    )
}

export default UserProfile;
