"use client";

import XSettingsPage from "@/components/XSettingsPage";
import useUser from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import React from "react";

const Page = () => {
  const { user, updateUserPhoto, currentPhotoUrl, isLoading } = useUser();
  const router = useRouter();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  const userProfile = {
    name: user.name,
    profilePhoto: currentPhotoUrl,
  };

  return (
    <div className="p-2">
      <XSettingsPage
        name={userProfile.name}
        image={userProfile.profilePhoto ?? ""}
        onUpdatePhoto={updateUserPhoto}
        onUpdateProfile={() => router.push("/update")}
        onLikesYou={() => router.push("/likes")}
        onMatches={() => router.push("/matches")}
      />
    </div>
  );
};

export default Page;
