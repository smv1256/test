"use client"

import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { useAuth } from "@clerk/nextjs";
import { isPublic } from "@/backend/utils/isPublic";
import { usePathname } from 'next/navigation';
import { useFirebaseUser } from "@/app/context/firebaseUser";
import { getFirestoreData } from "@/backend/utils/fireFunctions";
import { useEffect, useState } from "react";

export default function FirebaseUI() {
  const { userId } = useAuth();
  const user = useFirebaseUser();
  const pathname = usePathname();
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    // if (!user?.uid) return; <-- eslint compilation error, "React Hook called conditionally"

    const fetchData = async () => {
      if (user !== null) {
        const data = await getFirestoreData(user.uid);
        setUsername(data?.username || "User");
      }
    };

    fetchData();
  }, [user]);

  if (!userId && !isPublic(usePathname())) {
    return <p>You need to sign in with Clerk to access this page.</p>
  }

  return (
    <main>
      <SignedOut>
        <SignInButton>Sign In</SignInButton>
        <SignUpButton>Sign Up</SignUpButton>
      </SignedOut>
      <SignedIn>
          <p>Hi, {username}!</p>
        <UserButton></UserButton>
      </SignedIn>
    </main>
  )
}
