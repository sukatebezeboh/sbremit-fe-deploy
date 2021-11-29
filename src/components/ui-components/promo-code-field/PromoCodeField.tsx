import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPromo } from '../../../redux/actions/actions'
import { TRANSFER } from '../../../redux/actionTypes'
import { asset, compareDatesXLessThanY } from '../../../util/util'
import styled from 'styled-components';

const Field = styled.div`
    .coupon {
        margin-top: 100px;
        /* margin-bottom: 10px; */
        input.promo-code {
            border: 1px solid lightgrey;
            height: 40px;
            width: 300px;
            padding: 5px 10px;
            border-radius: 5px;
            box-shadow: 1px 1px 3px lightgrey;
            background: #e8f0fe;
        }
        img.check-mark {
            width: 15px;
            position: relative;
            left: -30px;
            top: 3px;
        }
    }
`

const PromoCodeField = () => {
    const [img, setImg] = useState<null | 'check-mark' | 'crossed' | 'rolling-loader-black'>(null)
    const transfer = useSelector((state: any) => state.transfer)
    const promo = transfer.promo
    const dispatch = useDispatch();

    const handleCouponChange = async (value: string) => {
        if (!value) return setImg(null);
        setImg('rolling-loader-black');
        const coupon = await getPromo(value);
        const validatedPromo = validatePromo(coupon);
        setImg( validatedPromo ? 'check-mark' : 'crossed');

        dispatch({ type: TRANSFER, payload: { ...transfer, promo: validatedPromo } })
    }

    const getPromoValue = (promo: any) => {
        switch (promo.type) {
            case 'PERCENTAGE':
                return promo.settings.percentage + "% Discount"
            case 'FIXED_AMOUNT':
                return promo.settings.discountAmount + ""
            case 'FIXED_RATE':
                return "Fixed Exchange Rate"
            case 'FREE_OPERATOR_FEE':
                return "Free Operator Fee"
            default:
                return ""
        }
    }

    const validatePromo = (promo: any) => {
        const today = new Date()
        const todayInString = (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear()
        const expired = compareDatesXLessThanY( promo?.endDate, todayInString );
        const notDue = compareDatesXLessThanY( todayInString, promo?.startDate );

        return expired ? undefined : (notDue ? undefined : promo);
    }

    return (
        <Field>
            <div className="coupon">
                <input type="text" className="promo-code" name="promo-code" placeholder={promo ? promo.code : "Got a promo code? Get a discount"} onChange={(e) => handleCouponChange(e.target.value)} />
                {img && <img className="check-mark" src={asset('icons', `${img}.svg`)} alt="check" />} { promo &&  <b className="green-txt">: {getPromoValue(promo)} </b>}
            </div>
        </Field>
    )
}

export default PromoCodeField
