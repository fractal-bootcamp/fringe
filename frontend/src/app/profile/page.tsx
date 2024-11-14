"use client";

import ProfilePage from "@/components/ProfilePage";
import useUser from "@/hooks/useUser";
import React from "react";

const Page = () => {
  const { user, updateUserPhoto, currentPhotoUrl, isLoading } = useUser();

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
      <ProfilePage
        name={userProfile.name}
        profilePhoto={userProfile.profilePhoto ?? ""}
        onPhotoUpdate={updateUserPhoto}
      />
    </div>
  );
};

export default Page;
