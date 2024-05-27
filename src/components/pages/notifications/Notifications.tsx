import NavBar from 'components/modules/navbar/NavBar'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { changeCountryCurrencyToCountryName, fetchUserNotifications, updateUserNotifReadStatus } from 'redux/actions/actions';
import { destinationCountriesAndCurrency } from 'util/constants';
import { convertDateString } from '../../../util/util';
import Body from './Notifications.css'

const Notifications = () => {
    const notifs = useSelector((state: any) => state.notifications)
    const getAllAltCountryCode = destinationCountriesAndCurrency.map((currency: any) => currency.countryCurrency)

    useEffect(() => {
        fetchUserNotifications();
    }, [])

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
                            <div className={`notif-body ${notif.status.toLowerCase()}`}>
                                <div onClick={() => updateUserNotifReadStatus(notif.id, () => fetchUserNotifications(10))} className={`message-container ${notif.status === 'READ' && 'grey-out'}`}>
                                    <div className="notif-date" > {convertDateString(notif.dateCreated)} </div>
                                    <div className="notif-message">{notif.type === 'GLOBAL_NEWS' ? changeCountryCurrencyToCountryName(notif.meta.message, getAllAltCountryCode) : notif.meta.message}</div>
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