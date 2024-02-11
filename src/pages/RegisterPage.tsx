import { useNavigate } from "react-router-dom";

import { FormEvent, JSX, useState } from "react";

import AuthenticationLayout from "@/components/AuthenticationLayout.tsx";
import { signUp } from "@/firebase/requests.ts";
import { IRegister } from "@/types.ts";

const RegisterPage = (): JSX.Element => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();
    const name = (event.currentTarget[0] as HTMLInputElement).value;
    const email = (event.currentTarget[1] as HTMLInputElement).value;
    const password = (event.currentTarget[2] as HTMLInputElement).value;
    name && email && password && (await register({ name, email, password }));
  };

  const register = async (data: IRegister): Promise<void> => {
    setIsLoading(true);
    try {
      await signUp(data);
      navigate("/login");
    } catch (error) {
      setError((error as Error).message);
      throw new Error((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthenticationLayout title={"Register"}>
      <form onSubmit={handleSubmit} className={"space-y-4"}>
        {error && <span className={"font-medium text-red-500"}>{error}</span>}
        <input
          type="text"
          name={"name"}
          placeholder="Name"
          required={true}
          className={"custom-input"}
        />
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
        <button type="submit" disabled={isLoading} className={"custom-button"}>
          {isLoading ? "Loading..." : "Submit"}
        </button>
      </form>
    </AuthenticationLayout>
  );
};

export default RegisterPage;
