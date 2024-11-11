"use client";

import { useState } from "react";
import UpdateProfileField, { UpdateProfileFieldProps } from "./UpdateProfileField";

const UpdateProfile = () => {
  const [profilePhoto, setProfilePhoto] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("");
  const [education, setEducation] = useState("");
  const [prompts, setPrompts] = useState("");

  const updateProfileFields: UpdateProfileFieldProps[] = [
    { title: "Profile Photo", value: profilePhoto, callback: setProfilePhoto },
    { title: "Name", value: name, callback: setName },
    { title: "Role", value: role, callback: setRole },
    { title: "Location", value: location, callback: setLocation },
    { title: "Experience", value: experience, callback: setExperience },
    { title: "Education", value: education, callback: setEducation },
    { title: "Prompts", value: prompts, callback: setPrompts },
  ];

  return (
    <div>
      {updateProfileFields.map((field, key) => (
        <UpdateProfileField
          key={key}
          title={field.title}
          value={field.value}
          callback={field.callback}
        />
      ))}
    </div>
  );
};

export default UpdateProfile;
