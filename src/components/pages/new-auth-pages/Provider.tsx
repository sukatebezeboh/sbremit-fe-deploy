import { ThemeProvider } from "styled-components";
import AuthProvider from "./AuthProvider";
import { theme } from "./theme";

const Provider = ({ children }: { children: JSX.Element }) => {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </AuthProvider>
  );
};

export default Provider;
