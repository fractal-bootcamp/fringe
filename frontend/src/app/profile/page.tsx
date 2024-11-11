"use client";

import { dummyApplicants } from "@/api/dummyApplicants";
import { dummyCompanies } from "@/api/dummyCompanies";
import ProfilePage from "@/components/ProfilePage";
import { userTypeStore } from "@/stores/userTypeStore";
import React from "react";

const Page = () => {
  const { userType } = userTypeStore();
  const applicantProfile = {
    name: dummyApplicants[0].name,
    profilePhoto: dummyApplicants[0].profilePhotoIds[0],
  };
  const companyProfile = {
    name: dummyCompanies[0].name,
    profilePhoto: dummyCompanies[0].profilePhotoIds[0],
  };

  const userProfile = userType === "applicant" ? applicantProfile : companyProfile;
  return (
    <div className="p-2">
      <ProfilePage name={userProfile.name} profilePhoto={userProfile.profilePhoto} />
    </div>
  );
};

export default Page;
