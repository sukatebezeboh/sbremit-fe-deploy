import React from "react"
import CenterPrompt from "./center-prompt/CenterPrompt"
import ClearMamba from "./clear-mamba/ClearMamba"
import SlimPeaker from "./slim-peaker/SlimPeaker"

interface IToastThemes {
    [x: string]: React.FC
}
const toastThemes: IToastThemes = {
    SLIM_PEAKER: SlimPeaker,
    CLEAR_MAMBA: ClearMamba,
    CENTER_PROMPT: CenterPrompt
}

export const themeNames = {
    SLIM_PEAKER: "SLIM_PEAKER",
    CLEAR_MAMBA: "CLEAR_MAMBA",
    CENTER_PROMPT: "CENTER_PROMPT"
}

export default toastThemes;

