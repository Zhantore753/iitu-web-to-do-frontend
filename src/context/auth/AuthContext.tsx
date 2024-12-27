import { createContext } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => void;
  register: (username: string, password: string) => void;
  logout: () => void;
  token: string | null;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: (username: string, password: string) => {
    console.log(
      `Logging in with username: ${username} and password: ${password}`
    );
  },
  register: (username: string, password: string) => {
    console.log(
      `Registering with username: ${username} and password: ${password}`
    );
  },
  logout: () => {},
  token: null,
});

export default AuthContext;
