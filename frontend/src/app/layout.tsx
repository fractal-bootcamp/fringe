import NavbarManager from "@/components/AuthNavbar";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { AuthProvider } from "@/contexts/AuthContext";
import { Suspense } from "react";
import AuthHeader from "@/components/AuthHeader";

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
                <AuthHeader />
              </Suspense>
            </div>
            <div className="px-4 py-16 pb-20">
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
