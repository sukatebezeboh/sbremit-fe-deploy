import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { settings } from '../../../util/settings';
import { convertToJSTimestamp, secondsToHms } from '../../../util/util';

const Div = styled.div`
    .text {
        font-size: 14px!important;
    }
`
const TransferExpiryCountDown = ( {dateCreated} : { dateCreated: number }) => {

    const [timer, setTimer] = useState(0);
    const [timeRemaining, setTimeRemaining ] = useState(1);

    const resolveTimeRemaining = () => {
        const date = convertToJSTimestamp(dateCreated);
        const now = Date.now();
        const timeDifferenceInMilliseconds = now - date;
        const timeDifferenceInSeconds = parseInt((timeDifferenceInMilliseconds / 1000).toFixed(0), 10);
        const transferTimeLimitInSeconds = settings.TRANSFER_TIME_LIMIT_IN_SECONDS
        const timeRemainingInSeconds = transferTimeLimitInSeconds - timeDifferenceInSeconds;
        setTimeRemaining(timeRemainingInSeconds)
    }

    useEffect(() => {
        setInterval(() => {
            setTimer((timer) => ++timer)
        }, 1000)
    }, [])

    useEffect(() => {
        resolveTimeRemaining()
    }, [timer])

    const isExpired = ( time: number ) => {
        return time <= 0
    }


    return (
        <Div>
            {
                isExpired(timeRemaining) ?
                <div className="text red-txt">Expired</div>
                    :
                <div className="text">This transaction expires in <span className="counter green-txt">{secondsToHms(timeRemaining)}</span> s </div>
            }
        </Div>
    )
}

export default TransferExpiryCountDown
