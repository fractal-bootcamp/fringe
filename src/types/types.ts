import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export interface Prompt {
  question: string;
  answer: string;
}

// Companies
type Industry = "software" | "finance" | "design";
type FundingRound = "seed" | "seriesA" | "seriesB" | "seriesC";

export interface Company {
  id: string;
  name: string;
  location: string;
  yearsOfOperation: number;
  employeeCount: number;
  industry: Industry;
  fundingRound: FundingRound;
  profilePhotoIds: string[];
  prompts: Prompt[];
}

// Applicants
export interface Applicant {
  id: string;
  name: string;
  location: string;
  yearsOfExperience: number;
  educationalExperiences: string[];
  professionalExperiences: string[];
  profilePhotoIds: string[];
  prompts: Prompt[];
}

// Navigation
export interface NavigationItem {
  title: string;
  path: string;
  iconDefinition: IconDefinition;
}
