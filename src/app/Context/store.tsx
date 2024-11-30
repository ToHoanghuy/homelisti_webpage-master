"use client";

import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  ReactNode
} from "react";

interface ContextProps {
  JWT: string;
  SETJWT: Dispatch<SetStateAction<string>>;
  USERNAME: string;
  SETUSERNAME: Dispatch<SetStateAction<string>>;
  PASSWORD: string;
  SETPASSWORD: Dispatch<SetStateAction<string>>;
}

const GlobalContext = createContext<ContextProps>({
  JWT: "",
  SETJWT: (): string => "",
  USERNAME: "",
  SETUSERNAME: (string) => "",
  PASSWORD: "",
  SETPASSWORD: (string) => "",
});

interface GlobalContextProviderProps {
  children: ReactNode;
}

export const GlobalContextProvider: React.FC<GlobalContextProviderProps> = ({ children }) => {
  const [JWT, SETJWT] = useState("");
  const [USERNAME, SETUSERNAME] = useState("");
  const [PASSWORD, SETPASSWORD] = useState("");

  return (
    <GlobalContext.Provider
      value={{ JWT, SETJWT, USERNAME, SETUSERNAME, PASSWORD, SETPASSWORD }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
