import React from 'react';
import { asset } from '../../../../../util/util';
import Theme from './ClearMamba.css'

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
