/*
  Warnings:

  - You are about to drop the `ApplicantPreference` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CompanyPreference` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ApplicantPreference" DROP CONSTRAINT "ApplicantPreference_applicantId_fkey";

-- DropForeignKey
ALTER TABLE "CompanyPreference" DROP CONSTRAINT "CompanyPreference_companyId_fkey";

-- DropTable
DROP TABLE "ApplicantPreference";

-- DropTable
DROP TABLE "CompanyPreference";
