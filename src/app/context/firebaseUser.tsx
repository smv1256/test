"use client"

import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { signInWithCustomToken } from "firebase/auth";
import { auth } from "@/backend/lib/firebase";
import type { User } from "firebase/auth";

const FirebaseUserContext = createContext<User | null>(null);

export function FirebaseUserProvider({ children }: { children: React.ReactNode }) {
  const { getToken } = useAuth();
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      const token = await getToken({ template: "integration_firebase" });
      if (token) {
        const creds = await signInWithCustomToken(auth, token);
        setFirebaseUser(creds.user);
      }
    })();
  }, [getToken]);

  return (
    <FirebaseUserContext.Provider value={firebaseUser}>
      {children}
    </FirebaseUserContext.Provider>
  );
}

export function useFirebaseUser() {
  return useContext(FirebaseUserContext);
}
