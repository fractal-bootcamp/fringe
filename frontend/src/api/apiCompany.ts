import axiosClient from "./axiosClient";

export const apiUpdateCompanyProfile = async (
  yearsOfOperation: number,
  employeeCount: number,
  industry: string,
  fundingRound: string,
  token: string
) => {
  const response = await axiosClient.post(
    `/company/update`,
    {
      yearsOfOperation,
      employeeCount,
      industry,
      fundingRound,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
