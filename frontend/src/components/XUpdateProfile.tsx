import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { ProfileType } from "@/types/types";
import { Button } from "./ui/button";
import { UpdateProfileData } from "@/hooks/useUpdate";

interface XUpdateProfileProps {
  profileType: ProfileType;
  onUpdateProfile?: (profileData: UpdateProfileData) => Promise<void>;
}

const XUpdateProfile = ({ profileType, onUpdateProfile }: XUpdateProfileProps) => {
  // General
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

  // Applicant
  const [experience, setExperience] = useState("");
  const [education, setEducation] = useState("");
  const [portfolioUrl, setPortfolioUrl] = useState("");

  // Company
  const [employeeCount, setEmployeeCount] = useState(0);
  const [yearsOfOperation, setYearsOfOperation] = useState(0);
  const [industry, setIndustry] = useState("");
  const [fundingRound, setFundingRound] = useState("");

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      profileType === "applicant" &&
      onUpdateProfile &&
      name !== "" &&
      location !== "" &&
      experience !== "" &&
      education !== "" &&
      portfolioUrl !== ""
    ) {
      await onUpdateProfile({
        name,
        location,
        professionalExperiences: experience,
        educationalExperiences: education,
        portfolioUrl,
      });
      setName("");
      setLocation("");
      setExperience("");
      setEducation("");
      setPortfolioUrl("");
    } else if (
      profileType === "company" &&
      onUpdateProfile &&
      name !== "" &&
      location !== "" &&
      employeeCount !== 0 &&
      yearsOfOperation !== 0 &&
      industry !== "" &&
      fundingRound !== ""
    ) {
      await onUpdateProfile({
        name,
        location,
        employeeCount,
        yearsOfOperation,
        industry,
        fundingRound,
      });
      setName("");
      setLocation("");
      setEmployeeCount(0);
      setYearsOfOperation(0);
      setIndustry("");
      setFundingRound("");
    }
  };

  return (
    <Card className="border-none shadow-none">
      <CardHeader>
        <CardTitle>Update Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <form className="space-y-4" onSubmit={handleUpdateProfile}>
          <div>
            <Label>Name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <Label>Location</Label>
            <Input value={location} onChange={(e) => setLocation(e.target.value)} />
          </div>
          {/* Applicant */}
          {profileType === "applicant" && (
            <>
              {/* Experience */}
              <div>
                <Label>Experience</Label>
                <Textarea value={experience} onChange={(e) => setExperience(e.target.value)} />
              </div>

              {/* Education */}
              <div>
                <Label>Education</Label>
                <Textarea value={education} onChange={(e) => setEducation(e.target.value)} />
              </div>

              {/* Portfolio */}
              <div>
                <Label>Portfolio Link</Label>
                <Input value={portfolioUrl} onChange={(e) => setPortfolioUrl(e.target.value)} />
              </div>
            </>
          )}
          {/* Company */}
          {profileType === "company" && (
            <>
              <div>
                <Label>Employee Count</Label>
                <Input
                  type="number"
                  value={employeeCount}
                  onChange={(e) => setEmployeeCount(parseInt(e.target.value))}
                />
              </div>
              <div>
                <Label>Years of Operation</Label>
                <Input
                  type="number"
                  value={yearsOfOperation}
                  onChange={(e) => setYearsOfOperation(parseInt(e.target.value))}
                />
              </div>
              <div>
                <Label>Industry</Label>
                <Input value={industry} onChange={(e) => setIndustry(e.target.value)} />
              </div>
              <div>
                <Label>Funding Round</Label>
                <Input value={fundingRound} onChange={(e) => setFundingRound(e.target.value)} />
              </div>
            </>
          )}
          <Button type="submit" className="w-full">
            Update Profile
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default XUpdateProfile;
