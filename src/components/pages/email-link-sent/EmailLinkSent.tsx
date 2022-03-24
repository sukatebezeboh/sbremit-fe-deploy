import React from 'react'
import {useHistory} from 'react-router-dom';
import { useSelector } from 'react-redux'
import { getQueryParam } from '../../../util/util'
import { paths } from 'util/paths';
import { resetPasswordAction } from '../../../redux/actions/actions';
import {NewAuthLayout, RememberPassword, AuthButton} from '../../modules/new-auth-layout/NewAuthLayout'

const EmailLinkSent = () => {
  const userEmail = getQueryParam('email')
  const history = useHistory();
  const isSubmitting = useSelector((state: any) => state.submitting)
  const handleSendLink = (email: string) => history.push(`${paths.EMAIL_LINK_SENT}?email=${email}`)
  const resendLink = () => {
    resetPasswordAction({username: userEmail, type: 'email'}, "email", handleSendLink)
  }
  return (
    <NewAuthLayout
      header='Check your email'
      image="email"
      detail={`We've sent a password reset link to '${userEmail}'`}
    >
      <AuthButton text='Resend Link' isSubmitting={isSubmitting} onClick={resendLink} />
      <RememberPassword />
    </NewAuthLayout>
  )
}

export default EmailLinkSent;
