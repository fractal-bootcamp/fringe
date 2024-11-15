"use client";

import { useAuthContext } from "@/contexts/AuthContext";
import React from "react";
import XHeader from "./XHeader";
import storeHeader from "@/stores/storeHeader";

const AuthHeader = () => {
  const { header } = storeHeader();
  const { isSignedIn } = useAuthContext();
  return isSignedIn ? <XHeader title={header} /> : null;
};

export default AuthHeader;
