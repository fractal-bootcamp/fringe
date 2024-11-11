import { dummyApplicants } from "@/api/dummyApplicants";
import LikesYouPage from "@/components/LikesYouPage";

const Page = () => {
  const likesYouApplicants = dummyApplicants.map((applicant) => ({
    name: applicant.name,
    profilePhoto: applicant.profilePhotoIds[0],
  }));
  return (
    <div>
      <LikesYouPage likesYouUsers={likesYouApplicants} />
    </div>
  );
};

export default Page;
