import React from 'react'
import { asset } from '../../../../util/util'

const Header = () => {
    return (
        <div className="receiptHeaderComponent">
            <img src={asset('', 'main-logo.svg')} alt="Logo" />
            <p>Transaction Receipt</p>
        </div>
    )
}

export default Header
