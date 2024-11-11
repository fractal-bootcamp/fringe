"use client";

import { dummyApplicants } from "@/api/dummyApplicants";
import { dummyCompanies } from "@/api/dummyCompanies";
import LikesYouPage from "@/components/LikesYouPage";
import { userTypeStore } from "@/stores/userTypeStore";

const Page = () => {
  const { userType } = userTypeStore();
  const likesYouApplicants = dummyApplicants.map((applicant) => ({
    name: applicant.name,
    profilePhoto: applicant.profilePhotoIds[0],
  }));

  const likesYouCompanies = dummyCompanies.map((company) => ({
    name: company.name,
    profilePhoto: company.profilePhotoIds[0],
  }));

  const likesYouUsers = userType === "applicant" ? likesYouCompanies : likesYouApplicants;

  return (
    <div>
      <LikesYouPage likesYouUsers={likesYouUsers} />
    </div>
  );
};

export default Page;
