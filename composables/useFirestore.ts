import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  limit,
  Timestamp,
  addDoc,
} from "firebase/firestore";

import type { User } from "../types/firestore";

/**
 * Firestore へのアクセス
 */
export const useFirestore = () => {
  const db = getFirestore();

  const getUserDoc = async (ID: string | null) => {
    if (!ID) {
      return null;
    }

    const q = query(
      collection(db, "users"),
      where("userID", "==", ID),
      limit(1)
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot.docs.length == 0) {
      return null;
    }

    return querySnapshot.docs[0];
  };

  const getUserData = async (ID: string | null) => {
    if (!ID) {
      return null;
    }

    const doc = await getUserDoc(ID);
    if (!doc) {
      return null;
    }

    return doc.data() as User;
  };

  /** statusをFlashに書き換え */
  const setStatusData = async (ID: string) => {
    const doc = await getUserDoc(ID);
    if (!doc) {
      return null;
    }

    await updateDoc(doc.ref, { status: "flash" });
  };

  /** ユーザーに画像を紐づける */
  const setImageId = async (ID: string, imageId: string) => {
    const doc = await getUserDoc(ID);
    if (!doc) {
      return null;
    }

    await updateDoc(doc.ref, {
      status: "none",
      imageID: imageId,
      createdDate: Timestamp.now(),
    });
  };

  /** ユーザーを新規作成 */
  const createUser = async (ID: string) => {
    const docRef = await addDoc(collection(db, "users"), {
      userID: ID,
      imageID: "",
      status: "none",
      createdDate: Timestamp.now(),
    });
    return docRef;
  };

  /** ログインしてドキュメントを追加するかどうか */
  const loginUser = async (ID: string) => {
    const doc = await getUserDoc(ID);
    if (!doc) {
      createUser(ID);
    }
  };

  return {
    getUserData,
    getUserDoc,
    setStatusData,
    setImageId,
    createUser,
    loginUser,
  };
};
