import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { ProfileType } from "@/types/types";
import { Button } from "./ui/button";

interface XUpdateProfileProps {
  profileType: ProfileType;
  onUpdateProfile: () => void;
}

const XUpdateProfile = ({ profileType, onUpdateProfile }: XUpdateProfileProps) => {
  return (
    <Card className="border-none shadow-none">
      <CardHeader>
        <CardTitle>Update Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Name</Label>
          <Input />
        </div>
        <div>
          <Label>Location</Label>
          <Input />
        </div>
        {/* Applicant */}
        {profileType === "applicant" && (
          <>
            {/* Experience */}
            <div>
              <Label>Experience</Label>
              <Textarea />
            </div>

            {/* Education */}
            <div>
              <Label>Education</Label>
              <Textarea />
            </div>

            {/* Portfolio */}
            <div className="space-y-2">
              <Label>Portfolio</Label>
              <div className="space-y-2">
                <Label className="font-thin">Portfolio Piece #1</Label>
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2 items-center">
                    <Label className="font-thin text-xs">Title</Label>
                    <Input />
                  </div>
                  <div className="flex gap-2 items-center">
                    <Label className="font-thin text-xs">Link</Label>
                    <Input />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="font-thin">Portfolio Piece #2</Label>
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2 items-center">
                    <Label className="font-thin text-xs">Title</Label>
                    <Input />
                  </div>
                  <div className="flex gap-2 items-center">
                    <Label className="font-thin text-xs">Link</Label>
                    <Input />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="font-thin">Portfolio Piece #3</Label>
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2 items-center">
                    <Label className="font-thin text-xs">Title</Label>
                    <Input />
                  </div>
                  <div className="flex gap-2 items-center">
                    <Label className="font-thin text-xs">Link</Label>
                    <Input />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        {/* Company */}
        {profileType === "company" && (
          <>
            <div>
              <Label>Employee Count</Label>
              <Input type="number" />
            </div>
            <div>
              <Label>Years of Operation</Label>
              <Input type="number" />
            </div>
            <div>
              <Label>Industry</Label>
              <Input />
            </div>
            <div>
              <Label>Funding Round</Label>
              <Input />
            </div>
          </>
        )}
        <Button onClick={onUpdateProfile} className="w-full">
          Update Profile
        </Button>
      </CardContent>
    </Card>
  );
};

export default XUpdateProfile;
