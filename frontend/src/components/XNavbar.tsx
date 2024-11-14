import React from "react";
import { Button } from "./ui/button";
import { Heart, House, MessageCircle, User } from "lucide-react";
import Link from "next/link";

interface XNavbarProps {
  pathHome: string;
  pathLikes: string;
  pathMatches: string;
  pathSettings: string;
}

const XNavbar = ({ pathHome, pathLikes, pathMatches, pathSettings }: XNavbarProps) => {
  return (
    <div className="bg-black text-white fixed bottom-0 left-0 w-full flex items-center justify-center space-x-10 p-2">
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
    </div>
  );
};

export default XNavbar;
