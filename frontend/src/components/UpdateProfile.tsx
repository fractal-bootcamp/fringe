"use client";

import { useState } from "react";
import UpdateProfileField, { UpdateProfileFieldProps } from "./UpdateProfileField";
import { userTypeStore } from "@/stores/userTypeStore";

const UpdateProfile = () => {
  const { userType } = userTypeStore();

  // Applicant
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");
  const [education, setEducation] = useState("");

  const fieldsApplicant: UpdateProfileFieldProps[] = [
    { title: "Role", value: role, callback: setRole },
    { title: "Experience", value: experience, callback: setExperience },
    { title: "Education", value: education, callback: setEducation },
  ];

  // Company
  const [yearsOfOperation, setYearsOfOperation] = useState("");
  const [employeeCount, setEmployeeCount] = useState("");
  const [industry, setIndustry] = useState("");
  const [fundingRound, setFundingRound] = useState("");

  const fieldsCompany: UpdateProfileFieldProps[] = [
    { title: "Years of Operation", value: yearsOfOperation, callback: setYearsOfOperation },
    { title: "Employee Count", value: employeeCount, callback: setEmployeeCount },
    { title: "Industry", value: industry, callback: setIndustry },
    { title: "Funding Round", value: fundingRound, callback: setFundingRound },
  ];

  // General
  const [profilePhoto, setProfilePhoto] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

  const handleImageUpload = (file: File) => {
    // TODO: Implement actual image upload logic
    const imageUrl = URL.createObjectURL(file);
    setProfilePhoto(imageUrl);
  };

  const fieldsGeneral: UpdateProfileFieldProps[] = [
    { 
      title: "Profile Photo", 
      value: profilePhoto, 
      callback: setProfilePhoto,
      type: "image",
      onImageUpload: handleImageUpload 
    },
    { title: "Name", value: name, callback: setName },
    { title: "Location", value: location, callback: setLocation },
  ];

  const updateProfileFields =
    userType === "applicant"
      ? [...fieldsApplicant, ...fieldsGeneral]
      : [...fieldsCompany, ...fieldsGeneral];

  return (
    <div className="w-full">
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
    </div>
  );
};

export default UpdateProfile;
