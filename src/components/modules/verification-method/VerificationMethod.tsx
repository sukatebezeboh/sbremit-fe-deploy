import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { constants } from '../../../util/constants';
import { asset } from '../../../util/util';

const Div = styled.div`
        .box{
        box-shadow: 0px 10px 12px #CCCCCC80;
        border-radius: 15px;
        padding-bottom: 25px;
    }
    
    .row {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        padding: 50px 5%;
        .selected, > :hover {
            background: #007b5d!important;
            div{
                color: white!important;
            }
            img {
                filter: invert(0%) sepia(21%) saturate(28%) hue-rotate(346deg) brightness(204%) contrast(97%);
            }
        }
        >div {
            width: 88%;
            min-height: 300px;
            text-align: center;
            background: #FFFFFF 0% 0% no-repeat padding-box;
            border: 2px solid #7FBCAD;
            border-radius: 15px;
            padding: 10px;
            cursor: pointer;
            :hover {
                
            }
            img {
                width: 40%;
                margin: 40px;
            }
            >div {
                :nth-child(2) {
                    font: normal normal 600 20px/24px Montserrat;
                    color: #424242;
                    margin-bottom: 10px;
                }
                :last-child {
                    font: normal normal normal 15px/19px Montserrat;
                    color: #424242;
                }
            }
            
        }
    }
    .footnote {
        text-align: center;
        font: italic normal normal 15px/19px Montserrat;
        color: #424242;
    }
    .btns {
        text-align: right;
        span {
            display: inline-block;
            margin-right: 50px;
            font: normal normal normal 25px/30px Montserrat;
            color: #424242;
            cursor: default;
        }
        button {
            background: #FCD20F 0% 0% no-repeat padding-box;
            border-radius: 8px;
            width: 300px;
            height: 80px;
            text-align: center;
            font: normal normal normal 25px/30px Montserrat;
            color: #424242;
            border: none;
            outline: none;
        }
    }
@media only screen and (max-width: 900px) { 
    .box {
        padding: 5px;
        padding-bottom: 15px;
        .row {
            padding: 15px;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));


            >div {
                min-height: 120px;
                height: 180px;
                @media only screen and (max-width: 490px) { 
                    min-height: 120px;
                    height: 123px;
                }
                padding: 15px;
                margin-bottom: 10px;
                img {
                    margin: 5px;
                    height: 80%;
                }
                div {
                    :nth-child(2) {
                        font: normal normal 600 11px/14px Montserrat;
                    }
                    :last-child {
                        font: normal normal normal 7px Montserrat;
                        margin-top: -8px;
                    }
                }
                
            }
            .pickup {
                position: relative;
                left: 50% ;
            }
        }
    }
    .footnote {
        font: italic normal normal 11px/14px Montserrat;
    }
    .btns {
        margin-top: -30px;
        button {
            width: 100%;
            height: 40px;
            font: normal normal normal 13px/16px Montserrat;
        }
        span {
            font: normal normal normal 13px/16px Montserrat;
            text-align: center;
            display: block;
            margin-right: 0px;
            position: relative;
            top: 70px;
        }
    }
}

`
interface IVerificationMethod {
    setMethod: Function;
    method: String;
}
const VerificationMethod = ({setMethod, method}:IVerificationMethod) => {

    const user = useSelector((state: any) => state?.auth?.user);
    console.log({user})
    const isVerificationSelectionEnabled = false 
    const allowedRegions: any = {
        "IDENTITY" : {
            "allowed": ["gb"],
            "exempted": []
        },
        "DOCUMENT": {
            "allowed": ["all"],
            "exempted": []
        }
    }

    useEffect(() => {
        if (user?.meta?.verified === "retry") {
            setMethod(constants.VERIFICATION_TYPE_DOCUMENT)
            return;
        }

        if (!isUserAllowedThisType(constants.VERIFICATION_TYPE_IDENTITY)) {
            setMethod(constants.VERIFICATION_TYPE_DOCUMENT)
            return;
        }

        setMethod(constants.VERIFICATION_TYPE_IDENTITY)
    }, [])

    const isUserAllowedThisType = (type: string) => {
        if ( allowedRegions?.[type]?.["allowed"].includes(user?.profile?.location_country?.toLowerCase()) || (allowedRegions?.[type]?.["allowed"].includes("all") && !allowedRegions?.[type]?.["exempted"].includes(user?.profile?.location_country?.toLowerCase())) ) {
            return true;
        }
        return false;
    }
    return (
       isVerificationSelectionEnabled ? <Div>
            <div className="box">
                <div className="row">
                    {isUserAllowedThisType(constants.VERIFICATION_TYPE_IDENTITY) && <div className={`${method === constants.VERIFICATION_TYPE_IDENTITY && "selected"}`} onClick={() => setMethod(constants.VERIFICATION_TYPE_IDENTITY)}>
                        <img src={asset('icons', 'identity-verification.png')} alt="mobile money"/>
                        <div>IDENTITY VERIFICATION</div>
                        <div>Complete the verification step by telling us who you are.</div>
                    </div>}
                    {isUserAllowedThisType(constants.VERIFICATION_TYPE_DOCUMENT) &&  <div className={`${method === constants.VERIFICATION_TYPE_DOCUMENT && "selected"}`} onClick={() => setMethod(constants.VERIFICATION_TYPE_DOCUMENT)}>
                        <img src={asset('icons', 'document-verification.png')} alt="bank transfer"/>
                        <div>DOCUMENT VERIFICATION</div>
                        <div>Submit valid identity documents to get verified</div>
                    </div>}
                </div>
                <div className="footnote">Select a preferred verification method and follow the steps</div>
            </div>
        </Div> : <></>
    )
}

export default VerificationMethod
