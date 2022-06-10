import { TableCell } from "components/modules/table/ITable"
import ComparisonCheckmark from "./parts/ComparisonCheckmark"
import CheapestBtn from "./parts/CheapestBtn"
import React, { createElement, useState } from "react"
import { asset, getValueFromArray, scrollTo } from "../../../util/util"
import XComparisonTextStack from "./parts/XComparisonTextStack"
import { constants } from "util/constants"


export const featureCompareTableData: {heading: TableCell[][], rows: TableCell[][]} = {
    heading: [
        [
            {
                content: ' '
            },
            {
                content: ' '
            },
            {
                content: 'Delivery Options',
                colSpan: 5
            }
        ],
        [
            {},
            {
                content: 'No Transfer Fee'
            },
            {
                content: 'Mobile Money'
            },
            {
                content: 'Bank Transfer'
            },
            {
                content: 'Cash Pickup'
            },
            {
                content: 'Cardless Withdrawal'
            },
            {
                content: 'Mobile Top-Up'
            }
        ]
    ],
    rows: [
        [
            {
                content:  <img className="sbremit-logo" src={asset('', 'main-logo.svg')} alt="sbremit" />,
                className: 'sbremit'
            },
            {
                content: <ComparisonCheckmark checked={true} />,
                className: 'sbremit'
            },
            {
                content: <ComparisonCheckmark checked={true} />,
                className: 'sbremit'

            },
            {
                content: <ComparisonCheckmark checked={true} />,
                className: 'sbremit'

            },
            {
                content: <ComparisonCheckmark checked={true} />,
                className: 'sbremit'

            },
            {
                content: <ComparisonCheckmark checked={true} />,
                className: 'sbremit'

            },
            {
                content: <ComparisonCheckmark checked={true} />,
                className: 'sbremit'

            }
        ],
        [
            {
                content: <img src={asset('logos', 'western-union.png')} alt="western-union" />
            },
            {
                content: <ComparisonCheckmark checked={true} />
            },
            {
                content: <ComparisonCheckmark checked={true} />
            },
            {
                content: <ComparisonCheckmark checked={false} />
            },
            {
                content: <ComparisonCheckmark checked={true} />
            },
            {
                content: <ComparisonCheckmark checked={false} />
            },
            {
                content: <ComparisonCheckmark checked={false} />
            }
        ],
        [
            {
                content: <img src={asset('logos', 'money-gram.png')} alt="money-gram" />
            },
            {
                content: <ComparisonCheckmark checked={false} />
            },
            {
                content: <ComparisonCheckmark checked={true} />
            },
            {
                content: <ComparisonCheckmark checked={true} />
            },
            {
                content: <ComparisonCheckmark checked={true} />
            },
            {
                content: <ComparisonCheckmark checked={false} />
            },
            {
                content: <ComparisonCheckmark checked={false} />
            }
        ],
        [
            {
                content: <img src={asset('logos', 'world-remit.png')} alt="world-remit" />
            },
            {
                content: <ComparisonCheckmark checked={false} />
            },
            {
                content: <ComparisonCheckmark checked={true} />
            },
            {
                content: <ComparisonCheckmark checked={true} />
            },
            {
                content: <ComparisonCheckmark checked={true} />
            },
            {
                content: <ComparisonCheckmark checked={false} />
            },
            {
                content: <ComparisonCheckmark checked={true} />
            }
        ],
        [
            {
                content: <img src={asset('logos', 'ria.png')} alt="ria" />
            },
            {
                content: <ComparisonCheckmark checked={false} />
            },
            {
                content: <ComparisonCheckmark checked={false} />
            },
            {
                content: <ComparisonCheckmark checked={true} />
            },
            {
                content: <ComparisonCheckmark checked={true} />
            },
            {
                content: <ComparisonCheckmark checked={false} />
            },
            {
                content: <ComparisonCheckmark checked={false} />
            }
        ],
        [
            {
                content: <img src={asset('logos', 'paysend.png')} alt="paysend" />
            },
            {
                content: <ComparisonCheckmark checked={false} />
            },
            {
                content: <ComparisonCheckmark checked={false} />
            },
            {
                content: <ComparisonCheckmark checked={true} />
            },
            {
                content: <ComparisonCheckmark checked={false} />
            },
            {
                content: <ComparisonCheckmark checked={false} />
            },
            {
                content: <ComparisonCheckmark checked={false} />
            }
        ],
        [
            {
                content: <img src={asset('logos', 'taptap.png')} alt="taptap" />
            },
            {
                content: <ComparisonCheckmark checked={false} />
            },
            {
                content: <ComparisonCheckmark checked={true} />
            },
            {
                content: <ComparisonCheckmark checked={false} />
            },
            {
                content: <ComparisonCheckmark checked={false} />
            },
            {
                content: <ComparisonCheckmark checked={false} />
            },
            {
                content: <ComparisonCheckmark checked={false} />
            }
        ],
        [
            {
                content: <img src={asset('logos', 'sendwave.png')} alt="sendwave" />
            },
            {
                content: <ComparisonCheckmark checked={true} />
            },
            {
                content: <ComparisonCheckmark checked={true} />
            },
            {
                content: <ComparisonCheckmark checked={false} />
            },
            {
                content: <ComparisonCheckmark checked={false} />
            },
            {
                content: <ComparisonCheckmark checked={false} />
            },
            {
                content: <ComparisonCheckmark checked={false} />
            }
        ],
        [
            {
                content: <img src={asset('logos', 'remitly.png')} alt="remitly" />
            },
            {
                content: <ComparisonCheckmark checked={false} />
            },
            {
                content: <ComparisonCheckmark checked={true} />
            },
            {
                content: <ComparisonCheckmark checked={true} />
            },
            {
                content: <ComparisonCheckmark checked={true} />
            },
            {
                content: <ComparisonCheckmark checked={false} />
            },
            {
                content: <ComparisonCheckmark checked={false} />
            }
        ],
    ]
}

export const supportedCountriesListing = [
    {
        name: "Cameroon",
        flag: 'CM.png',
        active: true
    },
    {
        name: "Chad",
        flag: 'TD.png',
        active: false
    },
    {
        name: "Gabon",
        flag: 'GA.png',
        active: false
    },
    {
        name: "Equitorial Guinea",
        flag: 'GQ.png',
        active: false
    },
    {
        name: "Uganda",
        flag: 'UG.png',
        active: false
    },
    {
        name: "Tanzania",
        flag: 'TZ.png',
        active: false
    },
    {
        name: "Kenya",
        flag: 'KE.png',
        active: false
    },
    {
        name: "Nigeria",
        flag: "NG.png",
        active: false
    },
    {
        name: "Ghana",
        flag: "GH.png",
        active: false
    },
    {
        name: "Senegal",
        flag: "SN.png",
        active: false
    },
    {
        name: "Gambia",
        flag: "GM.png",
        active: false
    },
    {
        name: "Sierra Leone",
        flag: "SL.png",
        active: false
    },
    {
        name: "Liberia",
        flag: "LR.png",
        active: false
    },
]


const getFromRateData = (ratesData: any, competitor: string, returnKey: string) => {
    const value = getValueFromArray( competitor, 'name', ratesData, returnKey );
    if (value && typeof value !== 'object') {
        return value
    }

    return typeof value !== 'object' ? false : '-'
}


export const getExchangeRateTableData = (ratesData: any): {heading: TableCell[][], rows: TableCell[][]}  => {
    return {
        heading: [
            [
                {
                    content: 'Provider'
                },
                {
                    content: XComparisonTextStack({content1: 'Exchange rate', content2: <div> (1 {constants.COMPETITOR_RATES_BASE_CURRENCY} <img src={asset('icons', 'white-arrow.svg')} alt="->" className="mobile-hide" /> <img src={asset('icons', 'green-round-arrow.svg')} alt="->" className="desktop-hide" /> {constants.COMPETITOR_RATES_TARGET_CURRENCY}  ) </div>, className: 'w-fit mx-auto text-align-left' })
                },
                {
                    content: XComparisonTextStack({ content1: <div className="mx-auto"> Rate compared to SB Remit </div> , content2: '', className: 'text-align-left' })
                },
                {
                    content: XComparisonTextStack({content1: 'Transfer fee', className: 'text-align-center'})
                },

            ]
        ],
        rows: [
            [
                {
                    content:  <img className="sbremit-logo" src={asset('', 'main-logo.svg')} alt="sbremit" />,
                    className: 'sbremit'
                },
                {
                    content: XComparisonTextStack({ content1: getFromRateData(ratesData, 'sbremit', 'rate'), content2: <CheapestBtn isCheapest={getFromRateData(ratesData, 'sbremit', 'isCheapest')} />, status: 'success', format: 'rate', className: 'text-align-center green-txt bold' }),
                    className: 'sbremit'
                },
                {
                    content: XComparisonTextStack({ content1: <button onClick={() => scrollTo('#hero')} className="table-send-btn is-link mx-auto">Start sending money</button> , status: 'neutral', format: 'none', className: 'text-align-left' }),
                    className: 'sbremit'
                },
                {
                    content: XComparisonTextStack({ content1: getFromRateData(ratesData, 'sbremit', 'transferFee'), content2: '', status: 'neutral', format: 'rate', className: 'text-align-center green-txt bold' }),
                    className: 'sbremit'
                }
            ],
            [
                {
                    content: <img src={asset('logos', 'western-union.png')} alt="western-union" />
                },
                {
                    content: XComparisonTextStack({ content1: getFromRateData(ratesData, 'westernunion', 'rate'), content2: <CheapestBtn isCheapest={getFromRateData(ratesData, 'westernunion', 'isCheapest')} /> , status: 'success', format: 'rate' })
                },
                {
                    content: XComparisonTextStack({ content1: '', content2: getFromRateData(ratesData, 'westernunion', 'rateDifference'), status: `${getFromRateData(ratesData, 'westernunion', 'rateDifference') >= 0 ? 'success' : 'danger'}`, format: 'received' })
                },
                {
                    content: XComparisonTextStack({ content1: getFromRateData(ratesData, 'westernunion', 'transferFee'), content2: '', status: 'neutral', format: 'rate' })
                }
            ],
            [
                {
                    content: <img src={asset('logos', 'money-gram.png')} alt="money-gram" />
                },
                {
                    content: XComparisonTextStack({ content1: getFromRateData(ratesData, 'moneygram', 'rate'), content2: <CheapestBtn isCheapest={getFromRateData(ratesData, 'moneygram', 'isCheapest')} /> , status: 'success', format: 'rate' })
                },
                {
                    content: XComparisonTextStack({ content1: '', content2: getFromRateData(ratesData, 'moneygram', 'rateDifference'), status: `${getFromRateData(ratesData, 'moneygram', 'rateDifference') >= 0 ? 'success' : 'danger'}`, format: 'received' })
                },
                {
                    content: XComparisonTextStack({ content1: getFromRateData(ratesData, 'moneygram', 'transferFee'), content2: '', status: 'neutral', format: 'rate' })
                }
            ],
            [
                {
                    content: <img src={asset('logos', 'world-remit.png')} alt="world-remit" />
                },
                {
                    content: XComparisonTextStack({ content1: getFromRateData(ratesData, 'worldremit', 'rate'), content2: <CheapestBtn isCheapest={getFromRateData(ratesData, 'worldremit', 'isCheapest')} /> , status: 'success', format: 'rate' })
                },
                {
                    content: XComparisonTextStack({ content1: '', content2: getFromRateData(ratesData, 'worldremit', 'rateDifference'), status: `${getFromRateData(ratesData, 'worldremit', 'rateDifference') >= 0 ? 'success' : 'danger'}`, format: 'received' })
                },
                {
                    content: XComparisonTextStack({ content1: getFromRateData(ratesData, 'worldremit', 'transferFee'), content2: '', status: 'neutral', format: 'rate' })
                }
            ],
            [
                {
                    content: <img src={asset('logos', 'ria.png')} alt="ria" />
                },
                {
                    content: XComparisonTextStack({ content1: getFromRateData(ratesData, 'ria', 'rate'), content2: <CheapestBtn isCheapest={getFromRateData(ratesData, 'ria', 'isCheapest')} /> , status: 'danger', format: 'rate' })
                },
                {
                    content: XComparisonTextStack({ content1: '', content2: getFromRateData(ratesData, 'ria', 'rateDifference'), status: `${getFromRateData(ratesData, 'ria', 'rateDifference') >= 0 ? 'success' : 'danger'}`, format: 'received' })
                },
                {
                    content: XComparisonTextStack({ content1: getFromRateData(ratesData, 'ria', 'transferFee'), status: 'neutral', format: 'rate' })
                }
            ],
            [
                {
                    content: <img src={asset('logos', 'paysend.png')} alt="paysend" />
                },
                {
                    content: XComparisonTextStack({ content1: getFromRateData(ratesData, 'paysend', 'rate'), content2: <CheapestBtn isCheapest={getFromRateData(ratesData, 'paysend', 'isCheapest')} /> , status: 'danger', format: 'rate' })
                },
                {
                    content: XComparisonTextStack({ content1: '', content2: getFromRateData(ratesData, 'paysend', 'rateDifference'), status: `${getFromRateData(ratesData, 'paysend', 'rateDifference') >= 0 ? 'success' : 'danger'}`, format: 'received' })
                },
                {
                    content: XComparisonTextStack({ content1: getFromRateData(ratesData, 'paysend', 'transferFee'), status: 'neutral', format: 'rate' })
                }
            ],
            [
                {
                    content: <img src={asset('logos', 'taptap.png')} alt="taptap" />
                },
                {
                    content: XComparisonTextStack({ content1: getFromRateData(ratesData, 'taptap', 'rate'), content2: <CheapestBtn isCheapest={getFromRateData(ratesData, 'taptap', 'isCheapest')} /> , status: 'danger', format: 'rate' })
                },
                {
                    content: XComparisonTextStack({ content1: '', content2: getFromRateData(ratesData, 'taptap', 'rateDifference'), status: `${getFromRateData(ratesData, 'taptap', 'rateDifference') >= 0 ? 'success' : 'danger'}`, format: 'received' })
                },
                {
                    content: XComparisonTextStack({ content1: getFromRateData(ratesData, 'taptap', 'transferFee'), status: 'neutral', format: 'rate' })
                }
            ],
            [
                {
                    content: <img src={asset('logos', 'sendwave.png')} alt="sendwave" />
                },
                {
                    content: XComparisonTextStack({ content1: getFromRateData(ratesData, 'sendwave', 'rate'), content2: <CheapestBtn isCheapest={getFromRateData(ratesData, 'sendwave', 'isCheapest')} /> , status: 'danger', format: 'rate' })
                },
                {
                    content: XComparisonTextStack({ content1: '', content2: getFromRateData(ratesData, 'sendwave', 'rateDifference'), status: `${getFromRateData(ratesData, 'sendwave', 'rateDifference') >= 0 ? 'success' : 'danger'}`, format: 'received' })
                },
                {
                    content: XComparisonTextStack({ content1: getFromRateData(ratesData, 'sendwave', 'transferFee'), status: 'neutral', format: 'rate' })
                }
            ],
            [
                {
                    content: <img src={asset('logos', 'remitly.png')} alt="remitly" />
                },
                {
                    content: XComparisonTextStack({ content1: getFromRateData(ratesData, 'remitly', 'rate'), content2: <CheapestBtn isCheapest={getFromRateData(ratesData, 'remitly', 'isCheapest')} /> , status: 'danger', format: 'rate' })
                },
                {
                    content: XComparisonTextStack({ content1: '', content2: getFromRateData(ratesData, 'remitly', 'rateDifference'), status: `${getFromRateData(ratesData, 'remitly', 'rateDifference') >= 0 ? 'success' : 'danger'}`, format: 'received' })
                },
                {
                    content: XComparisonTextStack({ content1: getFromRateData(ratesData, 'remitly', 'transferFee'), status: 'neutral', format: 'rate' })
                }
            ], 
        ]
    }
}


    

export const slideContents = [
    {
        caption: "HHHHHHHHHHHHHHHHHHHHHHHHHH"
    },
    {
        caption: "HHHHHHHHHHHHHHHHHHHHHHHHHH"
    },
    {
        caption: "HHHHHHHHHHHHHHHHHHHHHHHHHH"
    },
    {
        caption: "HHHHHHHHHHHHHHHHHHHHHHHHHH"
    },
    {
        caption: "HHHHHHHHHHHHHHHHHHHHHHHHHH"
    },
    {
        caption: "HHHHHHHHHHHHHHHHHHHHHHHHHH"
    },
    {
        caption: "HHHHHHHHHHHHHHHHHHHHHHHHHH"
    },
]