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
  updateHeader: (newHeader: string) => void;
}

const XNavbar = ({
  pathHome,
  pathLikes,
  pathMatches,
  pathSettings,
  development,
  updateHeader,
}: XNavbarProps) => {
  return (
    <div className="bg-black text-white fixed bottom-0 left-0 w-full flex items-center justify-center space-x-10 p-3">
      {/* Feed */}
      <Link href={pathHome} onClick={() => updateHeader("Discover")}>
        <House />
      </Link>

      {/* Likes */}
      <Link href={pathLikes} onClick={() => updateHeader("Likes You")}>
        <Heart />
      </Link>

      {/* Matches */}

      <Link href={pathMatches} onClick={() => updateHeader("Matches")}>
        <MessageCircle />
      </Link>

      {/* Settings */}
      <Link href={pathSettings} onClick={() => updateHeader("Settings")}>
        <User />
      </Link>

      {!development && <UserButton afterSignOutUrl="/" />}
    </div>
  );
};

export default XNavbar;
