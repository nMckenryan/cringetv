-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "refresh_token_expires_in" INTEGER,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "dateCreated" TIMESTAMP(3) NOT NULL,
    "user_bio" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Genre" (
    "genre_id" INTEGER NOT NULL,
    "genre_name" TEXT NOT NULL,

    CONSTRAINT "Genre_pkey" PRIMARY KEY ("genre_id")
);

-- CreateTable
CREATE TABLE "TelevisionShow" (
    "tvdb_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "aggregate_cringe_rating" DOUBLE PRECISION,
    "first_air_date" TIMESTAMP(3) NOT NULL,
    "last_air_date" DATE,
    "series_status" TEXT,
    "poster_link" VARCHAR(255),
    "original_country" TEXT NOT NULL,

    CONSTRAINT "TelevisionShow_pkey" PRIMARY KEY ("tvdb_id")
);

-- CreateTable
CREATE TABLE "ContentRating" (
    "content_rating_id" INTEGER NOT NULL,
    "content_rating" TEXT NOT NULL,
    "rating_country" TEXT NOT NULL,
    "content_rating_description" TEXT NOT NULL,

    CONSTRAINT "ContentRating_pkey" PRIMARY KEY ("content_rating_id")
);

-- CreateTable
CREATE TABLE "Review" (
    "review_id" SERIAL NOT NULL,
    "review_content" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tvdb_id" INTEGER NOT NULL,
    "cringe_score_vote" INTEGER NOT NULL,
    "date_created" TIMESTAMP(3) NOT NULL,
    "date_updated" TIMESTAMP(3),

    CONSTRAINT "Review_pkey" PRIMARY KEY ("review_id")
);

-- CreateTable
CREATE TABLE "_GenreToTelevisionShow" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_GenreToTelevisionShow_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_ContentRatingToTelevisionShow" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ContentRatingToTelevisionShow_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "Genre_genre_id_key" ON "Genre"("genre_id");

-- CreateIndex
CREATE UNIQUE INDEX "Genre_genre_name_key" ON "Genre"("genre_name");

-- CreateIndex
CREATE UNIQUE INDEX "TelevisionShow_tvdb_id_key" ON "TelevisionShow"("tvdb_id");

-- CreateIndex
CREATE UNIQUE INDEX "ContentRating_content_rating_id_key" ON "ContentRating"("content_rating_id");

-- CreateIndex
CREATE INDEX "_GenreToTelevisionShow_B_index" ON "_GenreToTelevisionShow"("B");

-- CreateIndex
CREATE INDEX "_ContentRatingToTelevisionShow_B_index" ON "_ContentRatingToTelevisionShow"("B");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_tvdb_id_fkey" FOREIGN KEY ("tvdb_id") REFERENCES "TelevisionShow"("tvdb_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GenreToTelevisionShow" ADD CONSTRAINT "_GenreToTelevisionShow_A_fkey" FOREIGN KEY ("A") REFERENCES "Genre"("genre_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GenreToTelevisionShow" ADD CONSTRAINT "_GenreToTelevisionShow_B_fkey" FOREIGN KEY ("B") REFERENCES "TelevisionShow"("tvdb_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContentRatingToTelevisionShow" ADD CONSTRAINT "_ContentRatingToTelevisionShow_A_fkey" FOREIGN KEY ("A") REFERENCES "ContentRating"("content_rating_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContentRatingToTelevisionShow" ADD CONSTRAINT "_ContentRatingToTelevisionShow_B_fkey" FOREIGN KEY ("B") REFERENCES "TelevisionShow"("tvdb_id") ON DELETE CASCADE ON UPDATE CASCADE;
