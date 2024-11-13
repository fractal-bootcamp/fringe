import NavbarManager from "@/components/NavbarManager";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider dynamic={true}>
      <html lang="en">
        <body suppressHydrationWarning className={`antialiased`}>
          <div className="bg-gray-100 h-screen">{children}</div>
          <NavbarManager />
        </body>
      </html>
    </ClerkProvider>
  );
}
