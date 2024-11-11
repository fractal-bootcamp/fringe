"use client";

import Link from "next/link";
import { UserCircleIcon, ComputerDesktopIcon } from "@heroicons/react/24/outline";
import { userTypeStore } from "@/stores/userTypeStore";

export default function Home() {
  const { updateUserType } = userTypeStore();
  return (
    <div className="min-h-screen flex flex-col items-center bg-white">
      <h1 className="text-5xl font-bold mb-20 tracking-widest mt-24 font-mono">FRINGE</h1>

      <div className="flex flex-col md:flex-row md:space-x-8 space-y-6 md:space-y-0">
        <Link
          href="/feed?type=client"
          onClick={() => updateUserType("applicant")}
          className="group flex flex-col items-center justify-center w-[240px] px-12 py-8 bg-white border-2 border-black rounded-lg hover:bg-black hover:text-white transition-all duration-300"
        >
          <UserCircleIcon className="w-16 h-16 mb-4" />
          <span className="text-xl font-semibold">Applicants</span>
        </Link>

        <Link
          href="/feed?type=company"
          onClick={() => updateUserType("company")}
          className="group flex flex-col items-center justify-center w-[240px] px-12 py-8 bg-white border-2 border-black rounded-lg hover:bg-black hover:text-white transition-all duration-300"
        >
          <ComputerDesktopIcon className="w-16 h-16 mb-4" />
          <span className="text-xl font-semibold">Companies</span>
        </Link>
      </div>
    </div>
  );
}
