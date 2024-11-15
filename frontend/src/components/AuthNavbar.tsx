"use client";

import { useAuthContext } from "@/contexts/AuthContext";
import XNavbar from "./XNavbar";
import storeHeader from "@/stores/storeHeader";

const AuthNavar = () => {
  const { isSignedIn } = useAuthContext();
  const { updateHeader } = storeHeader();

  return isSignedIn ? (
    <XNavbar
      pathHome="/feed"
      pathLikes="/likes"
      pathMatches="/matches"
      pathSettings="/settings"
      development={false}
      updateHeader={updateHeader}
    />
  ) : null;
};

export default AuthNavar;
