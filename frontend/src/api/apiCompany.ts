import { Prompt } from "@/types/types";
import axiosClient from "./axiosClient";

export const apiUpdateCompanyProfile = async (
  id: string,
  yearsOfOperation: number,
  employeeCount: number,
  industry: string,
  fundingRound: string,
  prompts: Prompt[]
) => {
  const response = await axiosClient.post(`/company/update/${id}`, {
    yearsOfOperation,
    employeeCount,
    industry,
    fundingRound,
    prompts,
  });
  return response.data;
};
