import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.message.deleteMany();
  await prisma.match.deleteMany();
  await prisma.like.deleteMany();
  await prisma.prompt.deleteMany();
  await prisma.applicantPreference.deleteMany();
  await prisma.companyPreference.deleteMany();
  await prisma.applicant.deleteMany();
  await prisma.company.deleteMany();
  await prisma.user.deleteMany();

  // Seed Applicants
  const applicantUsers = [
    {
      id: "1",
      name: "Alice Smith",
      location: "New York, NY",
      profilePhotoIds: ["photo1", "photo2"],
      applicantProfile: {
        create: {
          yearsOfExperience: 5,
          educationalExperiences: ["BSc Computer Science", "MSc Software Engineering"],
          professionalExperiences: [
            "Software Engineer at TechCorp",
            "Frontend Developer at WebSolutions",
          ],
          prompts: {
            create: [
              { question: "What is your greatest strength?", answer: "Problem-solving skills." },
              {
                question: "Why do you want to work here?",
                answer: "I admire the company's innovation.",
              },
            ],
          },
        },
      },
    },
    {
      id: "2",
      name: "Bob Johnson",
      location: "San Francisco, CA",
      profilePhotoIds: ["photo3"],
      applicantProfile: {
        create: {
          yearsOfExperience: 3,
          educationalExperiences: ["BSc Information Technology"],
          professionalExperiences: ["Junior Developer at CodeFactory"],
          prompts: {
            create: [
              { question: "What motivates you?", answer: "Learning new technologies." },
              { question: "Describe a challenge you faced.", answer: "I improved a slow process." },
            ],
          },
        },
      },
    },
    {
      id: "3",
      name: "Charlie Brown",
      location: "Austin, TX",
      profilePhotoIds: ["photo4"],
      applicantProfile: {
        create: {
          yearsOfExperience: 4,
          educationalExperiences: ["BSc Software Engineering"],
          professionalExperiences: ["Backend Developer at DataSolutions"],
          prompts: {
            create: [
              {
                question: "What is your biggest achievement?",
                answer: "Led a successful project.",
              },
              { question: "How do you handle stress?", answer: "I prioritize and stay organized." },
            ],
          },
        },
      },
    },
    {
      id: "4",
      name: "Diana Prince",
      location: "Seattle, WA",
      profilePhotoIds: ["photo5"],
      applicantProfile: {
        create: {
          yearsOfExperience: 6,
          educationalExperiences: ["BSc Computer Science", "MSc Data Science"],
          professionalExperiences: ["Data Analyst at InfoTech"],
          prompts: {
            create: [
              { question: "What are your career goals?", answer: "To become a data scientist." },
              {
                question: "How do you work in a team?",
                answer: "I communicate openly and support my teammates.",
              },
            ],
          },
        },
      },
    },
    {
      id: "5",
      name: "Ethan Hunt",
      location: "Los Angeles, CA",
      profilePhotoIds: ["photo6"],
      applicantProfile: {
        create: {
          yearsOfExperience: 2,
          educationalExperiences: ["BSc Web Development"],
          professionalExperiences: ["Intern at WebCreators"],
          prompts: {
            create: [
              { question: "What do you enjoy about coding?", answer: "The creativity it allows." },
              { question: "What is your preferred programming language?", answer: "JavaScript." },
            ],
          },
        },
      },
    },
    {
      id: "6",
      name: "Fiona Gallagher",
      location: "Chicago, IL",
      profilePhotoIds: ["photo7"],
      applicantProfile: {
        create: {
          yearsOfExperience: 7,
          educationalExperiences: ["BSc Information Systems"],
          professionalExperiences: ["Project Manager at TechSolutions"],
          prompts: {
            create: [
              { question: "How do you manage projects?", answer: "I use Agile methodologies." },
              { question: "What is your leadership style?", answer: "I lead by example." },
            ],
          },
        },
      },
    },
    {
      id: "7",
      name: "George Smith",
      location: "Miami, FL",
      profilePhotoIds: ["photo8"],
      applicantProfile: {
        create: {
          yearsOfExperience: 1,
          educationalExperiences: ["BSc Computer Science"],
          professionalExperiences: ["Junior Developer at CodeBase"],
          prompts: {
            create: [
              { question: "What are your strengths?", answer: "Quick learner and adaptable." },
              { question: "Why did you choose this career?", answer: "I love technology." },
            ],
          },
        },
      },
    },
    {
      id: "8",
      name: "Hannah Baker",
      location: "Boston, MA",
      profilePhotoIds: ["photo9"],
      applicantProfile: {
        create: {
          yearsOfExperience: 5,
          educationalExperiences: ["BSc Graphic Design"],
          professionalExperiences: ["UI/UX Designer at CreativeWorks"],
          prompts: {
            create: [
              { question: "What inspires your designs?", answer: "User experience and feedback." },
              {
                question: "How do you stay updated with design trends?",
                answer: "I follow industry leaders and blogs.",
              },
            ],
          },
        },
      },
    },
    {
      id: "9",
      name: "Ian Malcolm",
      location: "Orlando, FL",
      profilePhotoIds: ["photo10"],
      applicantProfile: {
        create: {
          yearsOfExperience: 8,
          educationalExperiences: ["BSc Computer Science", "MSc Cybersecurity"],
          professionalExperiences: ["Security Analyst at SecureTech"],
          prompts: {
            create: [
              {
                question: "What is your approach to cybersecurity?",
                answer: "Proactive and preventive measures.",
              },
              {
                question: "What challenges do you face in your role?",
                answer: "Keeping up with evolving threats.",
              },
            ],
          },
        },
      },
    },
    {
      id: "10",
      name: "Jack Sparrow",
      location: "Port Royal, Jamaica",
      profilePhotoIds: ["photo11"],
      applicantProfile: {
        create: {
          yearsOfExperience: 5,
          educationalExperiences: ["BSc Nautical Science"],
          professionalExperiences: ["Captain at The Black Pearl"],
          prompts: {
            create: [
              {
                question: "What is your leadership philosophy?",
                answer: "To inspire loyalty and courage.",
              },
              {
                question: "How do you handle unexpected challenges?",
                answer: "With creativity and a bit of luck.",
              },
            ],
          },
        },
      },
    },
  ];

  // Seed Companies
  const companyUsers = [
    {
      id: "1",
      name: "Tech Innovations",
      location: "San Francisco, CA",
      profilePhotoIds: ["photo1", "photo2"],
      companyProfile: {
        create: {
          yearsOfOperation: 5,
          employeeCount: 50,
          industry: "software",
          fundingRound: "seriesA",
          prompts: {
            create: [
              { question: "What is your mission?", answer: "To innovate technology." },
              { question: "What products do you offer?", answer: "Software solutions." },
            ],
          },
        },
      },
    },
    {
      id: "2",
      name: "Finance Solutions",
      location: "New York, NY",
      profilePhotoIds: ["photo3", "photo4"],
      companyProfile: {
        create: {
          yearsOfOperation: 10,
          employeeCount: 200,
          industry: "finance",
          fundingRound: "seriesB",
          prompts: {
            create: [
              { question: "What is your mission?", answer: "To provide financial clarity." },
              { question: "What services do you offer?", answer: "Investment advice." },
            ],
          },
        },
      },
    },
    {
      id: "3",
      name: "Creative Designs",
      location: "Austin, TX",
      profilePhotoIds: ["photo5", "photo6"],
      companyProfile: {
        create: {
          yearsOfOperation: 3,
          employeeCount: 30,
          industry: "design",
          fundingRound: "seed",
          prompts: {
            create: [
              { question: "What is your mission?", answer: "To create stunning visuals." },
              { question: "What do you specialize in?", answer: "Graphic design." },
            ],
          },
        },
      },
    },
    {
      id: "4",
      name: "HealthTech Corp",
      location: "Boston, MA",
      profilePhotoIds: ["photo7", "photo8"],
      companyProfile: {
        create: {
          yearsOfOperation: 7,
          employeeCount: 150,
          industry: "software",
          fundingRound: "seriesC",
          prompts: {
            create: [
              {
                question: "What is your mission?",
                answer: "To improve healthcare through technology.",
              },
              { question: "What products do you offer?", answer: "Health management software." },
            ],
          },
        },
      },
    },
    {
      id: "5",
      name: "EcoFinance",
      location: "Seattle, WA",
      profilePhotoIds: ["photo9", "photo10"],
      companyProfile: {
        create: {
          yearsOfOperation: 4,
          employeeCount: 80,
          industry: "finance",
          fundingRound: "seriesA",
          prompts: {
            create: [
              { question: "What is your mission?", answer: "To promote sustainable investments." },
              {
                question: "What services do you offer?",
                answer: "Eco-friendly financial planning.",
              },
            ],
          },
        },
      },
    },
    {
      id: "6",
      name: "Design Studio",
      location: "Los Angeles, CA",
      profilePhotoIds: ["photo11", "photo12"],
      companyProfile: {
        create: {
          yearsOfOperation: 2,
          employeeCount: 20,
          industry: "design",
          fundingRound: "seed",
          prompts: {
            create: [
              {
                question: "What is your mission?",
                answer: "To bring ideas to life through design.",
              },
              { question: "What do you specialize in?", answer: "Web design." },
            ],
          },
        },
      },
    },
    {
      id: "7",
      name: "FinTech Innovations",
      location: "Chicago, IL",
      profilePhotoIds: ["photo13", "photo14"],
      companyProfile: {
        create: {
          yearsOfOperation: 6,
          employeeCount: 120,
          industry: "finance",
          fundingRound: "seriesB",
          prompts: {
            create: [
              { question: "What is your mission?", answer: "To revolutionize financial services." },
              { question: "What products do you offer?", answer: "Mobile banking solutions." },
            ],
          },
        },
      },
    },
    {
      id: "8",
      name: "Software Solutions",
      location: "Denver, CO",
      profilePhotoIds: ["photo15", "photo16"],
      companyProfile: {
        create: {
          yearsOfOperation: 8,
          employeeCount: 300,
          industry: "software",
          fundingRound: "seriesC",
          prompts: {
            create: [
              {
                question: "What is your mission?",
                answer: "To provide robust software solutions.",
              },
              { question: "What do you specialize in?", answer: "Enterprise software." },
            ],
          },
        },
      },
    },
    {
      id: "9",
      name: "Creative Agency",
      location: "Miami, FL",
      profilePhotoIds: ["photo17", "photo18"],
      companyProfile: {
        create: {
          yearsOfOperation: 1,
          employeeCount: 10,
          industry: "design",
          fundingRound: "seed",
          prompts: {
            create: [
              { question: "What is your mission?", answer: "To inspire through creativity." },
              { question: "What services do you offer?", answer: "Branding and marketing." },
            ],
          },
        },
      },
    },
    {
      id: "10",
      name: "Tech Finance",
      location: "Atlanta, GA",
      profilePhotoIds: ["photo19", "photo20"],
      companyProfile: {
        create: {
          yearsOfOperation: 9,
          employeeCount: 250,
          industry: "finance",
          fundingRound: "seriesB",
          prompts: {
            create: [
              {
                question: "What is your mission?",
                answer: "To integrate technology with finance.",
              },
              { question: "What services do you offer?", answer: "Financial consulting." },
            ],
          },
        },
      },
    },
  ];

  // Create users with their profiles
  console.log("Seeding applicants...");
  for (const userData of applicantUsers) {
    await prisma.user.create({
      data: userData,
    });
  }

  console.log("Seeding companies...");
  for (const userData of companyUsers) {
    await prisma.user.create({
      data: userData,
    });
  }

  // Create some example matches and likes
  console.log("Creating example matches and likes...");
  const firstApplicant = await prisma.user.findFirst({
    where: { applicantProfile: { isNot: null } },
  });
  const firstCompany = await prisma.user.findFirst({
    where: { companyProfile: { isNot: null } },
  });

  if (firstApplicant && firstCompany) {
    // Create a match
    const match = await prisma.match.create({
      data: {
        users: {
          connect: [{ id: firstApplicant.id }, { id: firstCompany.id }],
        },
      },
    });

    // Create some messages
    await prisma.message.createMany({
      data: [
        {
          content: "Hello! I'm interested in your company.",
          matchId: match.id,
          senderId: firstApplicant.id,
        },
        {
          content: "Hi! Thanks for reaching out. Would you like to schedule an interview?",
          matchId: match.id,
          senderId: firstCompany.id,
        },
      ],
    });

    // Create some likes
    await prisma.like.create({
      data: {
        fromUserId: firstApplicant.id,
        toUserId: firstCompany.id,
        section: "About",
        content: "Company mission",
      },
    });
  }

  console.log("Database has been seeded!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
