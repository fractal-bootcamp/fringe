import { dummyApplicants } from "@/api/dummyApplicants";
import { dummyCompanies } from "@/api/dummyCompanies";
import ProfilePage from "@/components/ProfilePage";
import React from "react";

const Page = () => {
  const applicantProfile = {
    name: dummyApplicants[0].name,
    profilePhoto: dummyApplicants[0].profilePhotoIds[0],
  };
  const companyProfile = {
    name: dummyCompanies[0].name,
    profilePhoto: dummyCompanies[0].profilePhotoIds[0],
  };
  return (
    <div className="p-2">
      <ProfilePage name={applicantProfile.name} profilePhoto={applicantProfile.profilePhoto} />
    </div>
  );
};

export default Page;
