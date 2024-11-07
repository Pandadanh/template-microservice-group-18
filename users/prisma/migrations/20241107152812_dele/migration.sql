/*
  Warnings:

  - You are about to drop the `salary` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "salary" DROP CONSTRAINT "salary_userId_fkey";

-- DropTable
DROP TABLE "salary";
