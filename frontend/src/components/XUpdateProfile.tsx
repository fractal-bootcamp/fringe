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
    <Card>
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
            <div>
              <Label>Experience</Label>
              <Textarea />
            </div>
            <div>
              <Label>Education</Label>
              <Textarea />
            </div>
          </>
        )}
        {/* Company */}
        {profileType === "company" && (
          <>
            <div>
              <Label>Employee Count</Label>
              <Input />
            </div>
            <div>
              <Label>Years of Operation</Label>
              <Input />
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
        <Button onClick={onUpdateProfile}>Update Profile</Button>
      </CardContent>
    </Card>
  );
};

export default XUpdateProfile;
