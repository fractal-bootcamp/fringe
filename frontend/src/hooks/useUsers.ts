import { apiGetAllUsers } from "@/api/apiUser";
import { User } from "@/types/types";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/contexts/AuthContext";
import useUser from "@/hooks/useUser";
const useUsers = () => {
  const [companies, setCompanies] = useState<User[]>([]);
  const [applicants, setApplicants] = useState<User[]>([]);
  const { token } = useAuthContext();
  const { user } = useUser();

  const fetchUsers = async () => {
    if (!token || !user) return;
    const res = await apiGetAllUsers(token);
    if (res.length === 0) return;
    const resCompanies = res.filter((user: User) => user.profileType === "company");
    const resApplicants = res.filter((user: User) => user.profileType === "applicant");

    setCompanies(resCompanies);
    setApplicants(resApplicants);
  };

  useEffect(() => {
    fetchUsers();
  }, [token, user]);

  return { companies, applicants };
};

export default useUsers;
