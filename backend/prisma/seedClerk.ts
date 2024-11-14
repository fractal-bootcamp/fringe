import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Fetching all users...");
  // Fetch all users
  const users = await prisma.user.findMany();
  console.log(`Fetched ${users.length} users.`);

  // Separate users by profileType
  const applicants = users.filter((user) => user.profileType === "applicant");
  const companies = users.filter((user) => user.profileType === "company");
  console.log(
    `Separated users into ${applicants.length} applicants and ${companies.length} companies.`
  );

  // Create likes for applicants by companies
  for (const applicant of applicants) {
    const randomCompany = companies[Math.floor(Math.random() * companies.length)];
    if (randomCompany) {
      console.log(`Creating like from company ${randomCompany.id} to applicant ${applicant.id}`);
      await prisma.like.create({
        data: {
          fromUserId: randomCompany.id,
          toUserId: applicant.id,
        },
      });
    }
  }

  // Create likes for companies by applicants
  for (const company of companies) {
    const randomApplicant = applicants[Math.floor(Math.random() * applicants.length)];
    if (randomApplicant) {
      console.log(`Creating like from applicant ${randomApplicant.id} to company ${company.id}`);
      await prisma.like.create({
        data: {
          fromUserId: randomApplicant.id,
          toUserId: company.id,
        },
      });
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
