/*
  Warnings:

  - Changed the type of `industry` on the `Company` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `fundingRound` on the `Company` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Applicant" ADD COLUMN     "portfolioUrl" TEXT;

-- AlterTable
ALTER TABLE "Company" DROP COLUMN "industry",
ADD COLUMN     "industry" TEXT NOT NULL,
DROP COLUMN "fundingRound",
ADD COLUMN     "fundingRound" TEXT NOT NULL;

-- DropEnum
DROP TYPE "FundingRound";

-- DropEnum
DROP TYPE "Industry";
