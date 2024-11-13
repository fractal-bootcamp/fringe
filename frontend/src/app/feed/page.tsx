"use client";

import FeedCard from "@/components/FeedCard";
import { useState } from "react";
import useUsers from "@/hooks/useUsers";
import useUser from "@/hooks/useUser";

const Page = () => {
  const { user } = useUser();
  const { applicants, companies } = useUsers();

  if (!user || !applicants || !companies) {
    return <div>Loading...</div>;
  }

  const items = (user.profileType === "applicant" ? companies : applicants).sort(
    (a, b) => Number(a.id) - Number(b.id)
  );

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleReject = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleLikeSection = (section: string, content: string) => {
    // TODO: handle like action
    console.log(`Liked ${section}: ${content}`);
  };

  if (items.length === 0) {
    return <div>No items found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 mb-16 max-w-2xl">
      <div className="relative">
        <FeedCard
          user={items[currentIndex]}
          onReject={handleReject}
          onLikeSection={handleLikeSection}
        />
      </div>
    </div>
  );
};

export default Page;
