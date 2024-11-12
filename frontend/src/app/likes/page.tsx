"use client";

import LikesYouPage from "@/components/LikesYouPage";
import useUsers from "@/hooks/useUsers";
import { userTypeStore } from "@/stores/userTypeStore";
import { User } from "@/types/types";

const Page = () => {
  const { userType } = userTypeStore();
  const { applicants, companies } = useUsers();
  const likesYouApplicants = applicants.map((applicant: User) => ({
    name: applicant.name,
    profilePhoto: applicant.profilePhotoIds[0],
  }));

  const likesYouCompanies = companies.map((company: User) => ({
    name: company.name,
    profilePhoto: company.profilePhotoIds[0],
  }));

  const likesYouUsers = userType === "applicant" ? likesYouCompanies : likesYouApplicants;

  return (
    <div className="p-2">
      <LikesYouPage likesYouUsers={likesYouUsers} />
    </div>
  );
};

export default Page;
