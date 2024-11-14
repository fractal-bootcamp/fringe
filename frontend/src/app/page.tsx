"use client";

import Link from "next/link";
import { useAuthContext } from "@/contexts/AuthContext";

export default function Home() {
  const { isSignedIn } = useAuthContext();

  return (
    <div className="min-h-screen flex flex-col items-center bg-white">
      <h1 className="text-5xl font-bold mb-20 tracking-widest mt-24">FRINGE</h1>

      {!isSignedIn ? (
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/sign-in"
            className="px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800"
          >
            Sign In
          </Link>
          <Link
            href="/sign-up"
            className="px-8 py-3 border-2 border-black rounded-lg hover:bg-gray-50"
          >
            Sign Up
          </Link>
        </div>
      ) : (
        <Link href="/feed">
        </Link>
      )}
    </div>
  );
}
