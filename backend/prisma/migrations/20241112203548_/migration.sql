/*
  Warnings:

  - You are about to drop the column `content` on the `Like` table. All the data in the column will be lost.
  - You are about to drop the column `section` on the `Like` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Like" DROP COLUMN "content",
DROP COLUMN "section";
