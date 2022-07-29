import NavBar from 'components/modules/navbar/NavBar'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { fetchUserNotifications, updateUserNotifReadStatus } from 'redux/actions/actions';
import { transfer } from 'redux/reducers/transfer';
import styled from 'styled-components'
import { countriesAndCodes, countriesAndCurrency } from 'util/constants';
import { convertDateString } from '../../../util/util';

const Body = styled.div`

    .page-content {
        .notif-header {
            display: grid;
            grid-template-columns: 1fr auto;
            align-items: center;

            .mark-all-btn button {
                border: none;
                background: #397c5d;
                color: #fff;
                border-radius: 5px;
                font-weight: bold;
                padding: 10px 20px;
                cursor: pointer;
            }
        }
        .notifications {
            .notif-body {
                padding: 10px;
                background-color: white;
                margin: 10px auto;
                border: 1px solid lightgrey;
                .message-container {
                    display: grid;
                    grid-template-columns: 0fr 1fr auto;
                    gap: 10px;
                    .notif-message {
                        font-size: 16px;
                        padding-bottom: 10px;
                        padding-right: 20px;
                    }&.grey-out {color: grey;}
                    .notif-date {
                        font-weight: lighter;
                        font-size: 12px;
                        /* white-space: nowrap; */
                        min-width: 120px;
                    }
                    .btn-container {
                        font-weight: bold;
                        color: #383838;
                        cursor: pointer;
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

    const getAllAltCountryCode = countriesAndCurrency.map((currency: any) => currency.countryCurrency)

    const changeCountryCurencyToCountryName = ( str: any, arr: any ) => {
        const checkString = countriesAndCurrency.filter((currency: any) => currency.countryCurrency === arr.filter((el: any) => str.includes(el))[0])
        const getCountryCurrency= checkString?.[0]?.countryCurrency
        const getCountryName = checkString?.[0]?.name
        return str.replace(getCountryCurrency, getCountryName)
    }

  return (
    <Body>
        <NavBar />

        <div className="page-content">
            <div className="notif-header">
                <div>
                    <h2>Notifications</h2>
                </div>
                <div className="mark-all-btn">
                    <button onClick={() => updateUserNotifReadStatus('*', () => fetchUserNotifications(10))}>Mark all</button>
                </div>
            </div>

            <div className="notifications">
                {
                    notifs?.map((notif: any) => (
                        <div className={`notif-body ${notif.status.toLowerCase() }`}>
                            {/* <img src={`${resources.DICE_BEAR_USER}${user.meta.customerId}.svg`} alt="pic"/> */}
                            <div onClick={() => updateUserNotifReadStatus(notif.id, () => fetchUserNotifications(10))} className={`message-container ${notif.status === 'READ' && 'grey-out'}`}>
                                <div className="notif-date" > {convertDateString(notif.dateCreated)} </div>
                                <div className="notif-message">{notif.type === 'GLOBAL_NEWS' ? changeCountryCurencyToCountryName(notif.meta.message, getAllAltCountryCode) : notif.meta.message}</div>
                                <div className="btn-container">{notif.status === 'UNREAD' && 'Mark as read'}</div>
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