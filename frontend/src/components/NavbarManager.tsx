"use client";

import { useAuthContext } from "@/contexts/AuthContext";
import XNavbar from "./XNavbar";
import { UserButton } from "@clerk/nextjs";

export default function NavbarManager() {
  const { isSignedIn } = useAuthContext();
  // return isSignedIn ? <Navbar navigationItems={dataNavigation} /> : null;
  return isSignedIn ? (
    <div>
      <XNavbar
        pathHome="/"
        pathLikes="/likes"
        pathMatches="/matches"
        pathSettings="/settings"
        development={false}
      />
      <UserButton afterSignOutUrl="/" />
    </div>
  ) : null;
}
