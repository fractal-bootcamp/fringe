"use client";

import { useState } from "react";
import useFeed from "@/hooks/useFeed";
import { redirect } from "next/navigation";
import useUser from "@/hooks/useUser";
import { useAuthContext } from "@/contexts/AuthContext";
import XProfilePage from "@/components/XProfilePage";
import { ProfileType } from "@/types/types";
import useLikes from "@/hooks/useLikes";
import { Heart, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Page = () => {
  const { isLoaded, isSignedIn } = useAuthContext();
  const { handleAddLike } = useLikes();
  const { currentUser } = useUser();
  const { feed } = useFeed();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);

  if (!isLoaded) return null;
  if (!isSignedIn) redirect("/sign-in");
  if (!currentUser || !feed) return null;

  // const items = (currentUser.profileType === "applicant" ? companies : applicants).sort(
  //   (a, b) => Number(a.id) - Number(b.id)
  // );

  const handleReject = () => {
    setDirection("left");
    if (currentIndex < feed.length - 1) {
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
        setDirection(null);
      }, 300);
    }
  };

  const handleLikeSection = () => {
    setDirection("right");
    handleAddLike(currentUser.id, feed[currentIndex].id);
    if (currentIndex < feed.length - 1) {
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
        setDirection(null);
      }, 300);
    }
  };

  if (feed.length === 0) {
    return <div>No items found</div>;
  }

  return (
    <div className="container mx-auto max-w-2xl flex flex-col justify-between min-h-screen pb-20">
      <div className="relative flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ x: 0, opacity: 1 }}
            animate={{
              x: direction === "left" ? -500 : direction === "right" ? 500 : 0,
              opacity: direction ? 0 : 1,
            }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            {feed[currentIndex].profileType === ProfileType.applicant &&
            feed[currentIndex].applicantProfile ? (
              <XProfilePage
                profileType={feed[currentIndex].profileType}
                name={feed[currentIndex].name}
                location={feed[currentIndex].location}
                image={feed[currentIndex].profilePhotoIds[0]}
                applicantProps={{
                  experience: feed[currentIndex].applicantProfile.professionalExperiences,
                  education: feed[currentIndex].applicantProfile.educationalExperiences,
                  portfolioUrl: feed[currentIndex].applicantProfile.portfolioUrl,
                }}
              />
            ) : (
              <XProfilePage
                profileType={feed[currentIndex].profileType}
                name={feed[currentIndex].name}
                location={feed[currentIndex].location}
                image={feed[currentIndex].profilePhotoIds[0]}
                companyProps={feed[currentIndex].companyProfile}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="fixed bottom-20 left-0 right-0 flex justify-center pb-4">
        <div className="flex justify-between w-64">
          <button
            onClick={handleReject}
            className="bg-white text-black border-2 border-black h-16 w-16 rounded-full p-4 hover:bg-gray-100 transition-colors"
          >
            <X className="w-full h-full" />
          </button>
          <button
            onClick={handleLikeSection}
            className="bg-white text-black border-2 border-black h-16 w-16 rounded-full p-4 hover:bg-gray-100 transition-colors"
          >
            <Heart className="w-full h-full" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
