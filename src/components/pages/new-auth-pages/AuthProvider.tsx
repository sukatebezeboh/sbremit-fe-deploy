import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface IAuthContext {
  showSuccess: boolean;
  setShowSuccess: Dispatch<SetStateAction<IAuthContext["showSuccess"]>>;
}

const AuthContext = createContext({} as IAuthContext);

const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [showSuccess, setShowSuccess] = useState(false);

  return (
    <AuthContext.Provider value={{ showSuccess, setShowSuccess }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuthContext = () => useContext(AuthContext);
