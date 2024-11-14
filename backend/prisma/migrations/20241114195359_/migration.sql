/*
  Warnings:

  - Made the column `portfolioUrl` on table `Applicant` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Applicant" ALTER COLUMN "portfolioUrl" SET NOT NULL;
