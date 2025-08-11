"use client"

import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { useAuth } from "@clerk/nextjs";
import { PUBLIC_PAGES } from "@/backend/utils/constants";
import { usePathname } from 'next/navigation';
import { useFirebaseUser } from "@/app/context/firebaseUser";
import { getFirestoreData } from "@/backend/utils/fireFunctions";
import { useEffect, useState } from "react";

export default function FirebaseUI() {
  const { userId } = useAuth();

  if (!userId && !PUBLIC_PAGES.includes(usePathname())) {
    return <p>You need to sign in with Clerk to access this page.</p>
  }

  const user = useFirebaseUser();

  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.uid) return;

    const fetchData = async () => {
      const data = await getFirestoreData(user.uid);
      setUsername(data?.username || "User");
    };

    fetchData();
  }, [user]);

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
