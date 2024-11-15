import React from "react";
import { Card, CardTitle, CardHeader, CardContent } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { PenTool, Handshake, MessageCircle } from "lucide-react";

interface XSettingsPageProps {
  name: string;
  image: string;
  onUpdatePhoto: (photo: File) => void;
  onUpdateProfile: () => void;
  onLikesYou: () => void;
  onMatches: () => void;
}

const XSettingsPage = ({
  name,
  image,
  onUpdatePhoto,
  onUpdateProfile,
  onLikesYou,
  onMatches,
}: XSettingsPageProps) => {
  const handlePhotoClick = () => {
    const photoInput = document.getElementById("photoInput");
    if (photoInput) {
      photoInput.click();
    }
  };

  const handlePhotoChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const photo = event.target.files?.[0];
    if (photo) {
      onUpdatePhoto(photo);
    }
  };

  return (
    <Card className="border-none shadow-none">
      <CardHeader className="flex flex-col items-center gap-2">
        <Avatar className="h-24 w-24" onClick={handlePhotoClick}>
          <AvatarImage src={image} />
          <input type="file" className="hidden" id="photoInput" onChange={handlePhotoChange} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 text-left">
        <Button onClick={onUpdateProfile} className="flex justify-start" variant="outline">
          <PenTool className="mr-2" />
          <p>Update Profile</p>
        </Button>
        <Button onClick={onLikesYou} className="flex justify-start" variant="outline">
          <Handshake className="mr-2" />
          <p>Likes You</p>
        </Button>
        <Button onClick={onMatches} className="flex justify-start" variant="outline">
          <MessageCircle className="mr-2" />
          <p>Matches</p>
        </Button>
      </CardContent>
    </Card>
  );
};

export default XSettingsPage;
