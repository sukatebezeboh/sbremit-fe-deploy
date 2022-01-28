import React from 'react'
import themes, { themeNames } from '../themes';

export default function Toast(props: any) {
    const {config} = props;

    const ToastTheme = config.theme || themes[ config.defaultThemeName || themeNames.SLIM_PEAKER ];
    return (
        <ToastTheme {...props} />
    )
}
