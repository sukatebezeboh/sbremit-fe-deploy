import { ThemeProvider } from "styled-components";
import { theme } from "./theme";

const Provider = ({ children }: { children: JSX.Element }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Provider;
