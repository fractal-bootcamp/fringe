"use client";

import { useState } from "react";
import useUsers from "@/hooks/useUsers";
import { redirect } from "next/navigation";
import useUser from "@/hooks/useUser";
import { useAuthContext } from "@/contexts/AuthContext";
import XProfilePage from "@/components/XProfilePage";
import { ProfileType } from "@/types/types";
import useLikes from "@/hooks/useLikes";
import { Heart, X } from "lucide-react";
const Page = () => {
  const { isLoaded, isSignedIn } = useAuthContext();
  const { handleAddLike } = useLikes();
  const { currentUser } = useUser();
  const { applicants, companies } = useUsers();

  const [currentIndex, setCurrentIndex] = useState(0);

  // Handle authentication
  if (!isLoaded) {
    return null;
  }

  if (!isSignedIn) {
    redirect("/sign-in");
  }

  if (!currentUser || !applicants || !companies) {
    return null;
  }

  const items = (currentUser.profileType === "applicant" ? companies : applicants).sort(
    (a, b) => Number(a.id) - Number(b.id)
  );

  const handleReject = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleLikeSection = () => {
    handleAddLike(currentUser.id, items[currentIndex].id);
    if (currentIndex < items.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  if (items.length === 0) {
    return <div>No items found</div>;
  }

  return (
    <div className="container mx-auto max-w-2xl flex flex-col justify-between h-full">
      <div className="relative flex-grow">
        {items[currentIndex].profileType === ProfileType.applicant &&
        items[currentIndex].applicantProfile ? (
          <XProfilePage
            profileType={items[currentIndex].profileType}
            name={items[currentIndex].name}
            location={items[currentIndex].location}
            image={items[currentIndex].profilePhotoIds[0]}
            applicantProps={{
              experience: items[currentIndex].applicantProfile.professionalExperiences,
              education: items[currentIndex].applicantProfile.educationalExperiences,
              portfolioUrl: items[currentIndex].applicantProfile.portfolioUrl,
            }}
          />
        ) : (
          <XProfilePage
            profileType={items[currentIndex].profileType}
            name={items[currentIndex].name}
            location={items[currentIndex].location}
            image={items[currentIndex].profilePhotoIds[0]}
            companyProps={items[currentIndex].companyProfile}
          />
        )}

        {/* New buttons for reject and like actions */}
        <div className="flex justify-between m-10 rounded-full">
          <button
            onClick={handleReject}
            className="bg-white text-black border-2 border-black h-20 w-20 rounded-full p-4"
          >
            <X className="rounded-full w-full h-full" />
          </button>
          <button
            onClick={() => handleLikeSection()}
            className="bg-white text-black border-2 border-black h-20 w-20 rounded-full p-4"
          >
            <Heart className="rounded-full w-full h-full" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
