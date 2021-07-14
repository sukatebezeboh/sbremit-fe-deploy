import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { confirmAccountEmail } from '../../../redux/actions/actions'
import { paths } from '../../../util/paths';

const ConfirmAccount = () => {
    const history = useHistory();
    useEffect(() => {
        confirmAccountEmail(() => history.push(paths.SIGN_IN))
    }, [])

    return (
        <div style={{height: '130vh'}}>
            <div className="center">

            </div>
        </div>
    )
}

export default ConfirmAccount
