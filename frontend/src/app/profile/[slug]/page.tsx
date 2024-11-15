"use client";

import { apiGetUser } from "@/api/apiUser";
import XProfilePage from "@/components/XProfilePage";
import { useAuthContext } from "@/contexts/AuthContext";
import { User } from "@/types/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const { slug } = useParams<{ slug: string }>();
  const [user, setUser] = useState<User | null>();
  const { token } = useAuthContext();

  useEffect(() => {
    if (!token) {
      return;
    }

    const fetchUser = async () => {
      const fetchedUser = await apiGetUser(slug, token);
      setUser(fetchedUser);
    };
    fetchUser();
  }, [token]);

  if (!token || !user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {user.applicantProfile && (
        <XProfilePage
          profileType={user.profileType}
          name={user.name}
          image={user.profilePhotoIds[0]}
          location={user.location}
          applicantProps={{
            experience: user.applicantProfile.professionalExperiences,
            education: user.applicantProfile.educationalExperiences,
            portfolioUrl: user.applicantProfile.portfolioUrl,
          }}
        />
      )}

      {user.companyProfile && (
        <XProfilePage
          profileType={user.profileType}
          name={user.name}
          image={user.profilePhotoIds[0]}
          location={user.location}
          companyProps={user.companyProfile}
        />
      )}
    </div>
  );
};

export default Page;
