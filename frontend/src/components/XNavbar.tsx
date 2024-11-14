import React from "react";
import { Button } from "./ui/button";
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
    <div className="bg-black text-white fixed bottom-0 left-0 w-full flex items-center justify-center space-x-6 p-2">
      {/* Feed */}
      <Button variant="ghost">
        <Link href={pathHome}>
          <House />
        </Link>
      </Button>

      {/* Likes */}
      <Button variant="ghost">
        <Link href={pathLikes}>
          <Heart />
        </Link>
      </Button>

      {/* Matches */}
      <Button variant="ghost">
        <Link href={pathMatches}>
          <MessageCircle />
        </Link>
      </Button>

      {/* Settings */}
      <Button variant="ghost">
        <Link href={pathSettings}>
          <User />
        </Link>
      </Button>

      {!development && <UserButton afterSignOutUrl="/" />}
    </div>
  );
};

export default XNavbar;
