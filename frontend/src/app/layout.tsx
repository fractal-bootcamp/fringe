import Navbar from "@/components/Navbar";
import "./globals.css";
import { dataNavigation } from "@/api/dataNavigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className={`antialiased font-mono`}>
        <div className="bg-gray-100 h-screen">{children}</div>
        <Navbar navigationItems={dataNavigation} />
      </body>
    </html>
  );
}
