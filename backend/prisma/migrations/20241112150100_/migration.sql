/*
  Warnings:

  - Added the required column `profileType` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ProfileType" AS ENUM ('applicant', 'company');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "profileType" "ProfileType" NOT NULL;
