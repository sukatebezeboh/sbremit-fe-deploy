import React from "react"
import { JsxElement } from "typescript"
import ClearMamba from "./ClearMamba"
import SlimPeaker from "./SlimPeaker"

interface IToastThemes {
    [x: string]: React.FC
}
const toastThemes: IToastThemes = {
    SLIM_PEAKER: SlimPeaker,
    CLEAR_MAMBA: ClearMamba
}

export const themeNames = {
    SLIM_PEAKER: "SLIM_PEAKER",
    CLEAR_MAMBA: "CLEAR_MAMBA"
}

export default toastThemes;

