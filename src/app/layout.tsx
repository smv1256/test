import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import "./globals.css";
import FirebaseUI from "../components/firebaseAuthWrapper";
import { FirebaseUserProvider } from "./context/firebaseUser";
import { inter, lato } from "../public/fonts";

export const metadata: Metadata = {
  title: "",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: '#0000ff',
          colorForeground: '#000000',
        },
      }}>
      <html lang="en">
        <FirebaseUserProvider>
          <body className={`${inter.className} ${lato.className} antialiased`}>
            <FirebaseUI />
            {children}
          </body>
        </FirebaseUserProvider>
      </html>
    </ClerkProvider>
  );
}
