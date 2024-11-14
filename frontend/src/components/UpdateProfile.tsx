"use client";

import { useState } from "react";
import UpdateProfileField, { UpdateProfileFieldProps } from "./UpdateProfileField";
import { userTypeStore } from "@/stores/userTypeStore";
import { ProfileType } from "@/types/types";
import { useUpdate } from "@/hooks/useUpdate";


const UpdateProfile = () => {
  const { userType } = userTypeStore();

  // General
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [profileType, setProfileType] = useState<string>(ProfileType.applicant);
  const { updateProfile, isLoading, error } = useUpdate();



  const fieldsGeneral: UpdateProfileFieldProps[] = [
    { title: "Name", value: name, callback: setName },
    { title: "Location", value: location, callback: setLocation },
    { title: "Profile Type", value: profileType, callback: setProfileType },
    // {
    //   title: "Profile Photos",
    //   value: profilePhotoIds,
    //   callback: setProfilePhotoIds,
    //   type: "image",
    //   onImageUpload: handleImageUpload,
    // },
  ];

  // Applicant
  const [professionalExperiences, setProfessionalExperiences] = useState("");
  const [educationalExperiences, setEducationalExperiences] = useState("");

  const fieldsApplicant: UpdateProfileFieldProps[] = [
    { title: "Role", value: professionalExperiences, callback: setProfessionalExperiences },
    { title: "Experience", value: educationalExperiences, callback: setEducationalExperiences },
  ];

  // Company
  // const [yearsOfOperation, setYearsOfOperation] = useState("");
  // const [employeeCount, setEmployeeCount] = useState("");
  const [industry, setIndustry] = useState("");
  const [fundingRound, setFundingRound] = useState("");

  const fieldsCompany: UpdateProfileFieldProps[] = [
    // { title: "Years of Operation", value: yearsOfOperation, callback: setYearsOfOperation },
    // { title: "Employee Count", value: employeeCount, callback: setEmployeeCount },
    { title: "Industry", value: industry, callback: setIndustry },
    { title: "Funding Round", value: fundingRound, callback: setFundingRound },
  ];

  // Update Profile Fields
  const updateProfileFields =
    userType === "applicant"
      ? [...fieldsApplicant, ...fieldsGeneral]
      : [...fieldsCompany, ...fieldsGeneral];

  const handleSubmit = async () => {
    await updateProfile({
      name,
      location,
      professionalExperiences,
      educationalExperiences,
      industry,
      fundingRound,
    });
  };

  return (
    <div className="w-full flex flex-col space-y-4">
      {updateProfileFields.map((field, key) => (
        <UpdateProfileField
          key={key}
          title={field.title}
          value={field.value}
          callback={field.callback}
          type={field.type}
          onImageUpload={field.onImageUpload}
        />
      ))}
      <button onClick={handleSubmit} className="bg-blue-500 text-white p-2 rounded-md">
        Submit
      </button>
    </div>
  );
};

export default UpdateProfile;
