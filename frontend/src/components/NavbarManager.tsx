"use client";

import { useAuthContext } from "@/contexts/AuthContext";
import XNavbar from "./XNavbar";

export default function NavbarManager() {
  const { isSignedIn } = useAuthContext();
  return isSignedIn ? (
    <XNavbar
      pathHome="/feed"
      pathLikes="/likes"
      pathMatches="/matches"
      pathSettings="/settings"
      development={false}
    />
  ) : null;
}
