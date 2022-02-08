import React from 'react';
import styled from 'styled-components';
import { asset } from '../../../../util/util';

const Theme = styled.div`
    .container {
        position: relative;
        right: 0px;
        float: right;
        padding: 5px 15px;
        background: white;
        text-align: center;
        border-radius: 7px;
        box-shadow: 4px 7px 39px 11px rgba(120,117,117,0.75);
        -webkit-box-shadow: 4px 7px 39px 11px rgba(120,117,117,0.75);
        -moz-box-shadow: 4px 7px 39px 11px rgba(120,117,117,0.75);
        min-width: 400px;
        margin-top: 10px;
        max-width: fit-content;
    }

    .close-icon {
        text-align: center;
        span {
            font-size: 20px;
            width: 30px;
            background: whitesmoke;
            display: block;
            float: right;
            cursor: pointer;
            :hover {
                background: #e0e0e0;
            }
        }
    }
    .icon-image {
        max-width: 50px;
        max-height: 50px;
        margin: 10px auto;
        img {
            width: 100%;
            height: 100%;
        }
    }


    .container-success {
        .title {
            color: #007B5D;
        }
        .message {
            color: #007B5D;
        }
    }

    .container-error {
        .title {
            color: #CF0921;
        }
        .message {
            color: #CF0921;
        }
    }

    .container-warning {
        .title {
            color: #bb7a00;
        }
        .message {
            color: #bb7a00;
        }
    }

    .container-info {
        .title {
            color: cadetblue;
        }
        .message {
            color: cadetblue;
        }
    }

    .title {
        font-size: 18px;
        font-weight: bolder;
    }
    .message {
        font-size: 16px;
        font-weight: light;
        margin: 10px auto;
    }

    .close-btn {
        button {
            border: none;
            padding: 10px 20px;
            margin: 10px auto;
            cursor: pointer;
            :hover {
                box-shadow: 1px 1px 5px 2px lightgray;
            }
        }
    }
`
const ClearMamba: React.FC = ({config}: any) => {


    const icons: any = {
        success: 'checked.png',
        error: 'cancel.svg',
        warning: 'warning.png',
        info: 'info.png'
    }
  return <Theme>
            <div className={`container container-${config?.type} ${config?.show ? 'animate-in': '' } ${((config?.show && config?.readyToClose) ? 'animate-out': '')}`}>
                <div className="close-icon" onClick={config.close}> <span>&times;</span>  </div>
                <div className="icon-image"><img src={asset('icons', icons[config.type])} alt="icon" /></div>
                <div className="title">{config.title}</div>
                <div className="message" dangerouslySetInnerHTML={{__html: config?.message || "Success!"}} ></div>
                <div className="close-btn"> <button onClick={config.close}> {config.closeBtnText || "Close"} </button> {config.extraBtnText && <button className={config.extraBtnClass} onClick={config.extraBtnHandler} >{config.extraBtnText}</button>} </div>
            </div>
        </Theme>;
};

export default ClearMamba;
