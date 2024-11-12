"use client";

import { useSearchParams } from "next/navigation";
import FeedCard from "@/components/FeedCard";
import { useState } from "react";
import useUsers from "@/hooks/useUsers";

export default function Feed() {
  const { applicants, companies } = useUsers();
  console.log(applicants);
  console.log(companies);

  const searchParams = useSearchParams();
  const type = searchParams.get("type") as "client" | "company";
  const items = type === "client" ? companies : applicants;
  const displayType = type === "client" ? "company" : "client";

  const [currentIndex, setCurrentIndex] = useState(0);

  console.log(displayType);

  const handleReject = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleLikeSection = (section: string, content: string) => {
    // Here you would typically handle the like action
    console.log(`Liked ${section}: ${content}`);
    // Optionally show some animation or feedback
    // Could also store this information for matching purposes
  };

  if (items.length === 0) {
    return <div>No items found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 mb-16 max-w-2xl">
      <div className="relative">
        <FeedCard
          item={items[currentIndex]}
          type={displayType}
          onReject={handleReject}
          onLikeSection={handleLikeSection}
        />
      </div>
    </div>
  );
}
