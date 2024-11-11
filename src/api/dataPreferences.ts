import { Preference } from "@/types/types";

export const preferencesApplicant: Preference[] = [
  { title: "role", type: "categorical", options: ["CEO", "CTO", "CFO"] },
  { title: "industry", type: "categorical", options: ["Tech", "Finance", "Healthcare"] },
  { title: "location", type: "categorical", options: ["New York", "San Francisco", "Chicago"] },
  // { title: "years of operation", type: "numerical", range: [1, 100] },
  // { title: "employees", type: "numerical", range: [1, 10000] },
  { title: "funding round", type: "categorical", options: ["Series A", "Series B", "Series C"] },
];

export const preferencesCompany: Preference[] = [
  { title: "role", type: "categorical", options: ["CEO", "CTO", "CFO"] },
  { title: "industry", type: "categorical", options: ["Tech", "Finance", "Healthcare"] },
  { title: "location", type: "categorical", options: ["New York", "San Francisco", "Chicago"] },
  {
    title: "educational experiences",
    type: "categorical",
    options: ["Harvard", "Stanford", "MIT"],
  },
  {
    title: "professional experiences",
    type: "categorical",
    options: ["Google", "Apple", "Amazon"],
  },
];
