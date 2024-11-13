"use client";

import ProfilePage from "@/components/ProfilePage";
import useUser from "@/hooks/useUser";
import React from "react";

const Page = () => {
  const { user, updateUserPhoto, currentPhotoUrl } = useUser();

  if (!user) {
    return <div>Loading...</div>;
  }

  const userProfile = {
    name: user.name,
    profilePhoto: currentPhotoUrl,
  };

  return (
    <div className="p-2">
      <ProfilePage 
        name={userProfile.name} 
        profilePhoto={userProfile.profilePhoto}
        onPhotoUpdate={updateUserPhoto}
      />
    </div>
  );
};

export default Page;
