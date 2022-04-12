import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPromo } from '../../../redux/actions/actions'
import { TRANSFER } from '../../../redux/actionTypes'
import { asset, validatePromo } from '../../../util/util'
import styled from 'styled-components';

const Field = styled.div`
    margin-top: 120px;
    .coupon {
        margin-top: 60px;
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

const PromoCodeField = ({transfer}: any) => {
    const textInput: any = useRef(null);

    const [img, setImg] = useState<null | 'check-mark' | 'crossed' | 'rolling-loader-black'>(null)
    // const transfer = useSelector((state: any) => state.transfer)
    const user = useSelector((state: any) => state.auth.user)
    const promo = transfer.promo
    const dispatch = useDispatch();

    useEffect(() => {
        handleCouponChange(textInput?.current?.value);
        handleCouponChange(textInput?.current?.value);
    }, [transfer?.toSend?.currency])

    const handleCouponChange = async (value: string) => {
        if (!value) return setImg(null);
        setImg('rolling-loader-black');
        const coupon = await getPromo(value);
        const validatedPromo = validatePromo(coupon, user, transfer);
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


    return (
        <Field>
            <div className="coupon">
                <input ref={textInput} id="promo-field" type="text" className="promo-code" name="promo-code" placeholder={promo ? promo.code : "Got a promo code? Get a discount"} onChange={(e) => handleCouponChange(e.target.value)} />
                {img && <img className="check-mark" src={asset('icons', `${img}.svg`)} alt="check" />} { promo &&  <span className='green-txt'> Value <b className="green-txt">: {getPromoValue(promo)} </b>  - (Valid for {promo?.settings?.currenciesValid } currencies) </span>}
            </div>
        </Field>
    )
}

export default PromoCodeField
