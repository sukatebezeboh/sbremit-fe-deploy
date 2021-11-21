import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import { asset, convertDateString } from '../../../util/util';
import Bar from './NavBar.css';
import PageHeading from '../page-heading/PageHeading'
import { useSelector } from 'react-redux';
import { fetchUserNotifications, signOutAction } from '../../../redux/actions/actions';
import { resources } from '../../../util/constants';
import { paths } from '../../../util/paths';


const NavBar = () => {
    // const notifs = [{name: 'foo', read: true}, {name: 'bar', read: false}, {name: 'doe', read: false}, {read: true}, {read: true}];
    const [showNotifDropdown, setShowNotifDropdown] = useState(false);
    const [showProfileDropdown, setShowProfileDropdown] = useState(false)
    const user = useSelector((state: any)=> state.auth.user)
    const notifs = useSelector((state: any) => state.notifications)

    const handleDropdownClick = (type: string) => {
        if (type === 'notif') {
            setShowNotifDropdown(prev=>!prev);
            setShowProfileDropdown(false);
        }
        else if (type === 'profile'){
            setShowNotifDropdown(false);
            setShowProfileDropdown(prev=>!prev);
        }
    }

    const notifList = (notifs: any[]) => {
        return notifs?.map(notif => (
            <div className={`notif-body ${notif.status.toLowerCase() }`}>
                <img src={`${resources.DICE_BEAR_USER}${user.meta.customerId}.svg`} alt="pic"/>
                <div>
                    <div> {notif.meta.message} <b>  </b></div>
                    <div> {convertDateString(notif.dateCreated)} </div>
                </div>
            </div>
        ))
    }

    useEffect(() => {
        fetchUserNotifications();
    }, [])

    return (
        <Bar>
            <div>
                <span className="hamburger">
                    <span></span>
                    <span></span>
                    <span></span>
                </span>
                <span className="logo">
                    <Link to={user ? paths.DASHBOARD : paths.LANDING}> <img src="./assets/main-logo.svg" alt="logo"/> </Link>
                </span>
            </div>

            <div className="right-opt">
                <span className="notif">
                    <img src="./assets/icons/bell.svg" alt="notifications" onClick={()=>handleDropdownClick('notif')} />
                    <span></span>
                     {showNotifDropdown && <div className="dropdown notif-dropdown">
                         <div className="notif-head">Notifications</div>
                         <hr/>
                        <div>
                            {notifList(notifs)}
                         </div>
                         <hr/>
                         <div className="notif-more">View all notifications </div>
                    </div> }
                </span> 
                <span className="pic">
                    <img src={`${resources.DICE_BEAR_USER}${user.meta.customerId}.svg`} alt="pic" onClick={()=>handleDropdownClick('profile')}/>
                </span>
                <span className="name" onClick={()=>handleDropdownClick('profile')}>
                    <span>{user.profile.firstName}</span>
                    {showProfileDropdown && <div className="dropdown profile-dropdown">
                            <div>
                                <div className="notif-body">
                                    <img src={`${resources.DICE_BEAR_USER}${user.meta.customerId}.svg`} alt="pic"/>
                                    <div>
                                        <div className="heading"><b>{user.profile.firstName + ' ' + user.profile.lastName}</b></div>
                                        <div>Membership number SBR{user.meta.customerId}</div>
                                    </div>
                                </div>
                            </div>
                         <hr/>
                         <div className="notif-option">
                                <div> <img src={asset('icons', 'user.svg')} alt="user icon"/> </div>
                                <div><Link to="/profile">View Profile</Link></div>
                         </div>
                         <div className="notif-option">
                                <div> <img src={asset('icons', 'prev.svg')} alt="settings"/> </div>
                                <div><Link to={paths.DASHBOARD}>Dashboard</Link></div>
                         </div>
                         <div className="notif-option">
                                <div> <img src={asset('icons', 'settings.svg')} alt="settings"/> </div>
                                <div>Settings</div>
                         </div>
                         <hr/>
                         <div className="notif-option sign-out-option" onClick={signOutAction}>
                                <div> <img src={asset('icons', 'logout.svg')} alt="signout"/> </div>
                                <div><b>Sign out</b></div>
                         </div>
                    </div> }
                </span>
                <span className="arrow-down">
                    <img src="./assets/icons/angle-down.svg" alt="arrow down" onClick={()=>handleDropdownClick('profile')}/>
                </span>
            </div>

            {/* MOBILE NOTIF */}
            <div className='desktop-hide'>
                <div className={` notif ${showNotifDropdown || 'mobile-hide'}`}>
                        <PageHeading heading="Notification" callBack={()=>setShowNotifDropdown(false)} back="#" mobileHide="subheading" className="pgheading"/>
                            <div>
                                {
                                    notifList(notifs)
                                }
                            </div>
                        <div className="notif-more">You have viewed all notifications</div>
                </div>
            </div>
        </Bar>
    )
}

export default NavBar;
