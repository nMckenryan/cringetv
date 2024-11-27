/*
  Warnings:

  - Added the required column `name` to the `TV_Shows` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TV_Shows" ADD COLUMN     "name" TEXT NOT NULL;
