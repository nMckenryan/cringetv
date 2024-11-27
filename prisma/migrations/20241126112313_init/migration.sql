/*
  Warnings:

  - The primary key for the `Review` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `cringeScore` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `criticalRating` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `review` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `tvdbId` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the `TV_Shows` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `cringe_score_vote` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `review_content` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `review_rating` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tvdb_id` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_userId_fkey";

-- AlterTable
ALTER TABLE "Review" DROP CONSTRAINT "Review_pkey",
DROP COLUMN "cringeScore",
DROP COLUMN "criticalRating",
DROP COLUMN "id",
DROP COLUMN "review",
DROP COLUMN "tvdbId",
ADD COLUMN     "cringe_score_vote" INTEGER NOT NULL,
ADD COLUMN     "review_content" TEXT NOT NULL,
ADD COLUMN     "review_id" SERIAL NOT NULL,
ADD COLUMN     "review_rating" INTEGER NOT NULL,
ADD COLUMN     "tvdb_id" INTEGER NOT NULL,
ADD CONSTRAINT "Review_pkey" PRIMARY KEY ("review_id");

-- DropTable
DROP TABLE "TV_Shows";

-- CreateTable
CREATE TABLE "Tv_show" (
    "tvdb_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "content_rating_id" INTEGER NOT NULL,
    "aggregate_cringe_rating" DOUBLE PRECISION NOT NULL,
    "first_air_date" TIMESTAMP(3) NOT NULL,
    "final_air_date" DATE,
    "series_status" TEXT NOT NULL,
    "poster_link" VARCHAR(255),
    "original_country" TEXT NOT NULL,

    CONSTRAINT "Tv_show_pkey" PRIMARY KEY ("tvdb_id")
);

-- CreateTable
CREATE TABLE "Genre" (
    "genre_id" INTEGER NOT NULL,
    "genre_name" TEXT NOT NULL,
    "tv_showTvdb_id" INTEGER,

    CONSTRAINT "Genre_pkey" PRIMARY KEY ("genre_id")
);

-- CreateTable
CREATE TABLE "Content_ratings" (
    "content_rating_id" INTEGER NOT NULL,
    "content_rating" TEXT NOT NULL,
    "rating_country" TEXT NOT NULL,
    "content_rating_description" TEXT NOT NULL,
    "tv_showTvdb_id" INTEGER,

    CONSTRAINT "Content_ratings_pkey" PRIMARY KEY ("content_rating_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tv_show_tvdb_id_key" ON "Tv_show"("tvdb_id");

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_tvdb_id_fkey" FOREIGN KEY ("tvdb_id") REFERENCES "Tv_show"("tvdb_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Genre" ADD CONSTRAINT "Genre_tv_showTvdb_id_fkey" FOREIGN KEY ("tv_showTvdb_id") REFERENCES "Tv_show"("tvdb_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Content_ratings" ADD CONSTRAINT "Content_ratings_tv_showTvdb_id_fkey" FOREIGN KEY ("tv_showTvdb_id") REFERENCES "Tv_show"("tvdb_id") ON DELETE SET NULL ON UPDATE CASCADE;
