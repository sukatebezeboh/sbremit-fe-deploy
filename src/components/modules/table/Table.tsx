import React, { useEffect } from 'react'
import { generateRandomString } from '../../../util/util'
import { ITable, RESPONSIVE_TYPE_COLLAPSE_ALL } from './ITable'
import styled from 'styled-components'

const StyledTable = styled.table`
    border: 1px solid grey;
    width: 100%;
    th, td {
        /* border: 5px double grey; */
        /* padding: 5px; */
    }

    &.RESPONSIVE_TYPE_COLLAPSE_ALL {
        .inline-heading {
            display: none;
        }
        @media only screen and (max-width: 900px) {
            th {
                display: none;
            }

            td {
                display: flex;
                justify-content: space-between;

                :first-child {
                    .inline-heading {
                        display: none;
                    }
                }
                .inline-heading {
                    white-space: nowrap;
                    font-weight: 600;
                    display: block;
                }
                
                .content-wrapper {
                    text-align: right;
                    width: fit-content;
                    height: fit-content;
                    justify-content: right;
                    * {
                        text-align: right;
                        justify-content: right;
                    }
                }
            }
        }
    }
`
const Table = ({headings, rows, name = generateRandomString(), config = {} }: ITable) => {

    return (
        <StyledTable className={`${config.responsiveType === RESPONSIVE_TYPE_COLLAPSE_ALL ? RESPONSIVE_TYPE_COLLAPSE_ALL : ""} ${config.customClassName}`} cellPadding={config.cellPadding} cellSpacing={config.cellSpacing}>
            {
                headings?.map((heading, i )=> (
                    <tr key={`table-${name}-hd-tr-${i}`}>
                        {
                            heading.map((cell, j) => (
                                <th className={cell.className}  key={`table-${name}-cell-th-${j}`} rowSpan={cell.rowSpan || 1} colSpan={cell.colSpan || 1}>

                                    {
                                        cell.content
                                    }

                                </th>
                            ))
                        }
                    </tr>
                ))
            }
            {
                rows.map((row, i) => (
                    <tr key={`table-${name}-row-tr-${i}`}>
                        {
                            row.map((cell, j) => (
                                <td className={cell.className} key={`table-${name}-cell-td-${j}`} rowSpan={cell.rowSpan || 1} colSpan={cell.colSpan || 1}>
                                    {config.responsiveType === RESPONSIVE_TYPE_COLLAPSE_ALL && <div className="inline-heading">
                                        { headings?.[config.targetHeadingLineForMobileResponsiveness ?? 0]?.[j]?.content }
                                    </div>}
                                    <div className="content-wrapper">
                                        {
                                            cell.content
                                        }                             
                                    </div>

                                </td>
                            ))
                        }
                    </tr>
                ))
            }
        </StyledTable>
    )
}

export default Table