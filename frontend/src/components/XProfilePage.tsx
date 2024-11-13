import React from "react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { ExternalLinkIcon } from "lucide-react";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import Link from "next/link";
// import { Separator } from "./ui/separator";

interface XProfilePageProps {
  name: string;
  location: string;
  experience: string;
  education: string;
  portfolio: {
    name: string;
    url: string;
  }[];
  image: string;
}

const XProfilePage = ({
  name,
  location,
  experience,
  education,
  portfolio,
  image,
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
        {/* <Separator /> */}
        <div className="flex flex-col gap-2 p-4 border-[0.5px]">
          <Label>Experience</Label>
          <p className="text-xs">{experience}</p>
        </div>
        {/* <Separator /> */}
        <div className="flex flex-col gap-2 p-4 border-[0.5px]">
          <Label>Education</Label>
          <p className="text-xs">{education}</p>
        </div>
        {/* <Separator /> */}
        <div className="flex flex-col gap-2 p-4 border-[0.5px]">
          <Label>Portfolio</Label>
          <div className="flex flex-col gap-2">
            {portfolio.map((item) => (
              <Button
                key={item.name}
                variant="outline"
                className="w-full justify-between shadow-none rounded-none border-[0.5px]"
                asChild
              >
                <Link href={item.url} target="_blank" rel="noopener noreferrer">
                  <span className="text-sm font-thin">{item.name}</span>
                  <ExternalLinkIcon className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default XProfilePage;
