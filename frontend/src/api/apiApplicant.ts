import axiosClient from "./axiosClient";

export const apiUpdateApplicantProfile = async (
  educationalExperiences: string,
  professionalExperiences: string,
  portfolioUrl: string,
  token: string
) => {
  const res = await axiosClient.post(
    `/applicant/update`,
    {
      educationalExperiences,
      professionalExperiences,
      portfolioUrl,
      yearsOfExperience: 0,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log(res.data);
  return;
};
