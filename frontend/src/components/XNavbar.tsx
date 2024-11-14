import React from "react";
import { Heart, House, MessageCircle, User } from "lucide-react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

interface XNavbarProps {
  pathHome: string;
  pathLikes: string;
  pathMatches: string;
  pathSettings: string;
  development?: boolean;
}

const XNavbar = ({ pathHome, pathLikes, pathMatches, pathSettings, development }: XNavbarProps) => {
  return (
    <div className="bg-black text-white fixed bottom-0 left-0 w-full flex items-center justify-center space-x-10 p-3">
      {/* Feed */}
      <Link href={pathHome}>
        <House />
      </Link>

      {/* Likes */}
      <Link href={pathLikes}>
        <Heart />
      </Link>

      {/* Matches */}

      <Link href={pathMatches}>
        <MessageCircle />
      </Link>

      {/* Settings */}
      <Link href={pathSettings}>
        <User />
      </Link>

      {!development && <UserButton afterSignOutUrl="/" />}
    </div>
  );
};

export default XNavbar;
