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
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateProfile = async (data: UpdateProfileData) => {
    if (!token || !user) {
      setError("Authentication required");
      return;
    }
    setIsLoading(true);
    setError(null);

    try {
      // Update specific profile data based on user type
      if (user.applicantProfile) {
        await apiUpdateUserProfile(data.name, data.location, token);
        await apiUpdateApplicantProfile(
          user.applicantProfile.id,
          data.educationalExperiences || "",
          data.professionalExperiences || "",
          data.portfolioUrl || "",
          token
        );
        router.push(`/profile/${user.id}`);
      } else if (user.companyProfile) {
        await apiUpdateUserProfile(data.name, data.location, token);
        await apiUpdateCompanyProfile(
          user.companyProfile.id,
          data.yearsOfOperation || 0,
          data.employeeCount || 0,
          data.industry || "",
          data.fundingRound || "",
          token
        );
        router.push(`/profile/${user.id}`);
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
