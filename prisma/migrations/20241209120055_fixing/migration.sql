/*
  Warnings:

  - You are about to drop the column `user_bio` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "user_bio",
ADD COLUMN     "userBio" TEXT,
ALTER COLUMN "dateCreated" SET DEFAULT CURRENT_TIMESTAMP;
