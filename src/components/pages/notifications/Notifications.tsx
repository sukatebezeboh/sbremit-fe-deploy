import NavBar from 'components/modules/navbar/NavBar'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { fetchUserNotifications } from 'redux/actions/actions';
import styled from 'styled-components'
import { convertDateString } from '../../../util/util';
import { resources } from '../../../util/constants';

const Body = styled.div`

    .page-content {
        .notifications {
            .notif-body {
                padding: 10px;
                background-color: white;
                margin: 10px auto;
                border: 1px solid lightgrey;
                .message-container {
                    display: grid;
                    grid-template-columns: 0fr 1fr;
                    gap: 10px;
                    .notif-message {
                        font-size: 16px;
                        padding-bottom: 10px;
                    }

                    .notif-date {
                        font-weight: lighter;
                        font-size: 12px;
                        /* white-space: nowrap; */
                        min-width: 120px;
                    }                    
                }

            }
        }
    }

`
const Notifications = () => {
    const user = useSelector((state: any) => state.auth.user);
    const notifs = useSelector((state: any) => state.notifications)

    useEffect(() => {
        fetchUserNotifications();
    }, [])

  return (
    <Body>
        <NavBar />

        <div className="page-content">
            <h2>Notifications</h2>


            <div className="notifications">
                {
                    notifs?.map((notif: any) => (
                        <div className={`notif-body ${notif.status.toLowerCase() }`}>
                            {/* <img src={`${resources.DICE_BEAR_USER}${user.meta.customerId}.svg`} alt="pic"/> */}
                            <div className='message-container'>
                                <div className="notif-date" > {convertDateString(notif.dateCreated)} </div>
                                <div className="notif-message"> {notif.meta.message} <b>  </b></div>
                                
                            </div>
                        </div>
                    ))
                }                
            </div>


        </div>
    </Body>
  )
}

export default Notifications