export type TableCell = {
    rowSpan?: number,
    colSpan?: number,
    content?: any,
    className?: string
}

export interface ITable {
    headings?: TableCell[][],
    rows: TableCell[][],
    title?: string,
    name?: string,
    config?: {
        customClassName?: string,
        cellPadding?: number,
        cellSpacing?: number
    }
}
