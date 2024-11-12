"use client";

import LikesYouPage from "@/components/LikesYouPage";
import useLikes from "@/hooks/useLikes";

const Page = () => {
  const { likesUsers } = useLikes();

  return (
    <div className="p-2">
      <LikesYouPage likesYouUsers={likesUsers} />
    </div>
  );
};

export default Page;
