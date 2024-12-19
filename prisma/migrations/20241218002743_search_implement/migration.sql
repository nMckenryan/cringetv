/*
  Warnings:

  - A unique constraint covering the columns `[userId,tvdb_id]` on the table `Review` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Review_userId_tvdb_id_key" ON "Review"("userId", "tvdb_id");