import React, {useState} from 'react'
import styled from 'styled-components';
import {NewAuthLayout, AuthButton} from '../../modules/new-auth-layout/NewAuthLayout'

const SMSCode = () => {

  return (
    <NewAuthLayout
      header='Enter code sent to:'
      detail='+2348166181091'
    >
      <AuthButton text='Continue' onClick={() => {}} />
    </NewAuthLayout>
  )
}

export default SMSCode;
