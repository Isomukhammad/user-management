import { JSX, ReactNode, createContext, useContext, useState } from "react";

interface UserType {
  id: string;
  email: string;
}

interface AuthContextProps {
  currentUser: UserType | null;
  installUser: (user: UserType) => void;
  removeUser: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  currentUser: null,
  installUser: (): void => {},
  removeUser: (): void => {},
});

const AuthProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [currentUser, setCurrentUser] = useState<UserType | null>(
    JSON.parse(sessionStorage.getItem("currentUser") as string) || null,
  );

  const installUser = (user: UserType): void => {
    sessionStorage.setItem("currentUser", JSON.stringify(user));
    setCurrentUser(user);
  };

  const removeUser = (): void => {
    sessionStorage.removeItem("currentUser");
    setCurrentUser(null);
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
