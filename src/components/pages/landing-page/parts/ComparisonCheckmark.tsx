import React, { FC } from 'react'
import { asset } from '../../../../util/util'

const ComparisonCheckmark: FC<{checked: boolean}> = ({checked = true}) => {
  return (
     <img src={asset('icons', `black-${checked ? 'checkmark' : 'xtimes'}.svg`)} alt="yes-no" />
  )
}

export default ComparisonCheckmark