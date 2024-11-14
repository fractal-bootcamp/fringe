"use client";

import { useState } from "react";
import useUsers from "@/hooks/useUsers";
import { redirect } from "next/navigation";
import useUser from "@/hooks/useUser";
import { useAuthContext } from "@/contexts/AuthContext";
import XProfilePage from "@/components/XProfilePage";
import { ProfileType } from "@/types/types";
import useLikes from "@/hooks/useLikes";
const Page = () => {
  const { isLoaded, isSignedIn } = useAuthContext();
  const { handleAddLike } = useLikes();
  const { user } = useUser();
  const { applicants, companies } = useUsers();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Handle authentication
  if (!isLoaded) {
    return null;
  }

  if (!isSignedIn) {
    redirect("/sign-in");
  }

  if (!user || !applicants || !companies) {
    return null;
  }

  const items = (user.profileType === "applicant" ? companies : applicants).sort(
    (a, b) => Number(a.id) - Number(b.id)
  );

  const handleReject = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleLikeSection = () => {
    handleAddLike(user.id, items[currentIndex].id);
    if (currentIndex < items.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  if (items.length === 0) {
    return <div>No items found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 mb-16 max-w-2xl">
      <div className="relative">
        {/* <FeedCard
          user={items[currentIndex]}
          onReject={handleReject}
          onLikeSection={handleLikeSection}
        /> */}
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
        <div className="flex justify-between mt-4">
          <button onClick={handleReject} className="bg-red-500 text-white px-4 py-2 rounded">
            Reject
          </button>
          <button
            onClick={() => handleLikeSection()}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Like
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
