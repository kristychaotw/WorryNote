import React, { useState, useEffect, useContext } from "react";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-rzNyg-1KShr9zk_n_DwW2k3aMKFoNpA",
  authDomain: "worries-go-away.firebaseapp.com",
  projectId: "worries-go-away",
  storageBucket: "worries-go-away.appspot.com",
  messagingSenderId: "502950006184",
  appId: "1:502950006184:web:5f2341538356cc4325619d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
export const storage = getStorage(app);
const db = getFirestore(app);
export default getFirestore();
export const auth = getAuth(app);

export async function signup(email, password) {
  let signUpResult=await createUserWithEmailAndPassword(auth, email, password).then((e)=>signUpResult=e).catch((e)=>signUpResult=e.message);
  console.log("msgfire:",signUpResult);
  return signUpResult;
}

export async function logout() {
  let logoutResult=await signOut(auth).then((e)=>logoutResult=e).catch((e)=>logoutResult=e.message)
  console.log("msgfire:",logoutResult);
  return logoutResult;
}

export async function login(email, password) {
  let signInResult=await signInWithEmailAndPassword(auth, email, password).then((e)=>signInResult=e).catch((e)=>signInResult=e.code);
  console.log("msgfire:",signInResult);
  return signInResult
}

// Custom Hook

export const AuthContext = React.createContext();
export const AuthUpdateContext = React.createContext();

export function useAuthUser() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return unsub;
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
