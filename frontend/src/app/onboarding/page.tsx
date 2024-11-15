"use client";

import { useRouter } from "next/navigation";
import useUser from "@/hooks/useUser";
import { ProfileType } from "@/types/types";
import { UserCircleIcon, ComputerDesktopIcon } from "@heroicons/react/24/outline";
import { useAuthContext } from "@/contexts/AuthContext";

export default function OnboardingPage() {
  const { isLoaded, isSignedIn } = useAuthContext();
  const { createUser } = useUser();
  const router = useRouter();

  const handleProfileSelection = async (type: ProfileType) => {
    const response = await createUser(type);
    if (response.user) {
      router.push(`/update`);
    }
  };

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-white">
      <h1 className="text-5xl font-bold mb-20 tracking-widest mt-24">FRINGE</h1>
      <div className="flex flex-col md:flex-row md:space-x-8 space-y-6 md:space-y-0">
        <div
          onClick={() => handleProfileSelection(ProfileType.applicant)}
          className="group flex flex-col items-center justify-center w-[240px] px-12 py-8 bg-white border-2 border-black rounded-lg hover:bg-black hover:text-white transition-all duration-300"
        >
          <UserCircleIcon className="w-16 h-16 mb-4" />
          <span className="text-xl font-semibold">Applicants</span>
        </div>

        <div
          onClick={() => handleProfileSelection(ProfileType.company)}
          className="group flex flex-col items-center justify-center w-[240px] px-12 py-8 bg-white border-2 border-black rounded-lg hover:bg-black hover:text-white transition-all duration-300"
        >
          <ComputerDesktopIcon className="w-16 h-16 mb-4" />
          <span className="text-xl font-semibold">Companies</span>
        </div>
      </div>
    </div>
  );
}
