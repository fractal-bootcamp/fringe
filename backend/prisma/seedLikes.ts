import prisma from "./client";

export async function seedLikes() {
  // Get all users
  const users = await prisma.user.findMany();

  console.log(users.length);

  for (const user of users) {
    // For each user, create 5 likes
    for (let i = 0; i < 5; i++) {
      // Get a random user to like (excluding self)
      const potentialUsers = users.filter((u) => u.id !== user.id);
      const randomIndex = Math.floor(Math.random() * potentialUsers.length);
      const targetUser = potentialUsers[randomIndex];

      // Create the like
      await prisma.like.create({
        data: {
          fromUserId: user.id,
          toUserId: targetUser.id,
        },
      });
    }
  }

  console.log("Seed completed: Likes created");
}

await seedLikes();
