import axiosClient from "./axiosClient";

export const apiUpdateCompanyProfile = async (
  companyId: string,
  yearsOfOperation: number,
  employeeCount: number,
  industry: string,
  fundingRound: string,
  token: string
) => {
  console.log("companyId");
  console.log(companyId);
  const response = await axiosClient.post(
    `/company/update`,
    {
      companyId,
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
  console.log(response);
  return response.data;
};
