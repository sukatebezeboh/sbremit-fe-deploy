import React from 'react'


export const ReceiptOverview = ({data, recipient}: {data?: any, recipient?: any}) => {
    return (
        <div className="receiptMoreComponent">
            <p className="title">Transaction Overview</p>
            <div className="body">
              <div className="section">
                <div className="unit">
                    <p>{`Amount paid by ${recipient?.firstName || ""} ${recipient?.lastName || ""}`}</p>
                    <p>{`${data?.originAmount || ""} ${data?.originCurrency || ""}`}</p>
                </div>
                <div className="unit">
                    <p>Amount sent to recipient</p>
                    <p>{`${data?.originAmount || ""} ${data?.originCurrency || ""}`}</p>
                </div>
                <div className="unit">
                    <p>Converted amount received by recipient</p>
                    <p>{`${data?.destinationAmount || ""} ${data?.destinationCurrency || ""}`}</p>
                </div>
              </div>
              <div className="section">
                <div className="unit">
                  <p>Service Fee</p>
                  <p>{`${data?.meta?.serviceFee || ""} ${data?.meta?.exchangeBase || ""}`}</p>
                </div>
                <div className="unit">
                  <p>Exchange rate</p>
                  <p>{`1 ${data?.meta?.exchangeBase || ""} = ${data?.meta?.exchangeRate || ""} ${data?.meta?.exchangeTarget || ""}`}</p>
                </div>
                <div className="unit">
                  <p>Payment method</p>
                  <p>{data?.transferMethod || ""}</p>
                </div>
              </div>
            </div>
        </div>
    )
}

export const ReceiptDetails = ({data, recipient}: {data?: any, recipient?: any}) => {
  return (
      <div className="receiptMoreComponent">
          <p className="title">Recipient Details</p>
          <div className="body">
          <div className="section">
            <div className="unit">
                <p>Name</p>
                <p>{`${recipient?.firstName  || ""} ${recipient?.lastName  || ""}`}</p>
            </div>
            <div className="unit">
                <p>Mobile</p>
                <p>{recipient?.profile?.mobile  || ""}</p>
            </div>
            <div className="unit">
                <p>Account details</p>
                <p>{recipient?.profile?.bankName  || ""}</p>
                <p>{recipient?.profile?.accountNumber  || ""}</p>
            </div>
          </div>
          <div className="section">
            <div className="unit">
              <p>Reference</p>
              <p>{recipient?.profile?.reason  || ""}</p>
            </div>
            <div className="unit">
              <p>Email</p>
              <p>{recipient?.profile?.email  || ""}</p>
            </div>
            <div className="unit">
              <p>Address</p>
              <p>{recipient?.profile?.state  || ""}</p>
            </div>
          </div>
        </div>
      </div>
  )
}