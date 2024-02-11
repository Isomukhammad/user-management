import { JSX, ReactNode, createContext, useContext, useState } from "react";

interface AuthContextProps {
  currentUser: string;
  installUser: (id: string) => void;
  removeUser: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  currentUser: "",
  installUser: (): void => {},
  removeUser: (): void => {},
});

const AuthProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [currentUser, setCurrentUser] = useState<string>(
    sessionStorage.getItem("currentUser") || "",
  );

  const installUser = (id: string): void => {
    sessionStorage.setItem("currentUser", id);
    setCurrentUser(id);
  };

  const removeUser = (): void => {
    sessionStorage.removeItem("currentUser");
    setCurrentUser("");
  };

  return (
    <AuthContext.Provider value={{ currentUser, installUser, removeUser }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export { AuthProvider, useAuth };
