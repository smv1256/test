import { doc, getDoc } from "firebase/firestore";
import { db } from "@/backend/lib/firebase";
import type { DocumentData } from "firebase/firestore";

export async function getFirestoreData (id: string): Promise<DocumentData | null> {
  const docRef = doc(db, "users", id);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    return docSnap.data();
  } else {
    console.log("Doc doesn't exist");
    return null;
  }
}

    