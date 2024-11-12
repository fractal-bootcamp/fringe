import { FundingRound, Industry, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seedPreferences() {
  // Retrieve all applicant profiles
  const applicants = await prisma.applicant.findMany();

  for (const applicant of applicants) {
    // Seed preferences for each applicant
    await prisma.applicantPreference.create({
      data: {
        applicantId: applicant.id,
        role: ["Software Engineer"], // Dummy data for role
        industry: [Industry.software], // Dummy data for industry
        location: ["New York"], // Dummy data for location
        fundingRound: [FundingRound.seed], // Dummy data for funding round
        // Add other preference fields here
      },
    });
  }

  // Retrieve all company profiles
  const companies = await prisma.company.findMany();

  for (const company of companies) {
    // Seed preferences for each company
    await prisma.companyPreference.create({
      data: {
        companyId: company.id,
        role: ["Software Engineer"], // Dummy data for role
        industry: [Industry.software], // Dummy data for industry
        location: ["New York"], // Dummy data for location
        educationalExperiences: ["Bachelor's Degree in Computer Science"], // Dummy data for educational experiences
        professionalExperiences: ["2 years at Tech Company"], // Dummy data for professional experiences
      },
    });
  }
}

seedPreferences()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
