import React, { FC } from 'react'
import Div from './FooterStickyBanner.css'

const FooterStickyBanner: FC = ({ children }) => {
  return (
    <Div>
      {children}
    </Div>
  )
}

export default FooterStickyBanner