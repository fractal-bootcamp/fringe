"use client";

import React, { useState } from "react";
import { Preference } from "./PreferencesPage";

interface PreferenceIndividualProps {
  preference: Preference;
}

const PreferenceIndividual = ({ preference }: PreferenceIndividualProps) => {
  const { title, type, options } = preference;
  const [selected, setSelected] = useState<string>();

  return (
    <div>
      <div>{title}</div>
      {type === "categorical" && options && (
        <div className="flex flex-row space-x-2">
          {options.map((option, key) => (
            <button
              className={`rounded-lg border border-gray-300 p-2 ${
                selected === option ? "bg-sky-200" : ""
              }`}
              key={key}
              onClick={() => setSelected(option)}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PreferenceIndividual;
