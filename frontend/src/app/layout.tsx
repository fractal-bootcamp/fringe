import NavbarManager from "@/components/NavbarManager";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { AuthProvider } from "@/contexts/AuthContext";
import { Suspense } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <ClerkProvider dynamic={true}>
          <AuthProvider>
            <div suppressHydrationWarning className="h-screen">
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
