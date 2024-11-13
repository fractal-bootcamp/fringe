import React from "react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import {
  ExternalLinkIcon,
  CalendarIcon,
  BriefcaseIcon,
  DollarSignIcon,
  UsersIcon,
} from "lucide-react";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import Link from "next/link";
import { ProfileType } from "@/types/types";
// import { Separator } from "@radix-ui/react-separator";
// import { Separator } from "./ui/separator";

interface XProfilePageProps {
  profileType: ProfileType;
  name: string;
  location: string;
  image: string;
  applicantProps?: {
    experience: string;
    education: string;
    portfolio: {
      name: string;
      url: string;
    }[];
  };
  companyProps?: {
    yearsOfOperation: number;
    employeeCount: number;
    industry: string;
    fundingRound: string;
  };
}

const XProfilePage = ({
  profileType,
  name,
  image,
  location,
  applicantProps,
  companyProps,
}: XProfilePageProps) => {
  return (
    <Card className="shadow-none rounded-none">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{location}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className=" flex items-center justify-center">
          <img
            src={image}
            alt={name}
            className="object-cover rounded-full"
            width={150}
            height={150}
          />
        </div>

        {profileType === ProfileType.applicant && applicantProps ? (
          <>
            <div className="flex flex-col gap-2 p-4 border-[0.5px] shadow-sm rounded-lg">
              <Label>Experience</Label>
              <p className="text-xs font-thin">{applicantProps.experience}</p>
            </div>
            <div className="flex flex-col gap-2 p-4 border-[0.5px] shadow-sm rounded-lg">
              <Label>Education</Label>
              <p className="text-xs font-thin">{applicantProps.education}</p>
            </div>
            <div className="flex flex-col gap-2 p-4 border-[0.5px] shadow-sm rounded-lg">
              <Label>Portfolio</Label>
              <div className="flex flex-col gap-2">
                {applicantProps.portfolio.map((item) => (
                  <Button
                    key={item.name}
                    variant="outline"
                    className="w-full justify-between shadow-none border-[0.5px]"
                  >
                    <Link
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex justify-between w-full"
                    >
                      <span className="text-sm font-thin">{item.name}</span>
                      <ExternalLinkIcon className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                ))}
              </div>
            </div>
          </>
        ) : (
          <></>
        )}

        {profileType === ProfileType.company && companyProps ? (
          <>
            <div className="flex flex-col gap-2 p-4 border-[0.5px]">
              <Label>
                <UsersIcon className="inline w-4 h-4 mr-1" /> Employee Count
              </Label>
              <p className="text-xs font-thin">{companyProps.employeeCount}</p>
            </div>
            <div className="flex flex-col gap-2 p-4 border-[0.5px]">
              <Label>
                <CalendarIcon className="inline w-4 h-4 mr-1" /> Years of Operation
              </Label>
              <p className="text-xs font-thin">{companyProps.yearsOfOperation}</p>
            </div>
            <div className="flex flex-col gap-2 p-4 border-[0.5px]">
              <Label>
                <BriefcaseIcon className="inline w-4 h-4 mr-1" /> Industry
              </Label>
              <p className="text-xs font-thin">{companyProps.industry}</p>
            </div>
            <div className="flex flex-col gap-2 p-4 border-[0.5px]">
              <Label>
                <DollarSignIcon className="inline w-4 h-4 mr-1" /> Funding Round
              </Label>
              <p className="text-xs font-thin">{companyProps.fundingRound}</p>
            </div>
          </>
        ) : (
          <></>
        )}
      </CardContent>
    </Card>
  );
};

export default XProfilePage;
