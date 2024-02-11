import { JSX, ReactNode } from "react";

interface AuthenticationLayoutProps {
  title: string;
  children: ReactNode;
}

const AuthenticationLayout = ({
  title,
  children,
}: AuthenticationLayoutProps): JSX.Element => {
  return (
    <main className={"flex h-[calc(100vh-72px)] items-center justify-center"}>
      <div
        className={
          "w-[320px] space-y-6 rounded bg-white p-6 shadow lg:w-[540px]"
        }
      >
        <h1 className={"text-center text-3xl font-bold"}>{title}</h1>
        {children}
      </div>
    </main>
  );
};

export default AuthenticationLayout;
