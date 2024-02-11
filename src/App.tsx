import { Navigate, Route, Routes } from "react-router-dom";

import { JSX } from "react";

import Header from "@/components/Header.tsx";
import Sprites from "@/components/Sprites.tsx";
import { useAuth } from "@/context.tsx";
import LoginPage from "@/pages/LoginPage.tsx";
import MainPage from "@/pages/MainPage.tsx";
import RegisterPage from "@/pages/RegisterPage.tsx";

function App(): JSX.Element {
  const { currentUser } = useAuth();

  return (
    <>
      <Sprites />
      <div className={"min-h-screen bg-neutral-200"}>
        <Header />
        <Routes>
          <Route
            path={"/"}
            element={currentUser ? <MainPage /> : <Navigate to={"/login"} />}
          />
          <Route
            path={"/login"}
            element={currentUser ? <Navigate to={"/"} /> : <LoginPage />}
          />
          <Route
            path={"/register"}
            element={currentUser ? <Navigate to={"/"} /> : <RegisterPage />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
