"use client";

import Navbar from './Navbar';
import { dataNavigation } from "@/utils/dataNavigation";
import { useAuth } from '@clerk/nextjs';

export default function NavbarManager() {
  const { isSignedIn } = useAuth();
  return isSignedIn ? <Navbar navigationItems={dataNavigation} /> : null;
} 