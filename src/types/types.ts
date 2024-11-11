import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface Prompt {
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

// Aplicants
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

// Dummy data for applicants
const dummyApplicants: Applicant[] = [
  {
    id: "1",
    name: "Alice Smith",
    location: "New York, NY",
    yearsOfExperience: 5,
    educationalExperiences: ["BSc Computer Science", "MSc Software Engineering"],
    professionalExperiences: [
      "Software Engineer at TechCorp",
      "Frontend Developer at WebSolutions",
    ],
    profilePhotoIds: ["photo1", "photo2"],
    prompts: [
      { question: "What is your greatest strength?", answer: "Problem-solving skills." },
      { question: "Why do you want to work here?", answer: "I admire the company's innovation." },
    ],
  },
  {
    id: "2",
    name: "Bob Johnson",
    location: "San Francisco, CA",
    yearsOfExperience: 3,
    educationalExperiences: ["BSc Information Technology"],
    professionalExperiences: ["Junior Developer at CodeFactory"],
    profilePhotoIds: ["photo3"],
    prompts: [
      { question: "What motivates you?", answer: "Learning new technologies." },
      { question: "Describe a challenge you faced.", answer: "I improved a slow process." },
    ],
  },
  // ... add 8 more applicants ...
];
