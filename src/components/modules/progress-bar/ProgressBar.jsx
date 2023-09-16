import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { paths } from '../../../util/paths'

const Div = styled.div`
        margin-top: 110px;
        .timeline {
            background: #007B5D 0% 0% no-repeat padding-box;
            box-shadow: 0px 2px 4px #CCCCCC80;
            padding: 50px 6%;
            margin-bottom: 50px;
            .bar {
                height: 8px;
                width: 75%;
                border-radius: 15px;
                background: #3f896f;
                display: grid;
                grid-template-columns: 1fr 1fr 1fr 0.1fr;
                padding: 0px;
                margin: auto;
                .point {
                    background: #fff;
                    width: 4px;
                    height: 4px;
                    border-radius: 15px;
                    margin: 2px;
                }
                .point-1 {
                    width: 43px;
                    height: 4px;
                }
                .progressed {
                    width: 100%;
                    height: 6px;
                    border-top-right-radius: 0px;
                    border-bottom-right-radius: 0px;
                }
                .progressing {
                    width: 100%;
                    height: 6px;
                    border-top-left-radius: 0px;
                    border-bottom-left-radius: 0px;
                }
            }
            .point-labels {
                display: grid;
                grid-template-columns: 1fr 1fr 1fr 0.1fr;
                margin: 0px auto;
                margin-top: 20px;
                width: 76%;
                >div {
                    text-align: left;
                    div:first-child {
                        font: normal normal normal 16px/16px Montserrat;
                        color: #FFFFFF;
                        margin-left: -25px;
                    }
                }
            }
        }
@media only screen and (max-width: 900px) {
    margin-top: 60px;
    .timeline {
        margin-bottom: 0px;
        padding: 20px 6%;
        .bar {
            width: 100% ;
            height: 4px;
            .point {
                height: 3px;
                margin: 1px;
            }
            .point-1 {
                /* width: 23px; */
            }
        }
        .point-labels {
            width: 105%;
            opacity: 0.8;
            margin-top: 10px;
            >div {
                >div {
                    font: normal normal normal 8px Montserrat!important;
                }
            }
            .label-1 {
                padding-left: 10%;
            }
        }
    }
}

`

const ProgressBar = (props) => {
    const {point} = props
    return (
        <Div>
            <div className="timeline">
                    <div className="bar">
                        <div className={`point point-1 ${point == 1 ? "progressing" : (point > 1 ? 'progressed': '')}`}></div>
                        <div className={`point point-2 ${point == 2 ? "progressing" : (point > 2 ? 'progressing progressed': '')}`}></div>
                        <div className={`point point-3 ${point == 3 ? "progressing" : (point > 3 ? 'progressing progressed': '')}`}></div>
                        <div className={`point point-4 ${point == 4 ? "progressing" : (point > 4 ? 'progressed': '')}`}></div>
                    </div>
                    <div className="point-labels">
                        <div className="label-1"> <div><Link to={paths.GET_QUOTE}>Get quote</Link></div></div>
                        <div className="label-2"> <div><Link to={point >=2 ? paths.RECIPIENT : "#"}>Recipient</Link></div></div>
                        <div className="label-3"> <div><Link to={point >=3 ? paths.REVIEW : "#"}>Review </Link></div></div>
                        <div className="label-4"> <div><Link to={point >=4 ? paths.PAYMENT_METHOD : "#"}>Pay</Link></div></div>
                    </div>
                </div>
        </Div>
    )
}

export default ProgressBar;
