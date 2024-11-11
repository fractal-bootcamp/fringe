import { Preference } from "@/types/types";
import PreferenceIndividual from "./PreferenceIndividual";

const preferences: Preference[] = [
  { title: "role", type: "categorical", options: ["CEO", "CTO", "CFO"] },
  { title: "industry", type: "categorical", options: ["Tech", "Finance", "Healthcare"] },
  { title: "location", type: "categorical", options: ["New York", "San Francisco", "Chicago"] },
  // { title: "years of operation", type: "numerical", range: [1, 100] },
  // { title: "employees", type: "numerical", range: [1, 10000] },
  { title: "funding round", type: "categorical", options: ["Series A", "Series B", "Series C"] },
];

const PreferencesPage = () => {
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
