import { JSX, useState } from "react";

import { activateUsers, blockUsers, deleteUsers } from "@/firebase/requests.ts";

interface UsersButtonProps {
  ids: string[];
  getUserList: () => Promise<void>;
}

const UsersButton = ({ ids, getUserList }: UsersButtonProps): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleButton = async (
    actionFunc: (ids: string[]) => Promise<void>,
  ): Promise<void> => {
    setIsLoading(true);
    await actionFunc(ids);
    await getUserList();
    setIsLoading(false);
  };

  return (
    <div className={"flex flex-row gap-1"}>
      <button
        type={"button"}
        title={"Block"}
        disabled={isLoading}
        onClick={() => handleButton(blockUsers)}
        className={
          "flex flex-row items-center gap-1 rounded bg-yellow-500 px-4 py-2 font-bold text-white hover:bg-yellow-600 active:bg-yellow-700 disabled:cursor-not-allowed disabled:opacity-50"
        }
      >
        <svg viewBox={"0 0 24 24"} className={"h-6 w-6 fill-none stroke-white"}>
          <use xlinkHref={"#lock"} />
        </svg>
        <span>Block</span>
      </button>
      <button
        type={"button"}
        title={"Activate"}
        disabled={isLoading}
        onClick={() => handleButton(activateUsers)}
        className={
          "rounded bg-green-500 p-2 font-bold text-white hover:bg-green-600 active:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
        }
      >
        <svg viewBox={"0 0 24 24"} className={"h-6 w-6 fill-none stroke-white"}>
          <use xlinkHref={"#unlock"} />
        </svg>
      </button>
      <button
        type={"button"}
        title={"Delete"}
        disabled={isLoading}
        onClick={() => handleButton(deleteUsers)}
        className={
          "rounded bg-red-500 p-2 font-bold text-white hover:bg-red-600 active:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
        }
      >
        <svg viewBox={"0 0 24 24"} className={"h-6 w-6 fill-none stroke-white"}>
          <use xlinkHref={"#delete"} />
        </svg>
      </button>
    </div>
  );
};

export default UsersButton;
