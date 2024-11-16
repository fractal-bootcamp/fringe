import { apiGetAllApplicantUsers, apiGetAllCompanyUsers } from "@/api/apiUser";
import { User } from "@/types/types";
import { useEffect } from "react";
import { useAuthContext } from "@/contexts/AuthContext";
import useUser from "@/hooks/useUser";
import storeFeed from "@/stores/storeFeed";

const useFeed = () => {
  const { token } = useAuthContext();
  const { currentUser } = useUser();
  const { feed, loadFeed } = storeFeed();

  const fetchFeed = async () => {
    if (!token || !currentUser) return;

    if (currentUser.profileType === "applicant") {
      const companyUsers: User[] = await apiGetAllCompanyUsers(token);
      loadFeed(companyUsers);
    } else if (currentUser.profileType === "company") {
      const applicantUsers: User[] = await apiGetAllApplicantUsers(token);
      loadFeed(applicantUsers);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, [token, currentUser]);

  return { feed };
};

export default useFeed;
