import { Dispatch, JSX, SetStateAction } from "react";

import { IUser } from "@/types.ts";

interface UsersTableProps {
  ids: string[];
  setIds: Dispatch<SetStateAction<string[]>>;
  users: IUser[];
}

const UsersTable = ({ ids, setIds, users }: UsersTableProps): JSX.Element => {
  const getDate = (dateString: string): string => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className={"overflow-x-auto"}>
      <table className="w-full table-auto overflow-hidden rounded border bg-white">
        <thead className={"bg-blue-500 text-white"}>
          <tr>
            <th className={"border"}>
              <input
                type={"checkbox"}
                checked={ids.length === users.length}
                onChange={(e) => {
                  if (e.target.checked) {
                    setIds(users.map((user) => user.id));
                  } else {
                    setIds([]);
                  }
                }}
                className={`form-checkbox h-4 w-4 rounded-xl ${users.length === 0 ? "invisible" : ""}`}
              />
            </th>
            <th className={"border"}>ID</th>
            <th className={"border"}>Name</th>
            <th className={"border"}>E-Mail</th>
            <th className={"border"}>Last Login</th>
            <th className={"border"}>Registration</th>
            <th className={"border"}>Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user.id} className={"hover:bg-neutral-100"}>
                <td className={"flex justify-center"}>
                  <input
                    type={"checkbox"}
                    checked={ids.includes(user.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setIds([...ids, user.id]);
                      } else {
                        setIds(ids.filter((id) => id !== user.id));
                      }
                    }}
                    className={"form-checkbox h-4 w-4 rounded-xl"}
                  />
                </td>
                <td className={"border text-center"}>{user.id}</td>
                <td className={"border"}>{user.name}</td>
                <td className={"border"}>{user.email}</td>
                <td className={"border text-center"}>
                  {getDate(user.created_at)}
                </td>
                <td className={"border text-center"}>
                  {getDate(user.last_login)}
                </td>
                <td
                  className={`flex justify-center text-white ${user.is_active ? "bg-green-500" : "bg-red-500"}`}
                >
                  {user.is_active ? "Active" : "Blocked"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
