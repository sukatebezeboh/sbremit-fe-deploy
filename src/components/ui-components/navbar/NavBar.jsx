import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import { asset } from '../../../util/util';
import style from './NavBar.css';

const Bar = style();

const NavBar = () => {
    const notifs = [{name: 'foo'}, {name: 'bar'}, {name: 'doe'}, {}, {}];
    const [showNotifDropdown, setShowNotifDropdown] = useState(false);
    const [showProfileDropdown, setShowProfileDropdown] = useState(false)

    const handleDropdownClick = (type) => {
        if (type === 'notif') {
            setShowNotifDropdown(prev=>!prev);
            setShowProfileDropdown(false);
        }
        else if (type === 'profile'){
            setShowNotifDropdown(false);
            setShowProfileDropdown(prev=>!prev);
        }
    }

    return (
        <Bar>
            <div>
                <span className="hamburger">
                <span></span>
                <span></span>
                <span></span>
                </span> 
                <span className="logo">
                    <img src="./assets/main-logo.svg" alt="logo"/>
                </span>
            </div>
            
            <div>
                <span className="notif">
                    <img src="./assets/icons/bell.svg" alt="notifications" onClick={()=>handleDropdownClick('notif')} />
                    <span></span>
                     {showNotifDropdown && <div className="dropdown notif-dropdown">
                         <div className="notif-head">Notifications</div>
                         <hr/>
                        <div>
                            {notifs.map(notif => (
                                <div className="notif-body">
                                    <img src="./assets/images/noimage.png" alt="pic"/>
                                    <div>
                                        <div>You transferred £150.00 to <b>David Lee</b></div>
                                        <div>4 min ago</div>
                                    </div>
                                </div>
                            ))}
                         </div>
                         <hr/>
                         <div className="notif-more">View all notifications </div>
                    </div> }
                </span> 
                <span className="pic">
                    <img src="./assets/images/noimage.png" alt="pic" onClick={()=>handleDropdownClick('profile')}/>
                </span>
                <span className="name" onClick={()=>handleDropdownClick('profile')}>
                    <span>Bunmi</span>
                    {showProfileDropdown && <div className="dropdown profile-dropdown">
                            <div>
                                <div className="notif-body">
                                    <img src="./assets/images/noimage.png" alt="pic"/>
                                    <div>
                                        <div className="heading"><b>Tomiwa</b></div>
                                        <div>Membership number SBR899065</div>
                                    </div>
                                </div>
                            </div>
                         <hr/>
                         <div className="notif-option">
                                <div> <img src={asset('icons', 'user.svg')} alt="user icon"/> </div>
                                <div><Link to="/profile">View Profile</Link></div>
                         </div>
                         <div className="notif-option">
                                <div> <img src={asset('icons', 'settings.svg')} alt="settings"/> </div>
                                <div>Settings</div>
                         </div>
                         <hr/>
                         <div className="notif-option">
                                <div> <img src={asset('icons', 'logout.svg')} alt="signout"/> </div>
                                <div><b>Sign out</b></div>
                         </div>
                    </div> }
                </span>
                <span className="arrow-down">
                    <img src="./assets/icons/angle-down.svg" alt="arrow down" onClick={()=>handleDropdownClick('profile')}/>
                </span>
            </div>
        </Bar>
    )
}

export default NavBar;
