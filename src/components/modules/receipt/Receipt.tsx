import React from 'react'
import ReceiptHeader from './ReceiptComponents/ReceiptHeader';
import ReceiptBrief from './ReceiptComponents/ReceiptBrief';
import {ReceiptOverview, ReceiptDetails} from './ReceiptComponents/ReceiptMore';
import {ReceiptBottom} from './ReceiptComponents/ReceiptBottom';
import ReceiptStyle from './Receipt.css'

const Receipt = ({data, recipient}: {data: any, recipient: any}) => {
    return (
        <ReceiptStyle>
            <ReceiptHeader />
            <ReceiptBrief data={data} recipient={recipient}/>
            <ReceiptOverview data={data} recipient={recipient}/>
            <ReceiptDetails data={data} recipient={recipient}/>
            <ReceiptBottom />
        </ReceiptStyle>
    )
}

export default Receipt
