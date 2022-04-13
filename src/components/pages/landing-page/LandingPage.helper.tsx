import { TableCell } from "components/modules/table/ITable"
import ComparisonCheckmark from "./parts/ComparisonCheckmark"
import React, { createElement } from "react"
import { asset } from "../../../util/util"
import XComparisonTextStack from "./parts/XComparisonTextStack"
import { Link } from "react-router-dom"

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
                content: 'SB Remit',
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
        name: "Cent. Africa Republic",
        flag: 'CF.png',
        active: false
    },
    {
        name: "Republic of Congo",
        flag: 'CG.png',
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
]

export const exchangeRateTableData: {heading: TableCell[][], rows: TableCell[][]} = {
    heading: [
        [
            {
                content: 'Provider'
            },
            {
                content: XComparisonTextStack({content1: 'Exchange rate', content2: <div> (1 GBP <img src={asset('icons', 'white-arrow.svg')} alt="->" className="mobile-hide" /> <img src={asset('icons', 'green-round-arrow.svg')} alt="->" className="desktop-hide" /> EUR) </div> })
            },
            {
                content: XComparisonTextStack({content1: 'Transfer fee'})
            },
            {
                content: XComparisonTextStack({ content1: 'Recipient gets', content2: <div className="mobile-hide">Sending 200 GBP</div>, className: 'text-align-right' })
            }
        ]
    ],
    rows: [
        [
            {
                content: 'SB Remit'
            },
            {
                content: XComparisonTextStack({ content1: '1.19182', content2: 'Mid-market rate', status: 'success', format: 'rate' })
            },
            {
                content: XComparisonTextStack({ content1: '1.19182', content2: 'Transparent fee', status: 'neutral', format: 'rate' })
            },
            {
                content: XComparisonTextStack({ content1: '1.19182 EUR', content2: <Link to='#hero' className="table-send-btn">Start sending money</Link> , status: 'neutral', format: 'none', className: 'text-align-right' })
            }
        ],
        [
            {
                content: <img src={asset('logos', 'western-union.png')} alt="western-union" />
            },
            {
                content: XComparisonTextStack({ content1: '1.19182', content2: 'Mid-market rate', status: 'success', format: 'rate' })
            },
            {
                content: XComparisonTextStack({ content1: '1.19182', content2: 'Transparent fee', status: 'neutral', format: 'rate' })
            },
            {
                content: XComparisonTextStack({ content1: '1.19182 EUR', content2: '-0.14 EUR', status: 'neutral', format: 'received' })
            }
        ],
        [
            {
                content: <img src={asset('logos', 'money-gram.png')} alt="money-gram" />
            },
            {
                content: XComparisonTextStack({ content1: '1.19182', content2: 'Mid-market rate', status: 'success', format: 'rate' })
            },
            {
                content: XComparisonTextStack({ content1: '1.19182', content2: 'Transparent fee', status: 'neutral', format: 'rate' })
            },
            {
                content: XComparisonTextStack({ content1: '1.19182 EUR', content2: '-0.14 EUR', status: 'neutral', format: 'received' })
            }
        ],
        [
            {
                content: <img src={asset('logos', 'world-remit.png')} alt="world-remit" />
            },
            {
                content: XComparisonTextStack({ content1: '1.19182', content2: 'Mid-market rate', status: 'success', format: 'rate' })
            },
            {
                content: XComparisonTextStack({ content1: '1.19182', content2: 'Transparent fee', status: 'neutral', format: 'rate' })
            },
            {
                content: XComparisonTextStack({ content1: '1.19182 EUR', content2: '-0.14 EUR', status: 'neutral', format: 'received' })
            }
        ],
        [
            {
                content: <img src={asset('logos', 'ria.png')} alt="ria" />
            },
            {
                content: XComparisonTextStack({ content1: '1.19182', status: 'danger', format: 'rate' })
            },
            {
                content: XComparisonTextStack({ content1: '1.19182', status: 'neutral', format: 'rate' })
            },
            {
                content: XComparisonTextStack({ content1: '1.19182 EUR', content2: '-0.14 EUR', status: 'neutral', format: 'received' })
            }
        ],
        [
            {
                content: <img src={asset('logos', 'paysend.png')} alt="paysend" />
            },
            {
                content: XComparisonTextStack({ content1: '1.19182', status: 'danger', format: 'rate' })
            },
            {
                content: XComparisonTextStack({ content1: '1.19182', status: 'neutral', format: 'rate' })
            },
            {
                content: XComparisonTextStack({ content1: '1.19182 EUR', content2: '-0.14 EUR', status: 'neutral', format: 'received' })
            }
        ],
        [
            {
                content: <img src={asset('logos', 'taptap.png')} alt="taptap" />
            },
            {
                content: XComparisonTextStack({ content1: '1.19182', status: 'danger', format: 'rate' })
            },
            {
                content: XComparisonTextStack({ content1: '1.19182', status: 'neutral', format: 'rate' })
            },
            {
                content: XComparisonTextStack({ content1: '1.19182 EUR', content2: '-0.14 EUR', status: 'neutral', format: 'received' })
            }
        ],
        [
            {
                content: <img src={asset('logos', 'sendwave.png')} alt="sendwave" />
            },
            {
                content: XComparisonTextStack({ content1: '1.19182', status: 'danger', format: 'rate' })
            },
            {
                content: XComparisonTextStack({ content1: '1.19182', status: 'neutral', format: 'rate' })
            },
            {
                content: XComparisonTextStack({ content1: '1.19182 EUR', content2: '-0.14 EUR', status: 'neutral', format: 'received' })
            }
        ],
        [
            {
                content: <img src={asset('logos', 'remitly.png')} alt="remitly" />
            },
            {
                content: XComparisonTextStack({ content1: '1.19182', status: 'danger', format: 'rate' })
            },
            {
                content: XComparisonTextStack({ content1: '1.19182', status: 'neutral', format: 'rate' })
            },
            {
                content: XComparisonTextStack({ content1: '1.19182 EUR', content2: '-0.14 EUR', status: 'neutral', format: 'received' })
            }
        ],

    ]
}
