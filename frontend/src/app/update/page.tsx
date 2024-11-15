"use client";

import XUpdateProfile from "@/components/XUpdateProfile";
import { useUpdate } from "@/hooks/useUpdate";
import useUser from "@/hooks/useUser";

const Page = () => {
  const { currentUser } = useUser();
  const { updateProfile } = useUpdate();

  if (!currentUser) {
    return null;
  }

  const { name, location, applicantProfile, companyProfile, profileType } = currentUser;

  console.log(currentUser);

  return (
    <div className="p-2">
      {applicantProfile && (
        <XUpdateProfile
          nameInput={name}
          locationInput={location}
          experienceInput={applicantProfile.professionalExperiences}
          educationInput={applicantProfile.educationalExperiences}
          portfolioUrlInput={applicantProfile.portfolioUrl}
          profileType={profileType}
          onUpdateProfile={updateProfile}
        />
      )}

      {companyProfile && (
        <XUpdateProfile
          nameInput={name}
          locationInput={location}
          employeeCountInput={companyProfile.employeeCount}
          yearsOfOperationInput={companyProfile.yearsOfOperation}
          industryInput={companyProfile.industry}
          fundingRoundInput={companyProfile.fundingRound}
          profileType={profileType}
          onUpdateProfile={updateProfile}
        />
      )}
    </div>
  );
};

export default Page;
