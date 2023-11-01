import type { DefaultTheme } from "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    color: {
      primary: string;
      black: string;
      dark: string;
      gray: string;
      gray2: string;
      danger: string;
    };
    font: {
      family: {
        primary: string;
      };
      size: {
        xsm: string;
        sm: string;
        base: string;
        lg: string;
        xl: string;
        "2xl": string;
        "3xl": string;
        "4xl": string;
        "5xl": string;
        "6xl": string;
      };
    };
  }
}

export const theme: DefaultTheme = {
  color: {
    primary: "#0D8D70",
    black: "#1E1E1E",
    dark: "#333333",
    gray: "#E5E5E5",
    gray2: "#DADADA",
    danger: "#ff0404",
  },

  font: {
    family: {
      primary: "Inter",
    },
    size: {
      xsm: "12px",
      sm: "14px",
      base: "16px",
      lg: "18px",
      xl: "20px",
      "2xl": "24px",
      "3xl": "28px",
      "4xl": "32px",
      "5xl": "36px",
      "6xl": "48px",
    },
  },
};
