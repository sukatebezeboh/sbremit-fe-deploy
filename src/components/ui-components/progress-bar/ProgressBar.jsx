import React from 'react'
import styled from 'styled-components'

const Div = styled.div`
        margin-top: 110px;
        .timeline {
            background: #007B5D 0% 0% no-repeat padding-box;
            box-shadow: 0px 2px 4px #CCCCCC80;
            padding: 50px 100px;
            margin-bottom: 50px;
            .bar {
                height: 8px;
                width: 75%;
                border-radius: 15px;
                background: #3f896f;
                display: grid;
                grid-template-columns: 1fr 1fr 1fr 1fr 0.1fr;
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
                    height: 6px;
                }
            }
            .point-labels {
                display: grid;
                grid-template-columns: 1fr 1fr 1fr 1fr 0.1fr;
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

`

const ProgressBar = () => {
    return (
        <Div>
            <div className="timeline">
                    <div className="bar">
                        <div className="point point-1"></div>
                        <div className="point point-2"></div>
                        <div className="point point-3"></div>
                        <div className="point point-4"></div>
                        <div className="point point-5"></div>
                    </div>
                    <div className="point-labels">
                        <div className="label-1"> <div>Get quote</div></div>
                        <div className="label-2"> <div>Verification</div> </div>
                        <div className="label-3"> <div>Recipient</div></div>
                        <div className="label-4"> <div>Review</div></div>
                        <div className="label-4"> <div>Pay</div></div>
                    </div>
                </div>
        </Div>
    )
}

export default ProgressBar;
