import React from 'react'
import styled from 'styled-components'
import { asset } from '../../../../util/util'

const Button = styled.button`
    padding: 5px 10px;
    background: #007B5D;
    border-radius: 5px;
    border: none;
    color: white;
    margin: auto;
    .inner {
        display: flex;
        width: fit-content;
        margin: auto;
        gap: 5px;

        img {
            width: 15px!important;
            margin: 0px!important;
        }
        span {
            /* line-height: 20px; */
            font-size: 13px;
        }
    }
`
const CheapestBtn = ({isCheapest}: any) => {

    return (
    isCheapest && <Button>
        <div className="inner">
            <img src={asset('icons', 'white-checkmark.svg')} alt="" />
            <span>
                Cheapest
            </span>
        </div>

    </Button>
  )
}

export default CheapestBtn