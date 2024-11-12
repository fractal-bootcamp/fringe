"use client";

import ProfilePage from "@/components/ProfilePage";
import useUser from "@/hooks/useUser";
import React from "react";

const Page = () => {
  const { user } = useUser();
  if (!user) {
    return <div>Loading...</div>;
  }

  const userProfile = {
    name: user.name,
    profilePhoto: user.profilePhotoIds[0],
  };

  return (
    <div className="p-2">
      <ProfilePage name={userProfile.name} profilePhoto={userProfile.profilePhoto} />
    </div>
  );
};

export default Page;
