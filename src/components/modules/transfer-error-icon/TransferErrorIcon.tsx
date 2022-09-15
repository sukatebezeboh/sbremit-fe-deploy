import React from 'react'
import { asset } from '../../../util/util'

const TransferErrorIcon = () => {
  return (
    <img width="25%" style={{minWidth: '50px'}} src={asset('icons', 'crossed.svg')} alt="Transfer Error" />
  )
}

export default TransferErrorIcon
