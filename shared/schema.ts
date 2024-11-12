import { z } from "zod";

// Enums
export const ProfileTypeSchema = z.enum(["applicant", "company"]);
export const IndustrySchema = z.enum(["software", "finance", "design"]);
export const FundingRoundSchema = z.enum(["seed", "seriesA", "seriesB", "seriesC"]);
const DateStringSchema = z.string().refine(val => !isNaN(Date.parse(val)), { message: 'Invalid date' });
// Base schemas
export const PromptSchema = z.object({
  id: z.string().uuid(),
  question: z.string(),
  answer: z.string(),
  applicantId: z.string().uuid().optional(),
  companyId: z.string().uuid().optional(),
});

export const LikeSchema = z.object({
  id: z.string().uuid(),
  fromUserId: z.string().uuid(),
  toUserId: z.string().uuid(),
  section: z.string(),
  content: z.string(),
  createdAt: DateStringSchema,
});

export const MessageSchema = z.object({
  id: z.string().uuid(),
  content: z.string(),
  matchId: z.string().uuid(),
  senderId: z.string().uuid(),
  createdAt: DateStringSchema,
});

export const ApplicantPreferenceSchema = z.object({
  id: z.string().uuid(),
  applicantId: z.string().uuid(),
  role: z.array(z.string()),
  industry: z.array(IndustrySchema),
  location: z.array(z.string()),
  fundingRound: z.array(FundingRoundSchema),
});

export const CompanyPreferenceSchema = z.object({
  id: z.string().uuid(),
  companyId: z.string().uuid(),
  role: z.array(z.string()),
  industry: z.array(IndustrySchema),
  location: z.array(z.string()),
  educationalExperiences: z.array(z.string()),
  professionalExperiences: z.array(z.string()),
});

export const ApplicantSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  yearsOfExperience: z.number().int().min(0),
  educationalExperiences: z.array(z.string()),
  professionalExperiences: z.array(z.string()),
  prompts: z.array(PromptSchema),
  preferences: ApplicantPreferenceSchema.optional(),
});

export const CompanySchema = z.object({
  id: z.string().uuid(),
  yearsOfOperation: z.number().int().min(0),
  employeeCount: z.number().int().positive(),
  industry: IndustrySchema,
  fundingRound: FundingRoundSchema,
  prompts: z.array(PromptSchema),
  preferences: CompanyPreferenceSchema.optional(),
});

export const UserSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  location: z.string(),
  profilePhotoIds: z.array(z.string()),
  createdAt: DateStringSchema,  
  updatedAt: DateStringSchema,  
  profileType: ProfileTypeSchema,
  applicantProfile: ApplicantSchema.optional(),
  companyProfile: CompanySchema.optional(),
  sentLikes: z.array(LikeSchema),
  receivedLikes: z.array(LikeSchema),
  matchIds: z.array(z.string().uuid()),
  messages: z.array(MessageSchema),
});

export const MatchSchema = z.object({
  id: z.string().uuid(),
  userIds: z.array(z.string().uuid()),
  messages: z.array(MessageSchema),
  createdAt: DateStringSchema,  
});

// Types
export type ProfileType = z.infer<typeof ProfileTypeSchema>;
export type Industry = z.infer<typeof IndustrySchema>;
export type FundingRound = z.infer<typeof FundingRoundSchema>;
export type Prompt = z.infer<typeof PromptSchema>;
export type Like = z.infer<typeof LikeSchema>;
export type Message = z.infer<typeof MessageSchema>;
export type ApplicantPreference = z.infer<typeof ApplicantPreferenceSchema>;
export type CompanyPreference = z.infer<typeof CompanyPreferenceSchema>;
export type Applicant = z.infer<typeof ApplicantSchema>;
export type Company = z.infer<typeof CompanySchema>;
export type User = z.infer<typeof UserSchema>;
export type Match = z.infer<typeof MatchSchema>;