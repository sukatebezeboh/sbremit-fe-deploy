import React, { RefObject } from 'react'
import styled from 'styled-components'
import ReceiptHeader from './ReceiptComponents/ReceiptHeader';
import ReceiptBrief from './ReceiptComponents/ReceiptBrief';
import {ReceiptOverview, ReceiptDetails} from './ReceiptComponents/ReceiptMore';
import {ReceiptBottom} from './ReceiptComponents/ReceiptBottom';

export const ReceiptStyle = styled.div`
  word-wrap: break-word;
  background-color: white;
  width: 1400px;
  display: block;
  margin: auto;

  .receiptHeaderComponent{
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 210px;
    padding: 0 80px;
    img{
        height: 70px;
        }
    p{
        font-size: 40px;
        font-weight: bold;
    }
  }
  .receiptBriefComponent{
    display: grid;
    grid-template-columns: 1fr 1fr;
    /* justify-content: space-between; */
    width: 100%;
    background-color: #f5f7f7;
    /* padding: 50px 80px; */
    /* @media(max-width: 767px){
        padding: 50px 20px;
    } */
    .transaction {
        margin: 20px 0px 50px 80px;
    }
    .sender {
        margin: 20px 160px 50px 0px;
    }
    .transaction, .sender{
        p{
            font-size: 20px;
        }
    }
    .sender{
        p{
            text-align: end;
        }
        p.address{
            width: 250px;
            line-height: 30px;
        }
    }
  }
  .receiptMoreComponent{
    margin: 80px 80px 0;
    /* @media(max-width: 767px){
        padding: 80px 20px;
    } */
    p.title{
        display: block;
        font-size: 20px;
        width: 100%;
        border-bottom: thin solid lightgrey;
    }
    .body{
        width: 100%;
        display: grid;
        grid-template-columns: 1.5fr 1fr;
        .section{
            width: 50%;
            .unit{
                margin: 40px 0 0;
                p {
                    white-space: nowrap;
                }
                p:first-child{
                    font-size: 20px;
                    color: #707070;
                }
                p:nth-child(2){
                    font-size: 20px;
                    color: #000000;
                }
                p:nth-child(3){
                    font-size: 20px;
                    line-height: 0;
                    color: #000000;
                    background-color: yellow;
                }
                &:first-of-type{
                    margin: 0;
                }
            }
        }
    }
  }
  .receiptBottomComponent{
    padding: 50px 80px;
    margin: 100px 0;
    background-color: #f5f7f7;
    /* @media(max-width: 767px){
        padding: 50px 20px;
    } */
    p{
        font-size: 20px;
        color: #000000;
        a{
            margin-left: 25px;
        }
    }
  }
`;

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
