"use client";

import Navbar from './Navbar';
import { dataNavigation } from "@/utils/dataNavigation";
import { useAuthContext } from "@/contexts/AuthContext";

export default function NavbarManager() {
  const { isSignedIn } = useAuthContext();
  return isSignedIn ? <Navbar navigationItems={dataNavigation} /> : null;
} 