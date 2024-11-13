import Navbar from "@/components/Navbar";
import "./globals.css";
import { dataNavigation } from "@/utils/dataNavigation";
import { ClerkProvider } from '@clerk/nextjs'

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
          <Navbar navigationItems={dataNavigation} />
        </body>
      </html>
    </ClerkProvider>
  );
}
