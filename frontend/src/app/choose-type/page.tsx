"use client";

import { useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Link from "next/link";
import { UserCircleIcon, ComputerDesktopIcon } from "@heroicons/react/24/outline";
import { userTypeStore } from "@/stores/userTypeStore";

export default function ChooseTypePage() {
  const { isLoaded, isSignedIn } = useAuth();
  const { updateUserType } = userTypeStore();

  if (!isLoaded) {
    return null;
  }

  if (!isSignedIn) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
      <h1 className="text-3xl font-bold mb-8">Choose Your Path</h1>
      <div className="flex flex-col md:flex-row gap-6 max-w-3xl">
        <Link
          href="/setup-profile?type=applicant"
          onClick={() => updateUserType("applicant")}
          className="group flex flex-col items-center justify-center w-[280px] p-8 bg-white border-2 border-black rounded-lg hover:bg-black hover:text-white transition-all duration-300"
        >
          <UserCircleIcon className="w-16 h-16 mb-4" />
          <span className="text-xl font-semibold mb-2">I'm Looking for Work</span>
          <p className="text-center text-sm opacity-70">
            Create a profile to find your next opportunity
          </p>
        </Link>

        <Link
          href="/setup-profile?type=company"
          onClick={() => updateUserType("company")}
          className="group flex flex-col items-center justify-center w-[280px] p-8 bg-white border-2 border-black rounded-lg hover:bg-black hover:text-white transition-all duration-300"
        >
          <ComputerDesktopIcon className="w-16 h-16 mb-4" />
          <span className="text-xl font-semibold mb-2">I'm Hiring</span>
          <p className="text-center text-sm opacity-70">
            Create a company profile to find great talent
          </p>
        </Link>
      </div>
    </div>
  );
} 