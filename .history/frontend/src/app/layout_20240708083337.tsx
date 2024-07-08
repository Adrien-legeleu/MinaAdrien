import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UserContextProvider } from "@/context/UserContexts";
import { GroupContextProvider } from "@/context/GroupContexts";
import { CreateJoinContextProvider } from "@/context/CreateJoinContexts";
import { DescriptionContextProvider } from "@/context/DescriptionContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <DescriptionContextProvider>
        <CreateJoinContextProvider>
          <GroupContextProvider>
            <UserContextProvider>
              <body className={inter.className}>{children}</body>
            </UserContextProvider>
          </GroupContextProvider>
        </CreateJoinContextProvider>
      </DescriptionContextProvider>
    </html>
  );
}
