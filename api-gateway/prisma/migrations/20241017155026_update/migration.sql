/*
  Warnings:

  - You are about to drop the column `hashpassword` on the `acc` table. All the data in the column will be lost.
  - Added the required column `hashedpassword` to the `acc` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "acc" DROP COLUMN "hashpassword",
ADD COLUMN     "hashedpassword" TEXT NOT NULL;
