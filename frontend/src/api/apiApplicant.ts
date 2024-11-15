import axiosClient from "./axiosClient";

export const apiUpdateApplicantProfile = async (
  applicantId: string,
  educationalExperiences: string,
  professionalExperiences: string,
  portfolioUrl: string,
  token: string
) => {
  const res = await axiosClient.post(
    `/applicant/update`,
    {
      applicantId,
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
