import React, { FC } from 'react'
import styled from 'styled-components'
import { asset } from '../../../../util/util'

const Container = styled.div`
    font-size: 16px;
    line-height: 30px;
    text-align: left;
    width: fit-content;
    min-width: 150px;
    margin: auto;

    &.text-align-right {
      .line-2 {
        text-align: right!important;
        justify-content: right;
      }
    }
    .line {
        &.line-1 {

        }

        &.line-2 {
          display: flex;
          img {
            width: 16px;
            height: 16px;
            margin: 5px 5px 0px;
            display: inline-block;
          }
        }  
        
        .dot {
          display: inline-block;
          width: 11px;
          height: 11px;
          border-radius: 50%;
          &.dot-success {
            background: #1F7560;
          }

          &.dot-danger {
            background: #CF0921;
          }

          &.dot-neutral {
            display: none;
          }
        }
    }

`
interface ITextStack {
  content1: any,
  content2?: any,
  status?: 'success' | 'danger' | 'neutral',
  format?: 'rate' | 'received' | 'none',
  className?: string
}
const XComparisonTextStack: FC<ITextStack> = ({content1, status = 'neutral', content2 = '', format = 'none', className }) => {
  return (
    <Container className={` text-align-center ${className}`}>
        <div className='line line-1'> {content1} </div>
        {content2 &&
            <div className='line line-2'>
              {format === 'received' && <img src={asset('icons', `${ status === 'success' ? 'green-arrow-up.svg' : 'red-arrow-down.svg'}`)} alt="" />}
              {content2}
            </div>
        }
    </Container>
  )
}

export default XComparisonTextStack
