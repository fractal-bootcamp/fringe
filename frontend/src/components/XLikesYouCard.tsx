import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Handshake, X } from "lucide-react";

interface XLikesYouCardProps {
  name: string;
  image: string;
  goToProfile: () => void;
  onMatch: () => void;
  onUnmatch: () => void;
}

const XLikesYouCard = ({ name, image, goToProfile, onMatch, onUnmatch }: XLikesYouCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription className="italic">Liked your profile</CardDescription>
      </CardHeader>
      <CardContent
        className="flex flex-row items-center justify-center cursor-pointer"
        onClick={goToProfile}
      >
        <Avatar className="w-20 h-20 rounded-lg">
          <AvatarImage src={image} alt={name} className="rounded-lg" />
          <AvatarFallback>{name.slice(0, 2)}</AvatarFallback>
        </Avatar>
      </CardContent>
      <CardFooter className="flex space-x-2">
        <Button onClick={onMatch} className="w-20 text-xs flex items-center justify-center">
          <Handshake />
        </Button>
        <Button onClick={onUnmatch} className="w-20 text-xs">
          <X />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default XLikesYouCard;
