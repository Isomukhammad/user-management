import { FormEvent, JSX, useState } from "react";

import AuthenticationLayout from "@/components/AuthenticationLayout.tsx";
import { useAuth } from "@/context.tsx";
import { signIn } from "@/firebase/requests.ts";

const LoginPage = (): JSX.Element => {
  const { installUser } = useAuth();
  const [error, setError] = useState<string>("");

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();
    setError("");
    const email = (event.currentTarget[0] as HTMLInputElement).value;
    const password = (event.currentTarget[1] as HTMLInputElement).value;
    email && password && (await login(email, password));
  };

  const login = async (email: string, password: string): Promise<void> => {
    try {
      await signIn({ email, password }).then((user) => installUser(user));
    } catch (error) {
      setError((error as Error).message);
      throw new Error((error as Error).message);
    }
  };

  return (
    <AuthenticationLayout title={"Login"}>
      <form onSubmit={handleSubmit} className={"space-y-4"}>
        {error.length > 0 && (
          <span className={"font-medium text-red-500"}>{error}</span>
        )}
        <input
          type="email"
          name={"email"}
          placeholder="Email"
          required={true}
          className={"custom-input"}
        />
        <input
          type="password"
          name={"password"}
          placeholder="Password"
          required={true}
          className={"custom-input"}
        />
        <button type="submit" className={"custom-button"}>
          Submit
        </button>
      </form>
    </AuthenticationLayout>
  );
};

export default LoginPage;
