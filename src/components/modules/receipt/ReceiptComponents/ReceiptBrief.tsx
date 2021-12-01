import React from 'react'
import { useSelector } from 'react-redux'

const Brief = ({data, recipient}: {data?: any, recipient?: any}) => {
    const user = useSelector((state: any) => state.auth.user)
    return (
        <div className="receiptBriefComponent">
            <div className="transaction">
                <p><b>Transaction</b></p>
                <p> <span>Transaction: </span>  <b>{data?.meta?.transactionId || ""}</b></p>
                {/* <p> <span>Funded</span> <b>-</b></p>
                <p> <span>Paid out</span> <b>-</b></p> */}
                <p> <span>Membership number: </span> <b> {user.meta.customerId} </b></p>
            </div>
            <div className="sender">
                <p className="bold">Sender Details</p>
                <p>{`${recipient?.firstName || ""} ${recipient?.lastName || ""} `}</p>
                <p className="address"></p>
            </div>
        </div>
    )
}

export default Brief
