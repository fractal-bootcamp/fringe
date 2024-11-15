"use client";

import XUpdateProfile from "@/components/XUpdateProfile";
import { useUpdate } from "@/hooks/useUpdate";
import useUser from "@/hooks/useUser";

const Page = () => {
  const { currentUser } = useUser();
  const { updateProfile } = useUpdate();

  if (!currentUser) {
    return null;
  }

  return (
    <div className="p-2">
      <XUpdateProfile profileType={currentUser.profileType} onUpdateProfile={updateProfile} />
    </div>
  );
};

export default Page;
