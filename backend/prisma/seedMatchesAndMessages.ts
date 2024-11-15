import prisma from "./client";

// Helper function to generate random messages
function generateRandomMessage(): string {
  const messages = [
    "Hey, how are you?",
    "What's up?",
    "Nice to meet you!",
    "How's your day going?",
    "What do you like to do for fun?",
    "Have any plans for the weekend?",
    "I love your profile!",
    "What's your favorite movie?",
    "Do you like to travel?",
    "What kind of music do you listen to?",
    "Where are you from originally?",
    "What do you do for work?",
    "Have any pets?",
    "Love your photos!",
    "Want to grab coffee sometime?",
  ];
  return messages[Math.floor(Math.random() * messages.length)];
}

async function main() {
  // Clear existing data
  await prisma.message.deleteMany();
  await prisma.match.deleteMany();

  // Fetch all users from the database
  const users = await prisma.user.findMany();

  // Ensure we have enough users
  if (users.length < 2) {
    console.error("Not enough users in the database to create matches");
    return;
  }

  console.log("Creating matches and messages...");

  // For each user, create at least 5 matches
  for (const user of users) {
    const numberOfMatches = Math.max(2, Math.floor(Math.random() * 4)); // 5-7 matches

    // Create matches for current user
    for (let i = 0; i < numberOfMatches; i++) {
      // Select a random other user for the match
      let otherUser;
      do {
        otherUser = users[Math.floor(Math.random() * users.length)];
      } while (otherUser.id === user.id);

      // Create match
      const newMatch = await prisma.match.create({
        data: {
          users: {
            connect: [{ id: user.id }, { id: otherUser.id }],
          },
        },
      });

      // Create 10 messages for this match
      const numberOfMessages = 2;
      const messageUsers = [user.id, otherUser.id];

      for (let j = 0; j < numberOfMessages; j++) {
        const senderId = messageUsers[j % 2]; // Alternate between users

        await prisma.message.create({
          data: {
            content: generateRandomMessage(),
            match: {
              connect: { id: newMatch.id },
            },
            sender: {
              connect: { id: senderId },
            },
            createdAt: new Date(Date.now() - (numberOfMessages - j) * 1000 * 60 * 60),
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
