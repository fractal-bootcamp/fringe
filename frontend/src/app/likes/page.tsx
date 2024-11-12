"use client";

import LikesYouPage from "@/components/LikesYouPage";
import useLikes from "@/hooks/useLikes";

const Page = () => {
  const { likes } = useLikes();

  return (
    <div className="p-2">
      <LikesYouPage likes={likes} />
    </div>
  );
};

export default Page;
