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

  const getUserData = async (ID: string | null) => {
    //ユーザーIDを使い、一致するIDのデータを取得する関数
    if (!ID) {
      return null;
    }

    const q = query(collection(db, 'users'), where('userID', '==', ID));
    const querySnapshot = await getDocs(q);
    //console.log(querySnapshot.docs[0].data());
    return querySnapshot.docs[0].data() as User;
  }

  return {
    getUserData,
  }
}
