import React, {useState} from 'react'
import { useHistory} from 'react-router-dom';
import { useSelector } from 'react-redux'
import OtpInput from 'react-otp-input';
import { getQueryParam } from '../../../util/util'
import { paths } from 'util/paths';
import { resendActivation } from '../../../redux/actions/actions';
import {NewAuthLayout, RememberPassword, AuthButton} from '../../modules/new-auth-layout/NewAuthLayout'
import { StyledArea, StyledText } from './AccountConfirmationSmsCode.css';

const AccountConfirmationSMSCode = () => {
  const phone = getQueryParam('phone')
  const history = useHistory();
  const [OTP, setOTP] = useState('');
  const isSubmitting = useSelector((state: any) => state.submitting)

  // const handleSendLink = (phone: string) => history.push(`${paths.SMS_CODE_SENT}?phone=${phone}`)
  
  const toConfirmAccount = () => {
      if(OTP.length === 6) {
        history.push(`${paths.CONFIRM_ACCOUNT}?token=${OTP}&ret=${paths.CONFIRM_ACCOUNT_SMS}&phone=${encodeURIComponent(getQueryParam('phone'))}`)
      }
  }

  // const resendCode = () => resetPasswordAction({username: phone, type: 'sms'}, "email", handleSendLink)
  return (
    <NewAuthLayout
      header='Enter code sent to:'
      image='phone'
      detail={phone}
      marginBottomOff
    >
      <StyledArea>
        {/* <Link to={paths.PASSWORD_SMS_RESET}>Change this number</Link> */}
        <p>Enter code</p>
      </StyledArea>
      <OtpInput
        value={OTP}
        onChange={setOTP}
        numInputs={6}
        inputStyle={{width: '70px', maxWidth: '12vw', margin: '0 5px', border: 'none', borderBottom: '2px solid #424242', fontSize: 18}}
        containerStyle={{width: '400px', maxWidth: '80vw', display:'flex', justifyContent: 'center'}}
        focusStyle={{border: 'none'}}
      />
      <AuthButton text='Submit code' marginBottomOff isSubmitting={isSubmitting} onClick={toConfirmAccount} />
      <StyledText>Didn't get the code? <i className='is-link' onClick={() => resendActivation(phone)}>Get it again by SMS</i></StyledText>
      <RememberPassword />
    </NewAuthLayout>
  )
}

export default AccountConfirmationSMSCode;

