-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "hashed_password" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_list" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "user_list_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "seasons" (
    "id" SERIAL NOT NULL,
    "seasonYear" TEXT NOT NULL,
    "season" TEXT NOT NULL,
    "year" INTEGER NOT NULL,

    CONSTRAINT "seasons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "anime" (
    "id" INTEGER NOT NULL,
    "season" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "episodes" INTEGER NOT NULL,
    "genres" TEXT[],
    "score" DOUBLE PRECISION NOT NULL,
    "synopsis" TEXT NOT NULL,
    "studios" TEXT[],
    "source" TEXT NOT NULL,
    "images" TEXT NOT NULL,
    "members" INTEGER NOT NULL,
    "broadcast" TEXT NOT NULL,
    "aired" TEXT NOT NULL,
    "isCurrentlyAiring" BOOLEAN NOT NULL,
    "isPrevSeason" BOOLEAN NOT NULL,

    CONSTRAINT "anime_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AnimeToUserList" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "user_id_key" ON "user"("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "session_userId_key" ON "session"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "user_list_userId_key" ON "user_list"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "seasons_seasonYear_key" ON "seasons"("seasonYear");

-- CreateIndex
CREATE UNIQUE INDEX "_AnimeToUserList_AB_unique" ON "_AnimeToUserList"("A", "B");

-- CreateIndex
CREATE INDEX "_AnimeToUserList_B_index" ON "_AnimeToUserList"("B");

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_list" ADD CONSTRAINT "user_list_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "anime" ADD CONSTRAINT "anime_season_fkey" FOREIGN KEY ("season") REFERENCES "seasons"("seasonYear") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnimeToUserList" ADD CONSTRAINT "_AnimeToUserList_A_fkey" FOREIGN KEY ("A") REFERENCES "anime"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnimeToUserList" ADD CONSTRAINT "_AnimeToUserList_B_fkey" FOREIGN KEY ("B") REFERENCES "user_list"("id") ON DELETE CASCADE ON UPDATE CASCADE;
