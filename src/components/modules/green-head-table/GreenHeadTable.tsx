import { getExchangeRateTableData } from 'components/pages/landing-page/LandingPage.helper'
import React, { FC } from 'react'
import { RESPONSIVE_TYPE_COLLAPSE_ALL } from '../table/ITable'
import Table from '../table/Table'
import Div from './GreenHeadTable.css'

interface IGreenHeadTable {
    getRows: any,
    getHeadings: any,
}

const GreenHeadTable: FC<IGreenHeadTable> = ({getRows, getHeadings}) => {
  return (
    <Div>
        <div className="table">
            <Table
                rows = {getRows.rows}
                headings={getHeadings.heading}
                config={{
                    customClassName: 'custom-page-table custom-page-green-head-table',
                    cellSpacing: 0,
                    cellPadding: 0,
                    responsiveType: RESPONSIVE_TYPE_COLLAPSE_ALL
                }}
            />
        </div>
    </Div>
  )
}

export default GreenHeadTable