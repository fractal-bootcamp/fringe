import { getAllUsers } from "@/api/apiUsers";
import { User } from "@/types/types";
import { useEffect, useState } from "react";

const useUsers = () => {
  // const [users, setUsers] = useState([]);
  const [companies, setCompanies] = useState<User[]>([]);
  const [applicants, setApplicants] = useState<User[]>([]);

  const fetchCompanies = async () => {
    const res = await getAllUsers();
    const resCompanies = res.filter((user: User) => user.companyProfile !== null);
    const resApplicants = res.filter((user: User) => user.applicantProfile !== null);

    setCompanies(resCompanies);
    setApplicants(resApplicants);
  };

  useEffect(() => {
    fetchCompanies();
    console.log(applicants);
    console.log(companies);
  }, []);

  return { companies, applicants };
};

export default useUsers;
