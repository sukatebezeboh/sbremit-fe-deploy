import React from 'react'
import {useHistory} from 'react-router-dom';
import {NewAuthLayout, RememberPassword, AuthButton} from '../../modules/new-auth-layout/NewAuthLayout'

const PasswordResetComplete = () => {
  const history = useHistory();
  return (
    <NewAuthLayout
      image="lock"
      header='Password reset'
      detail='Your password has been successfully reset, click the button below to sign in'
    >
      <AuthButton text='Continue to Sign in' onClick={() => history.push('/sign-in')} />
      <RememberPassword />
    </NewAuthLayout>
  )
}

export default PasswordResetComplete;
