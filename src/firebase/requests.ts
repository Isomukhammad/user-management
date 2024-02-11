import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { sha3_256 } from "js-sha3";

import { ILogin, IRegister, IUser } from "@/types.ts";

import { db } from "./firebase.ts";

const getUser = async (email: string) => {
  const querySnapshot = await getDocs(
    query(collection(db, "users_list"), where("email", "==", email)),
  );
  if (!querySnapshot.empty) return querySnapshot.docs[0];
  return null;
};

const createUser = async ({ password, ...rest }: IRegister): Promise<void> => {
  try {
    const docRef = doc(collection(db, "users_list"));
    await setDoc(docRef, {
      ...rest,
      id: docRef.id,
      password: sha3_256(password),
      created_at: new Date().toISOString(),
      last_login: new Date().toISOString(),
      is_active: true,
    });
  } catch (error) {
    console.error("Error adding document: " + error);
  }
};

const updateDate = async (id: string): Promise<void> => {
  try {
    await setDoc(
      doc(db, "users_list", id),
      {
        last_login: new Date().toISOString(),
      },
      { merge: true },
    );
  } catch (error) {
    console.error(
      `Error while updating last login date for user ${id}: ${error}`,
    );
  }
};

const deleteUser = async (id: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, "users_list", id));
  } catch (error) {
    console.error(`Error while deleting user ${id}: ${error}`);
  }
};

const blockUser = async (id: string): Promise<void> => {
  try {
    await setDoc(
      doc(db, "users_list", id),
      {
        is_active: false,
      },
      { merge: true },
    );
  } catch (error) {
    console.error(`Error while blocking user ${id}: ${error}`);
  }
};

const activateUser = async (id: string): Promise<void> => {
  try {
    await setDoc(
      doc(db, "users_list", id),
      {
        is_active: true,
      },
      { merge: true },
    );
  } catch (error) {
    console.error(`Error while blocking user ${id}: ${error}`);
  }
};

export const signIn = async (data: ILogin): Promise<IUser> => {
  const userDoc = await getUser(data.email);
  if (!userDoc) throw new Error("User not found");
  const user = userDoc.data() as IUser;
  console.log(user.password, sha3_256(data.password));
  if (user.password !== sha3_256(data.password))
    throw new Error("Incorrect password");
  if (!user.is_active) throw new Error("User is blocked");
  await updateDate(user.id);
  return user;
};

export const signUp = async (data: IRegister): Promise<void> => {
  const userDoc = await getUser(data.email);
  if (userDoc) throw new Error("User with this email already exists");
  await createUser(data);
};

export const getUsers = async (): Promise<IUser[]> => {
  const querySnapshot = await getDocs(collection(db, "users_list"));
  return querySnapshot.docs.map((doc) => doc.data() as IUser);
};

export const deleteUsers = async (ids: string[]): Promise<void> => {
  await Promise.all(ids.map((id) => deleteUser(id)));
};

export const blockUsers = async (ids: string[]): Promise<void> => {
  await Promise.all(ids.map((id) => blockUser(id)));
};

export const activateUsers = async (ids: string[]): Promise<void> => {
  await Promise.all(ids.map((id) => activateUser(id)));
};
