import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

// Navigation
export interface NavigationItem {
  title: string;
  path: string;
  iconDefinition: IconDefinition;
}

// Users
export interface User {
  id: string;
  name: string;
  location: string;
  profilePhotoIds: string[];
  createdAt: Date;
  updatedAt: Date;
  profileType: ProfileType;
  applicantProfile?: Applicant;
  companyProfile?: Company;
  sentLikes: Like[];
  receivedLikes: Like[];
  matches: Match[];
  messages: Message[];
}

// Applicants
export interface Applicant {
  id: string;
  userId: string;
  user: User;
  yearsOfExperience: number;
  educationalExperiences: string[];
  professionalExperiences: string[];
  prompts: Prompt[];
  preferences?: ApplicantPreference;
}

// Companies
export interface Company {
  id: string;
  userId: string;
  user: User;
  yearsOfOperation: number;
  employeeCount: number;
  industry: Industry;
  fundingRound: FundingRound;
  prompts: Prompt[];
  preferences?: CompanyPreference;
}

// Prompts
export interface Prompt {
  id: string;
  question: string;
  answer: string;
  applicant?: Applicant;
  applicantId?: string;
  company?: Company;
  companyId?: string;
}

// Likes
export interface Like {
  id: string;
  fromUser: User;
  fromUserId: string;
  toUser: User;
  toUserId: string;
  section: string;
  content: string;
  createdAt: Date;
}

// Matches
export interface Match {
  id: string;
  users: User[];
  messages: Message[];
  createdAt: Date;
}

// Messages
export interface Message {
  id: string;
  content: string;
  match: Match;
  matchId: string;
  sender: User;
  senderId: string;
  createdAt: Date;
}

// Applicant Preferences
export interface ApplicantPreference {
  id: string;
  applicant: Applicant;
  applicantId: string;
  role: string[];
  industry: Industry[];
  location: string[];
  fundingRound: FundingRound[];
}

// Company Preferences
export interface CompanyPreference {
  id: string;
  company: Company;
  companyId: string;
  role: string[];
  industry: Industry[];
  location: string[];
  educationalExperiences: string[];
  professionalExperiences: string[];
}

// Enum: Profile Type
export enum ProfileType {
  applicant = "applicant",
  company = "company",
}

// Enum: Industry
export enum Industry {
  software = "software",
  finance = "finance",
  design = "design",
}

// Enum: Funding Round
export enum FundingRound {
  seed = "seed",
  seriesA = "seriesA",
  seriesB = "seriesB",
  seriesC = "seriesC",
}
