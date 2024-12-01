/*
  Warnings:

  - The primary key for the `TvShowContentRatings` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `tvShowId` on the `TvShowContentRatings` table. All the data in the column will be lost.
  - The primary key for the `TvShowGenre` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `tvShowId` on the `TvShowGenre` table. All the data in the column will be lost.
  - You are about to drop the `TVShow` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `televisionShowId` to the `TvShowContentRatings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `televisionShowId` to the `TvShowGenre` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_tvdb_id_fkey";

-- DropForeignKey
ALTER TABLE "TVShow" DROP CONSTRAINT "TVShow_tvdb_id_fkey";

-- DropForeignKey
ALTER TABLE "TvShowContentRatings" DROP CONSTRAINT "TvShowContentRatings_tvShowId_fkey";

-- DropForeignKey
ALTER TABLE "TvShowGenre" DROP CONSTRAINT "TvShowGenre_tvShowId_fkey";

-- AlterTable
ALTER TABLE "TvShowContentRatings" DROP CONSTRAINT "TvShowContentRatings_pkey",
DROP COLUMN "tvShowId",
ADD COLUMN     "televisionShowId" INTEGER NOT NULL,
ADD CONSTRAINT "TvShowContentRatings_pkey" PRIMARY KEY ("televisionShowId", "contentRatingId");

-- AlterTable
ALTER TABLE "TvShowGenre" DROP CONSTRAINT "TvShowGenre_pkey",
DROP COLUMN "tvShowId",
ADD COLUMN     "televisionShowId" INTEGER NOT NULL,
ADD CONSTRAINT "TvShowGenre_pkey" PRIMARY KEY ("televisionShowId", "genreId");

-- DropTable
DROP TABLE "TVShow";

-- CreateTable
CREATE TABLE "TelevisionShow" (
    "tvdb_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "aggregate_cringe_rating" DOUBLE PRECISION NOT NULL,
    "first_air_date" TIMESTAMP(3) NOT NULL,
    "last_air_date" DATE,
    "series_status" TEXT,
    "poster_link" VARCHAR(255),
    "original_country" TEXT NOT NULL,

    CONSTRAINT "TelevisionShow_pkey" PRIMARY KEY ("tvdb_id")
);

-- CreateTable
CREATE TABLE "_ContentRatingToTelevisionShow" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ContentRatingToTelevisionShow_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "TelevisionShow_tvdb_id_key" ON "TelevisionShow"("tvdb_id");

-- CreateIndex
CREATE INDEX "_ContentRatingToTelevisionShow_B_index" ON "_ContentRatingToTelevisionShow"("B");

-- AddForeignKey
ALTER TABLE "TvShowGenre" ADD CONSTRAINT "TvShowGenre_televisionShowId_fkey" FOREIGN KEY ("televisionShowId") REFERENCES "TelevisionShow"("tvdb_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TvShowContentRatings" ADD CONSTRAINT "TvShowContentRatings_televisionShowId_fkey" FOREIGN KEY ("televisionShowId") REFERENCES "TelevisionShow"("tvdb_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_tvdb_id_fkey" FOREIGN KEY ("tvdb_id") REFERENCES "TelevisionShow"("tvdb_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContentRatingToTelevisionShow" ADD CONSTRAINT "_ContentRatingToTelevisionShow_A_fkey" FOREIGN KEY ("A") REFERENCES "ContentRating"("content_rating_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContentRatingToTelevisionShow" ADD CONSTRAINT "_ContentRatingToTelevisionShow_B_fkey" FOREIGN KEY ("B") REFERENCES "TelevisionShow"("tvdb_id") ON DELETE CASCADE ON UPDATE CASCADE;
