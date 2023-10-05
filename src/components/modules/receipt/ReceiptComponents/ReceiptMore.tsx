import React from "react";
import { constants } from "../../../../util/constants";
import { replaceUnderscores } from "../../../../util/util";

export const ReceiptOverview = ({
  data,
  recipient,
}: {
  data?: any;
  recipient?: any;
}) => {
  return (
    <div className="receiptMoreComponent">
      <p className="title">Transfer Details</p>
      <div className="body">
        <div className="section">
          <div className="unit">
            <p> Total Amount Paid </p>
            <p>{`${data?.originAmount || ""} ${data?.originCurrency || ""}`}</p>
          </div>
          <div className="unit">
            <p>Payout Amount</p>
            <p>{`${data?.destinationAmount || ""} ${
              data?.destinationCurrency || ""
            }`}</p>
          </div>
        </div>
        <div className="section">
          <div className="unit">
            <p>Payout Operator charges</p>
            <p>{`${data?.meta?.serviceFee || ""} ${
              data?.meta?.exchangeBase || ""
            }`}</p>
          </div>
          <div className="unit">
            <p>Exchange rate</p>
            <p>{`1 ${data?.meta?.exchangeBase || ""} = ${
              data?.meta?.exchangeRate || ""
            } ${data?.meta?.exchangeTarget || ""}`}</p>
          </div>
          <div className="unit">
            <p>Payout Method</p>
            <p className="capitalize">
              {replaceUnderscores(data?.transferMethod) || ""}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ReceiptDetails = ({
  data,
  recipient,
}: {
  data?: any;
  recipient?: any;
}) => {
  return (
    <div className="receiptMoreComponent">
      <p className="title">Recipient Details</p>
      <div className="body">
        <div className="section">
          <div className="unit">
            <p>Recipient Name</p>
            <p>{`${recipient?.firstName || ""} ${
              recipient?.lastName || ""
            }`}</p>
          </div>
          {data?.transferMethod === constants.MOBILE_MONEY && (
            <div className="unit">
              <p>Tel No.</p>
              <p>{recipient?.profile?.mobile || ""}</p>
            </div>
          )}
          {data?.transferMethod === constants.BANK_TRANSFER && (
            <div className="unit">
              <p>Bank Account details</p>
              <p>{recipient?.profile?.bankName || ""}</p>
              <p>{recipient?.profile?.accountNumber || ""}</p>
            </div>
          )}
        </div>
        <div className="section">
          <div className="unit">
            <p>Reference</p>
            <p>{recipient?.profile?.reason || ""}</p>
          </div>
          <div className="unit">
            <p>Email</p>
            <p>{recipient?.profile?.email || ""}</p>
          </div>
          <div className="unit">
            <p>Address</p>
            <p>{recipient?.profile?.state || ""}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
