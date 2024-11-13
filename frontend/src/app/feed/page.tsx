"use client";

import { useSearchParams } from "next/navigation";
import FeedCard from "@/components/FeedCard";
import { useState } from "react";
import useUsers from "@/hooks/useUsers";
import { useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function Feed() {
  const { isLoaded, userId, isSignedIn } = useAuth();
  const { applicants, companies } = useUsers();

  // Handle authentication
  if (!isLoaded) {
    return null;
  }
 
  if (!isSignedIn) {
    redirect("/sign-in");
  }

  const searchParams = useSearchParams();
  const type = searchParams.get("type") as "client" | "company";
  const items = (type === "client" ? companies : applicants).sort(
    (a, b) => Number(a.id) - Number(b.id)
  );

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleReject = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleLikeSection = (section: string, content: string) => {
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
}
