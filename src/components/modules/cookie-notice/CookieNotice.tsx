import React, { FC } from 'react'
import { useHistory } from 'react-router-dom'
import { CookieService } from 'services/CookieService'
import { paths } from 'util/paths'
import Div from './CookieNotice.css'

const CookieNotice: FC<{close: Function}> = ({close}) => {
  const history = useHistory()
  return (
    <Div>
      <div className="text-container">
          <div className="text">
            This site uses cookies to deliver its services effectively
          </div>
          <div className="btns">
            <div className="link is-link" onClick={() => history.push(paths.COOKIE_POLICY)}>
              Learn more
            </div>
            <button className="btn is-link" onClick={() => {
              close();
              CookieService.put('cookie-notice', 'cookie-notice', 365)
              }}>
              Ok, got it
            </button>
          </div>
      </div>
    </Div>
  )
}

export default CookieNotice
