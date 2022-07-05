import React from 'react'
import { Link, Redirect} from 'react-router-dom'
import { useSelector } from 'react-redux'
import styled from 'styled-components';
import SBRemitLogo from '../sbremit-logo/SBRemitLogo'
import ButtonLoader from '../../modules/button-loader/ButtonLoader'
import { asset } from '../../../util/util';
import { paths } from '../../../util/paths';

type newAuthPropType = {
  header: string;
  image?: 'key' | 'email' | 'phone' | 'lock';
  detail: string;
  marginBottomOff?: boolean;
  children: React.ReactNode
}

export const NewAuthLayout = ({header, image, detail, marginBottomOff = false, children}: newAuthPropType) => {
    const isAuthenticated = useSelector(
        (state: any) => state.auth.isAuthenticated,
    )
    return isAuthenticated ? (
        <Redirect to={paths.DASHBOARD} />
      ) : (
        <LayoutStyle marginBottomOff={marginBottomOff}>
            <SBRemitLogo />
            <div className="innercard">
            <div className="imagebox">
              <img  src={asset('newAuth', `${image}.png`)} alt="" />
            </div>
            <h3 className='header'>{header}</h3>
            <p className="detail">{detail}</p>
              {children}
            </div>
        </LayoutStyle>
    )
}

export const AuthButton = ({text, isSubmitting, marginBottomOff = false, onClick}: {text: string; isSubmitting?:boolean; marginBottomOff?: boolean; onClick?: () => void}) => {
    return(
        <ButtonStyle onClick={onClick} marginBottomOff={marginBottomOff}>
            {isSubmitting ? (<ButtonLoader />) : text}
        </ButtonStyle>
    )
}

export const RememberPassword = ({hasText = false}: {hasText?: boolean}) => {
  return(
    <RememberPasswordStyle hasText={hasText}>
      {hasText && <p>Remember Password?</p>}
      <Link to='/sign-in'>
        <img src={asset('newAuth', 'back.png')} alt="" />
        &nbsp; Back to login
      </Link>
    </RememberPasswordStyle>
  )
}

export const FormWrapper = styled.div`
form{
  .input{
    label{
      display: block;
      font-size: 18px;
      color: #424242;
      line-height: 22px;
      margin-bottom: 4px;
    }
    input[type=text], input[type=password]{
      height: 50px;
      width: 400px;
      max-width: 80vw;
      border: 1px solid #007B5D;
      border-radius: 6px;
      padding: 0 16px;
    }
    input[type=text].form-error{
      border: 1px solid red;
    }
    p.form-error-message{
      color: red;
      font-size: 12px;
      text-align: right;
    }
  }
  .space{
    height: 20px;
  }
  button{
      height: 50px;
      width: 400px;
      max-width: 80vw;
      background-color: #FCD20F;
      border: none;
      margin: 20px 0;
      border-radius: 6px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #424242;
      font-size: 18px;
      align-self: center;
  }
}
`;

const LayoutStyle = styled.div<{marginBottomOff: boolean}>`
  min-height: 100vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  div.innercard{
    /* border: 2px solid red; */
    padding: 80px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .imagebox{
      height: 50px;
      width: 50px;
      border-radius: 12px;
      background-color: #E5F1EE;
      display: flex;
      justify-content: center;
      align-items: center;
      img{
        height: 24px;
        width: 24px;
      }
    }
    h3.header{
      text-align: center;
      color: #424242;
      font-size: 28px;
      line-height: 34px;
      margin-bottom: 0;
    }
    p.detail{
      text-align: center;
      color: #424242;
      font-size: 18px;
      line-height: 26px;
      width: 500px;
      max-width: 80vw;
      margin-bottom: ${({marginBottomOff}) => marginBottomOff ? '10px' : '30px'};
    } 
  }
`;

const ButtonStyle = styled.div<{marginBottomOff: boolean}>`
  height: 50px;
  width: 400px;
  max-width: 80vw;
  background-color: #FCD20F;
  margin-top: 40px;
  margin-bottom: ${({marginBottomOff}) => marginBottomOff ? 0 : '40px'};
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #424242;
  font-size: 18px;
  align-self: center;
  cursor: pointer;
`;

const RememberPasswordStyle = styled.div<{hasText: boolean}>`
  border-top: ${({hasText}) => hasText ? '1px solid #424242' : 'none'};
  margin-top: 10px;
  width: 400px;
  max-width: 80vw;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  justify-content: ${({hasText}) => hasText ? 'space-between' : 'center'};
  a{
    display: flex;
    align-items: center;
    justify-content: center;
    img{
        width: 24px;
    }
  }
`;
