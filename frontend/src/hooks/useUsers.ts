import { apiGetAllUsers } from "@/api/apiUser";
import { User } from "../../../shared/schema";
import { useEffect, useState } from "react";

const useUsers = () => {
  // const [users, setUsers] = useState([]);
  const [companies, setCompanies] = useState<User[]>([]);
  const [applicants, setApplicants] = useState<User[]>([]);

  const fetchUsers = async () => {
    const res = await apiGetAllUsers();
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
