"use client";

import LikesYouPage from "@/components/LikesYouPage";
import useLikes from "@/hooks/useLikes";
import { useUser } from "@clerk/nextjs";

const Page = () => {
  const { likes } = useLikes();
  const { user } = useUser();
  console.log(user);

  return (
    <div className="p-2">
      <LikesYouPage likes={likes} />
    </div>
  );
};

export default Page;
