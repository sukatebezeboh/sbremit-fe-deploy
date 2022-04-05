import React, { useEffect } from 'react'
import { generateRandomString } from '../../../util/util'
import { ITable } from './ITable'
import styled from 'styled-components'

const StyledTable = styled.table`
    border: 1px solid grey;
    width: 100%;
    th, td {
        /* border: 5px double grey; */
        /* padding: 5px; */
    }
`
const Table = ({headings, rows, name = generateRandomString(), config = {} }: ITable) => {

    return (
        <StyledTable className={config.customClassName} cellPadding={config.cellPadding} cellSpacing={config.cellSpacing}>
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
                                    {
                                        cell.content
                                    }
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