import { getAllUsers } from "@/api/apiUsers";
import { useEffect, useState } from "react";

const useUsers = () => {
  // const [users, setUsers] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [applicants, setApplicants] = useState([]);

  const fetchCompanies = async () => {
    const res = await getAllUsers();
    const resCompanies = res.filter((user: any) => user.companyProfile !== null);
    const resApplicants = res.filter((user: any) => user.applicantProfile !== null);

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
