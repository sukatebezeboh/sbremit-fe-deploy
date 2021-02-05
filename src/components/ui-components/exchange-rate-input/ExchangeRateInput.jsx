import React from 'react';
import styled from 'styled-components';

const Field = styled.div`
        .x-input{
            border: 1.5px solid #7FBCAD;
            border-radius: 8px;
            width: 100%;
            padding: 13px 20px;
            margin-top: 30px;
            display: grid;
            grid-template-columns: 3fr 1fr;
            background: #fff;
            .you-send{
                font: normal normal normal 15px/19px Montserrat;
            }
            >div{
                >input{
                    font: normal normal normal 300 25px/30px Montserrat;
                    width: 90px;
                    border: none;
                    outline: none;
                }
            }
            >div.flg-drp{
                margin: 0px;
                span{
                    display: inline-block;
                }

                >img{
                    box-shadow: 0px 3px 6px #00000029;
                    width: 40px;
                    height: 40px;    
                    border-radius: 50%;   
                    margin: 5px 10px;
                }
                span:nth-child(2){
                    font: normal normal 300 25px/30px Montserrat;
                    color: #424242;
                    margin-right: 23px;
                    margin-top: 8px;
                    text-transform: uppercase;
                }
                span:nth-child(3){
                    font-size: 25px;
                    color: #007B5D;
                    margin-top: 10px;
                    img{
                        height: 17px;
                        width: 23px;
                    }
                }
            }
        }
`

const ExchangeRateInput = (props) =>{
        const {data} = props;

       return (
        <Field>
            <div className="x-input">
                <div className="xi-1">
                    <div className="grey-txt you-send">{data.isSend ? 'You send': 'They get'}</div>
                    <input type="text" value={data.value}/>
                </div>
                <div className="flg-drp">
                    <img src={`./assets/flags/${data.image}.png`} alt={data.currency}/>
                    <span>{data.currency}</span>
                    <span><img src="./assets/icons/angle-down.svg" alt=""/></span>
                </div>
            </div>
        </Field>)
}

export default ExchangeRateInput;
