import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.message.deleteMany();
  await prisma.match.deleteMany();

  // Create dummy matches and messages
  const matchData = [
    {
      users: ["1", "11"], // Alice Smith & Tech Innovations
      messages: [
        { content: "Hi, I'm really interested in your software solutions!", senderId: "1" },
        {
          content: "Thanks for reaching out! We'd love to discuss your experience.",
          senderId: "11",
        },
      ],
    },
    {
      users: ["2", "12"], // Bob Johnson & Finance Solutions
      messages: [
        { content: "Your fintech platform looks innovative!", senderId: "2" },
        { content: "Thank you! Would you like to schedule a call?", senderId: "12" },
      ],
    },
    {
      users: ["3", "13"], // Charlie Brown & Creative Designs
      messages: [
        { content: "I love your company's design philosophy!", senderId: "3" },
        {
          content: "We appreciate your interest! Your backend experience is impressive.",
          senderId: "13",
        },
      ],
    },
    {
      users: ["4", "14"], // Diana Prince & HealthTech Corp
      messages: [
        { content: "Your health management software aligns with my interests!", senderId: "4" },
        { content: "Your data science background would be valuable here.", senderId: "14" },
      ],
    },
    {
      users: ["5", "15"], // Ethan Hunt & EcoFinance
      messages: [
        { content: "Your sustainable investment approach is fascinating!", senderId: "5" },
        {
          content: "Thanks! We'd love to hear more about your development experience.",
          senderId: "15",
        },
      ],
    },
  ];

  console.log("Creating matches and messages...");

  for (const match of matchData) {
    // Create match with both users
    const newMatch = await prisma.match.create({
      data: {
        users: {
          connect: match.users.map((userId) => ({ id: userId })),
        },
      },
    });

    // Create messages for the match
    for (const msg of match.messages) {
      await prisma.message.create({
        data: {
          content: msg.content,
          match: {
            connect: { id: newMatch.id },
          },
          sender: {
            connect: { id: msg.senderId },
          },
          createdAt: new Date(), // This is optional as it defaults to now()
        },
      });
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
