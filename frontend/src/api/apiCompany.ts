// import { Prompt } from "@/types/types";
import axiosClient from "./axiosClient";

export const apiUpdateCompanyProfile = async (
  yearsOfOperation: number,
  employeeCount: number,
  industry: string,
  fundingRound: string,
  token: string
  // prompts: Prompt[]
) => {
  const response = await axiosClient.post(
    `/company/update`,
    {
      yearsOfOperation,
      employeeCount,
      industry,
      fundingRound,
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
