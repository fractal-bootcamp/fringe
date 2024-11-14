"use client";

import { useRouter } from 'next/navigation';
import useUser from "@/hooks/useUser";
import { ProfileType } from "@/types/types";
import { UserCircleIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useAuth } from "@clerk/nextjs";
import { useEffect } from 'react';

export default function OnboardingPage() {
  const { isLoaded, isSignedIn } = useAuth();
  const { user, createUser } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/sign-in');
    }
    if (user) {
      router.push('/feed');
    }
  }, [isLoaded, isSignedIn, user, router]);
  
  const handleProfileSelection = async (type: ProfileType) => {
    try {
      await createUser(type);
    } catch (error) {
      console.error('Error creating user:', error);
      // Handle error appropriately
    }
  };

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-white">
      <h1 className="text-5xl font-bold mb-20 tracking-widest mt-24">FRINGE</h1>
    <div className="flex flex-col md:flex-row md:space-x-8 space-y-6 md:space-y-0">
          <Link
            href="/feed?type=client"
            onClick={() => handleProfileSelection(ProfileType.applicant)}
            className="group flex flex-col items-center justify-center w-[240px] px-12 py-8 bg-white border-2 border-black rounded-lg hover:bg-black hover:text-white transition-all duration-300"
          >
            <UserCircleIcon className="w-16 h-16 mb-4" />
            <span className="text-xl font-semibold">Applicants</span>
          </Link>

          <Link
            href="/feed?type=company"
            onClick={() => handleProfileSelection(ProfileType.company)}
            className="group flex flex-col items-center justify-center w-[240px] px-12 py-8 bg-white border-2 border-black rounded-lg hover:bg-black hover:text-white transition-all duration-300"
          >
            <ComputerDesktopIcon className="w-16 h-16 mb-4" />
            <span className="text-xl font-semibold">Companies</span>
          </Link>
        </div>
    </div>
  );
} 