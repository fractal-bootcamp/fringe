import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiUpdateApplicantProfile } from "@/api/apiApplicant";
import { apiUpdateCompanyProfile } from "@/api/apiCompany";
import { apiUpdateUserProfile } from "@/api/apiUser";
import useUser from "./useUser";
import { useAuthContext } from "@/contexts/AuthContext";

export interface UpdateProfileData {
  name: string;
  location: string;
  applicantId?: string;
  companyId?: string;
  professionalExperiences?: string;
  educationalExperiences?: string;
  portfolioUrl?: string;
  employeeCount?: number;
  yearsOfOperation?: number;
  industry?: string;
  fundingRound?: string;
}

export const useUpdate = () => {
  const { token } = useAuthContext();
  const router = useRouter();
  const { currentUser } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateProfile = async (data: UpdateProfileData) => {
    if (!token || !currentUser) {
      setError("Authentication required");
      return;
    }
    setIsLoading(true);
    setError(null);

    try {
      // Update specific profile data based on user type
      if (currentUser.applicantProfile) {
        await apiUpdateUserProfile(data.name, data.location, token);
        await apiUpdateApplicantProfile(
          currentUser.applicantProfile.id,
          data.educationalExperiences || "",
          data.professionalExperiences || "",
          data.portfolioUrl || "",
          token
        );
        router.push(`/profile/${currentUser.id}`);
      } else if (currentUser.companyProfile) {
        await apiUpdateUserProfile(data.name, data.location, token);
        await apiUpdateCompanyProfile(
          currentUser.companyProfile.id,
          data.yearsOfOperation || 0,
          data.employeeCount || 0,
          data.industry || "",
          data.fundingRound || "",
          token
        );
        router.push(`/profile/${currentUser.id}`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    updateProfile,
    isLoading,
    error,
  };
};
