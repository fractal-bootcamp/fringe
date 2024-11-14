import prisma from "./client";

async function main() {
  // Clear existing data
  await prisma.message.deleteMany();
  await prisma.match.deleteMany();

  // Fetch all users
  const users = await prisma.user.findMany(); // Fetch all users

  // Separate applicants and companies
  const applicants = users.filter((user) => user.profileType === "applicant");
  const companies = users.filter((user) => user.profileType === "company");

  console.log("Creating matches and messages...");

  // Create matches and messages
  for (const applicant of applicants) {
    const matches = companies; // Get first 5 companies for the applicant

    let newMatch; // Declare newMatch outside the loop

    for (const company of matches) {
      // Create match with applicant and company
      if (applicant.id && company.id) {
        // Check if both IDs are valid
        newMatch = await prisma.match.create({
          data: {
            users: {
              connect: [{ id: applicant.id }, { id: company.id }],
            },
          },
        });
        console.log(newMatch);
      } else {
        console.warn(
          `Skipping match creation for applicant ${applicant.id} and company ${company.id} due to invalid IDs.`
        );
      }

      // Create 5 messages for each match
      for (let i = 0; i < 5; i++) {
        const msgContent = `Message ${i + 1} from ${applicant.name} to ${company.name}`; // Example message content
        await prisma.message.create({
          data: {
            content: msgContent,
            match: {
              connect: { id: newMatch?.id }, // Use optional chaining to avoid errors if newMatch is undefined
            },
            sender: {
              connect: { id: applicant.id }, // Assuming applicant sends the first message
            },
            createdAt: new Date(), // This is optional as it defaults to now()
          },
        });
      }
    }
  }

  console.log("Matches and messages have been seeded!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
