import NavbarManager from "@/components/NavbarManager";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { AuthProvider } from "@/contexts/AuthContext";
import { Suspense } from "react";
import HeaderManager from "@/components/HeaderManager";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className={`antialiased`}>
        <ClerkProvider dynamic={true}>
          <AuthProvider>
            <div>
              <Suspense fallback={null}>
                <HeaderManager />
              </Suspense>
            </div>
            <div className="h-screen">
              <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
            </div>
            <Suspense fallback={null}>
              <NavbarManager />
            </Suspense>
          </AuthProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
