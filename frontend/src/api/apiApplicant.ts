// import { Prompt } from "@/types/types";
import axiosClient from "./axiosClient";

export const apiUpdateApplicantProfile = async (
  id: string,
  // yearsOfExperience: number,
  educationalExperiences: string,
  professionalExperiences: string
  // prompts: Prompt[]
) => {
  const response = await axiosClient.post(`/applicant/update/${id}`, {
    // yearsOfExperience,
    educationalExperiences,
    professionalExperiences,
    // prompts,
  });
  return response.data;
};
