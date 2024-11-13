import { apiGetAllUsers } from "@/api/apiUser";
import { User } from "@/types/types";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/contexts/AuthContext";
const useUsers = () => {
  // const [users, setUsers] = useState([]);
  const [companies, setCompanies] = useState<User[]>([]);
  const [applicants, setApplicants] = useState<User[]>([]);
  const { token } = useAuthContext();
  const fetchUsers = async () => {
    if (!token) return;
    const res = await apiGetAllUsers(token);
    const resCompanies = res.filter((user: User) => user.profileType === "company");
    const resApplicants = res.filter((user: User) => user.profileType === "applicant");

    setCompanies(resCompanies);
    setApplicants(resApplicants);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return { companies, applicants };
};

export default useUsers;
