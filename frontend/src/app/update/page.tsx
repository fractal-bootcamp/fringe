"use client";

import XUpdateProfile from "@/components/XUpdateProfile";
import { useUpdate } from "@/hooks/useUpdate";
import useUser from "@/hooks/useUser";

const Page = () => {
  const { user } = useUser();
  const { updateProfile } = useUpdate();

  if (!user) {
    return null;
  }

  return (
    <div className="p-2">
      <XUpdateProfile profileType={user.profileType} onUpdateProfile={updateProfile} />
    </div>
  );
};

export default Page;
