import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
 } from 'firebase/firestore'

import type { User } from '../types/firestore';

/**
 * Firestore へのアクセス
 */
export const useFirestore = () => {
  const db = getFirestore()

  const getUserData = async (ID: string | null): Promise<User | null> => {
    //ユーザーIDを使い、一致するIDのデータを取得する関数
    if (!ID) {
      return null;
    }

    const q = query(collection(db, 'users'), where('userID', '==', ID));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      return doc.data() as User;
    })

    return null;
  }

  return {
    getUserData,
  }
}
