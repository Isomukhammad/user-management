import { JSX, useEffect, useState } from "react";

import Loader from "@/components/Loader.tsx";
import UsersButton from "@/components/UsersButton.tsx";
import UsersTable from "@/components/UsersTable.tsx";
import { useAuth } from "@/context.tsx";
import { getUsers } from "@/firebase/requests.ts";
import { IUser } from "@/types.ts";

const MainPage = (): JSX.Element => {
  const { currentUser, removeUser } = useAuth();

  const [users, setUsers] = useState<IUser[] | []>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [ids, setIds] = useState<string[]>([]);

  const getUsersList = async (): Promise<void> => {
    setIsLoading(true);
    await getUsers().then((users) => {
      setUsers(users);
    });
    setIds([]);
    setIsLoading(false);
  };

  useEffect(() => {
    getUsersList();
  }, []);

  useEffect(() => {
    const user = users.find((user) => user.id === currentUser);
    if (!isLoading && user && !user.is_active) removeUser();
    if (!isLoading && !user) removeUser();
  }, [isLoading, currentUser, users, removeUser]);

  return (
    <main className={"container mx-auto px-5"}>
      <div
        className={
          "my-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
        }
      >
        <h1 className={"text-3xl font-bold"}>Users</h1>
        <UsersButton ids={ids} getUserList={getUsersList} />
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <UsersTable ids={ids} setIds={setIds} users={users} />
      )}
    </main>
  );
};

export default MainPage;
