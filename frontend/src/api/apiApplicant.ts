// import { Prompt } from "@/types/types";
import axiosClient from "./axiosClient";

export const apiUpdateApplicantProfile = async (
  educationalExperiences: string,
  professionalExperiences: string,
  portfolioUrl: string,
  token: string
  // prompts: Prompt[]
) => {
  const response = await axiosClient.post(
    `/applicant/update`,
    {
      // yearsOfExperience,
      educationalExperiences,
      professionalExperiences,
      portfolioUrl,
      // prompts,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
