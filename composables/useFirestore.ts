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
  const setStatusData = async (ID: string | null) => {
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

  /** ランダムなImageIDを取得する  */
  const getRandomImageId = async () => {
    const q = query(collection(db, "users"), where("ImageID", "!=", "")); // コレクション全体を取得するクエリを作成
    const querySnapshot = await getDocs(q); //クエリの実行
    const docs = querySnapshot.docs; //ドキュメントリストの取得

    if (docs.length === 0) {
      return null; // ドキュメントが存在しない場合（これいるかわからん）
    }

    const randomIndex = Math.floor(Math.random() * docs.length); //ランダムで出す
    const randomDoc = docs[randomIndex]; //それを取得
    const data = randomDoc.data(); //データの抽出

    return data.imageID || null; // imageID が存在しない場合は null を返す
  };

  return {
    getUserData,
    getUserDoc,
    setStatusData,
    setImageId,
    createUser,
    loginUser,
    getRandomImageId,
  };
};
