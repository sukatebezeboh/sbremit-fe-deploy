import React from 'react'
import styled from 'styled-components';
import themes, { themeNames } from '../themes';
import SlimPeaker from '../themes/SlimPeaker';

export default function Toast(props: any) {
    const {config} = props;

    const ToastTheme = config.theme || themes[ config.defaultThemeName || themeNames.SLIM_PEAKER ];
    return (
        <ToastTheme {...props} />
    )
}
