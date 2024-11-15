import { apiGetAllUsers } from "@/api/apiUser";
import { User } from "@/types/types";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/contexts/AuthContext";
import useUser from "@/hooks/useUser";

const useUsers = () => {
  const [companies, setCompanies] = useState<User[]>([]);
  const [applicants, setApplicants] = useState<User[]>([]);
  const { token } = useAuthContext();
  const { currentUser } = useUser();

  const fetchUsers = async () => {
    if (!token || !currentUser) return;
    const res = await apiGetAllUsers(token);
    console.log(res);
    if (!res || res.length === 0) return;
    const resCompanies = res.filter((user: User) => user.profileType === "company");
    const resApplicants = res.filter((user: User) => user.profileType === "applicant");

    setCompanies(resCompanies);
    setApplicants(resApplicants);
  };

  useEffect(() => {
    fetchUsers();
  }, [token, currentUser]);

  return { companies, applicants };
};

export default useUsers;
