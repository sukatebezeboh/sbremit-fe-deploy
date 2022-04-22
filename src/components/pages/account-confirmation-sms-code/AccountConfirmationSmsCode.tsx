import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom';
import { useSelector } from 'react-redux'
import styled from 'styled-components';
import OtpInput from 'react-otp-input';
import { getQueryParam } from '../../../util/util'
import { paths } from 'util/paths';
import { resendActivation, resetPasswordAction } from '../../../redux/actions/actions';
import {NewAuthLayout, RememberPassword, AuthButton} from '../../modules/new-auth-layout/NewAuthLayout'

const AccountConfirmationSMSCode = () => {
  const phone = getQueryParam('phone')
  const history = useHistory();
  const [OTP, setOTP] = useState('');
  const isSubmitting = useSelector((state: any) => state.submitting)

  const handleSendLink = (phone: string) => history.push(`${paths.SMS_CODE_SENT}?phone=${phone}`)
  
  const toConfirmAccount = () => {
      if(OTP.length === 6) {
        history.push(`${paths.CONFIRM_ACCOUNT}?token=${OTP}&ret=${paths.CONFIRM_ACCOUNT_SMS}&phone=${encodeURIComponent(getQueryParam('phone'))}`)
      }
  }

  const resendCode = () => resetPasswordAction({username: phone, type: 'sms'}, "email", handleSendLink)
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

const StyledArea = styled.div`
  /* border: 2px solid red; */
  a{
    color: #007B5D;
    text-decoration: underline;
  }
  p{
    font-size: 24px;
    color: #424242;
    font-weight: medium;
    text-align: center;
  }
`;

const StyledText = styled.p`
  color: #424242;
  font-size: 18px;
  i{
    color: #007B5D;
    font-size: 18px;
    font-style: normal;
  }
`;
