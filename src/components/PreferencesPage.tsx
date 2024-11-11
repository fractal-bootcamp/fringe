"use client";

import { Preference } from "@/types/types";
import PreferenceIndividual from "./PreferenceIndividual";
import { userTypeStore } from "@/stores/userTypeStore";
import { preferencesApplicant, preferencesCompany } from "@/api/dataPreferences";

const PreferencesPage = () => {
  const { userType } = userTypeStore();
  const preferences: Preference[] =
    userType === "applicant" ? preferencesApplicant : preferencesCompany;
  return (
    <div>
      <div className="font-bold">Preferences</div>
      <div className="flex flex-col space-y-2">
        {preferences.map((pref, key) => (
          <PreferenceIndividual key={key} preference={pref} />
        ))}
      </div>
    </div>
  );
};

export default PreferencesPage;
