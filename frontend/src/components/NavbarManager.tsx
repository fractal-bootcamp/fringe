"use client";

import { useAuth } from '@clerk/nextjs';
import Navbar from './Navbar';
import { dataNavigation } from "@/utils/dataNavigation";

export default function NavbarManager() {
  const { isSignedIn } = useAuth();
  return isSignedIn ? <Navbar navigationItems={dataNavigation} /> : null;
} 