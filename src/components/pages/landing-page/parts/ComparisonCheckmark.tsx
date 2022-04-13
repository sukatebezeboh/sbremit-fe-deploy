import React, { FC } from 'react'
import { asset } from '../../../../util/util'

const ComparisonCheckmark: FC<{checked: boolean}> = ({checked = true}) => {
  return (
     <img src={asset('icons', `${checked ? 'green-checkmark' : 'red-xtimes'}.svg`)} alt={`${checked ? 'yes' : 'no'}`} />
  )
}

export default ComparisonCheckmark
