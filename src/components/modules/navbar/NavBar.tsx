import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import {useIdleTimer} from 'react-idle-timer/dist/modern';
import { asset, convertDateString } from '../../../util/util';
import Bar from './NavBar.css';
import PageHeading from '../page-heading/PageHeading'
import { useSelector } from 'react-redux';
import { changeCountryCurrencyToCountryName, fetchUserNotifications, signOutAction, updateUserNotifReadStatus } from '../../../redux/actions/actions';
import { countriesAndCurrency, resources } from '../../../util/constants';
import { paths } from '../../../util/paths';


const NavBar = () => {
    const [showNotifDropdown, setShowNotifDropdown] = useState(false);
    const [showProfileDropdown, setShowProfileDropdown] = useState(false)
    const user = useSelector((state: any)=> state.auth.user)
    const isAuthenticated = useSelector((state: any)=> state.auth.isAuthenticated)
    const notifs = useSelector((state: any) => state.notifications)
    const getAllAltCountryCode = countriesAndCurrency.map((currency: any) => currency.countryCurrency)
    const handleDropdownClick = (type: string) => {
        if (type === 'notif') {
            setShowNotifDropdown(prev => !prev);
            setShowProfileDropdown(false);
        }
        else if (type === 'profile'){
            setShowNotifDropdown(false);
            setShowProfileDropdown(prev => !prev);
        }
    }
    const notifList = (notifs: any[]) => {
        return notifs?.map((notif: any, index: any) =>
            notif.status === 'UNREAD' && (
            index < 7 && (
            <div onClick={() => updateUserNotifReadStatus(notif.id, () => fetchUserNotifications(10))} className={`notif-body is-link ${notif.status.toLowerCase() }`}>
                <img src={`${resources.DICE_BEAR_USER}${user.meta.customerId}.svg`} alt="pic"/>
                <div>
                    <div> {notif.type === 'GLOBAL_NEWS' ? changeCountryCurrencyToCountryName(notif.meta.message, getAllAltCountryCode) : notif.meta.message}</div>
                    <div> {convertDateString(notif.dateCreated)} </div>
                </div>
            </div>
        )))
    }

    useEffect(() => {
        fetchUserNotifications(10);
    }, [])

    useIdleTimer({
        timeout: 1000 * 60 * 10, // 10 minutes
        onIdle: () => {
          if(isAuthenticated){
            signOutAction()
          }
        },
        debounce: 500,
        crossTab: {
          emitOnAllTabs: true
        }
      })

    const unreadNotifCount = notifs?.filter((notif: any) => notif?.status?.toUpperCase() === 'UNREAD')?.length

    return (
        <Bar>
            <div>
                <span className="logo">
                    <Link to={user ? paths.DASHBOARD : paths.LANDING}> <img src="/assets/main-logo.svg" alt="logo"/> </Link>
                </span>
            </div>

            <div className="right-opt">
                <span className="notif">
                    <img src="/assets/icons/bell.svg" alt="notifications" onClick={()=>handleDropdownClick('notif')} />
                    <span>{unreadNotifCount}</span>
                     {showNotifDropdown && <div className="dropdown notif-dropdown">
                         <div className="notif-head">Notifications</div>
                         <hr/>
                        <div>
                            {notifList(notifs)}
                         </div>
                         <hr/>
                         <Link to="/notifications" className="notif-more">View all notifications </Link>
                    </div> }
                    {showNotifDropdown && <div className="invisible-overlay"  onClick={() => handleDropdownClick('notif')} ></div>}
                </span>
                <span className="pic">
                    <img src={`${resources.DICE_BEAR_USER}${user.profile.firstName + ' ' + user.profile.lastName + user.meta.customerId}.svg`} alt="pic" onClick={()=>handleDropdownClick('profile')}/>
                </span>
                <span className="name" onClick={()=>handleDropdownClick('profile')}>
                    <span>{ user.profile.businessName || user.profile.firstName }</span>
                    {showProfileDropdown && <div className="dropdown profile-dropdown">
                            <div>
                                <div className="notif-body">
                                    <img src={`${resources.DICE_BEAR_USER}${(user.profile.firstName || user.profile.businessName) + ' ' + (user.profile.lastName || '')+ user.meta.customerId}.svg`} alt="pic"/>
                                    <div>
                                        <div className="heading"><b>{(user.profile.firstName || user.profile.businessName) + ' ' + (user.profile.lastName || '')}</b></div>
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
                                <div> <img src={asset('icons', 'prev.svg')} alt="dashboard"/> </div>
                                <div><Link to={paths.DASHBOARD}>Dashboard</Link></div>
                         </div>
                         <div className="notif-option">
                                <div> <img src={asset('icons', 'download-file.svg')} alt="Marketting permissions"/> </div>
                                <div><Link to={paths.MARKETING_PERMISSION}>Marketing permissions</Link></div>
                         </div>
                         <div className="notif-option">
                                <div> <img src={asset('icons', 'settings.svg')} alt="settings"/> </div>
                                <div>Settings</div>
                         </div>
                         <div className="notif-option">
                                <div> <img src={asset('icons', 'referral.png')} alt="referrals"/> </div>
                                <div><Link to={paths.REFERRALS}>Referrals</Link></div>
                         </div>
                         <hr/>
                         <div className="notif-option sign-out-option" onClick={() => signOutAction()}>
                                <div> <img src={asset('icons', 'logout.svg')} alt="signout"/> </div>
                                <div><b>Sign out</b></div>
                         </div>
                    </div> }
                </span>
                <span className="arrow-down">
                    <img src={asset('icons', 'angle-down.svg')} alt="arrow down" onClick={()=>handleDropdownClick('profile')}/>
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
