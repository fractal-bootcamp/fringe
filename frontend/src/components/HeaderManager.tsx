"use client";

import { useAuthContext } from "@/contexts/AuthContext";
import React from "react";
import XHeader from "./XHeader";

const HeaderManager = () => {
  const { isSignedIn } = useAuthContext();
  return isSignedIn ? <XHeader title="Hello" /> : null;
};

export default HeaderManager;
