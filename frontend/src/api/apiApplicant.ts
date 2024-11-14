// import { Prompt } from "@/types/types";
import axiosClient from "./axiosClient";

export const apiUpdateApplicantProfile = async (
  // yearsOfExperience: number,
  educationalExperiences: string,
  professionalExperiences: string,
  token: string
  // prompts: Prompt[]
) => {
  const response = await axiosClient.post(`/applicant/update`, {
    // yearsOfExperience,
    educationalExperiences,
    professionalExperiences,
    // prompts,
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
