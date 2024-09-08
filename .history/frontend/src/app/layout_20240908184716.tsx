import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UserContextProvider } from "@/context/UserContexts";
import { GroupContextProvider } from "@/context/GroupContexts";
import { CreateJoinContextProvider } from "@/context/CreateJoinContexts";
import { DescriptionContextProvider } from "@/context/DescriptionContext";
import { ImageContextProvider } from "@/context/ImageContexts";
import { ThemeContextProvider } from "@/context/ThemeContext";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lovna",
  description: "Lovna is the app to share with thoe you love !❤️",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Ajouter la balise <link> pour la favicon ici */}
        <link rel="icon" href="/lovna-logo.png" />
      </head>
      <ThemeContextProvider>
        <ImageContextProvider>
          <DescriptionContextProvider>
            <CreateJoinContextProvider>
              <GroupContextProvider>
                <UserContextProvider>
                  <body className={inter.className}>
                    <Toaster richColors closeButton />
                    {children}
                  </body>
                </UserContextProvider>
              </GroupContextProvider>
            </CreateJoinContextProvider>
          </DescriptionContextProvider>
        </ImageContextProvider>
      </ThemeContextProvider>
    </html>
  );
}
