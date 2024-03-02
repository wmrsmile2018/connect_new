-- CreateTable
CREATE TABLE "role" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "code" TEXT NOT NULL,

    CONSTRAINT "role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "priority" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "code" TEXT NOT NULL,

    CONSTRAINT "priority_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "linkType" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT,
    "rootUrl" TEXT NOT NULL,

    CONSTRAINT "linkType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "filter" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "filter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userFilter" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "filterCode" TEXT NOT NULL,
    "dateTimeOfCreation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "timeZone" TEXT NOT NULL,
    "location" TEXT NOT NULL,

    CONSTRAINT "userFilter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userLinkType" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "linkTypeCode" TEXT NOT NULL,
    "dateTimeOfCreation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "timeZone" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "idProfile" TEXT NOT NULL,

    CONSTRAINT "userLinkType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "favorite" (
    "id" SERIAL NOT NULL,
    "userSrcId" INTEGER NOT NULL,
    "userTrgId" INTEGER NOT NULL,
    "dateTimeOfCreation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "timeZone" TEXT NOT NULL,
    "location" TEXT NOT NULL,

    CONSTRAINT "favorite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userAnnouncement" (
    "id" SERIAL NOT NULL,
    "announcementId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "dateTimeOfCreation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "timeZone" TEXT NOT NULL,
    "location" TEXT NOT NULL,

    CONSTRAINT "userAnnouncement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "announcementPhoto" (
    "id" SERIAL NOT NULL,
    "announcementId" INTEGER NOT NULL,
    "photoId" INTEGER NOT NULL,
    "dateTimeOfCreation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "timeZone" TEXT NOT NULL,
    "location" TEXT NOT NULL,

    CONSTRAINT "announcementPhoto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userPhoto" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "photoId" INTEGER NOT NULL,
    "dateTimeOfCreation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "timeZone" TEXT NOT NULL,
    "location" TEXT NOT NULL,

    CONSTRAINT "userPhoto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "markedCard" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "deadline" TIMESTAMP(3) NOT NULL,
    "dateTimeOfCreation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "timeZone" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "isMarked" BOOLEAN NOT NULL,

    CONSTRAINT "markedCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "roleCode" TEXT NOT NULL,
    "priorityCode" TEXT NOT NULL,
    "code" INTEGER NOT NULL,
    "hash" TEXT NOT NULL,
    "salt" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "dateTimeOfCreation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT,
    "firstName" TEXT,
    "surname" TEXT,
    "patronymic" TEXT,
    "avatar" INTEGER,
    "timeZone" TEXT,
    "location" TEXT,
    "updateDateTime" TIMESTAMP(3),
    "address" TEXT,
    "jobTitle" TEXT,
    "rating" INTEGER,
    "description" TEXT,
    "latitude" TEXT,
    "longtitude" TEXT,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "photo" (
    "id" SERIAL NOT NULL,
    "externalId" TEXT NOT NULL,

    CONSTRAINT "photo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "announcement" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "deadline" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "announcement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "role_id_key" ON "role"("id");

-- CreateIndex
CREATE UNIQUE INDEX "role_code_key" ON "role"("code");

-- CreateIndex
CREATE UNIQUE INDEX "priority_id_key" ON "priority"("id");

-- CreateIndex
CREATE UNIQUE INDEX "priority_code_key" ON "priority"("code");

-- CreateIndex
CREATE UNIQUE INDEX "linkType_id_key" ON "linkType"("id");

-- CreateIndex
CREATE UNIQUE INDEX "linkType_code_key" ON "linkType"("code");

-- CreateIndex
CREATE UNIQUE INDEX "filter_id_key" ON "filter"("id");

-- CreateIndex
CREATE UNIQUE INDEX "filter_code_key" ON "filter"("code");

-- CreateIndex
CREATE UNIQUE INDEX "userFilter_filterCode_userId_key" ON "userFilter"("filterCode", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "userLinkType_userId_linkTypeCode_key" ON "userLinkType"("userId", "linkTypeCode");

-- CreateIndex
CREATE UNIQUE INDEX "favorite_id_key" ON "favorite"("id");

-- CreateIndex
CREATE UNIQUE INDEX "announcementPhoto_photoId_key" ON "announcementPhoto"("photoId");

-- CreateIndex
CREATE UNIQUE INDEX "userPhoto_photoId_key" ON "userPhoto"("photoId");

-- CreateIndex
CREATE UNIQUE INDEX "markedCard_id_key" ON "markedCard"("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_id_key" ON "user"("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_phone_key" ON "user"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "photo_id_key" ON "photo"("id");

-- CreateIndex
CREATE UNIQUE INDEX "announcement_id_key" ON "announcement"("id");

-- AddForeignKey
ALTER TABLE "userFilter" ADD CONSTRAINT "userFilter_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userFilter" ADD CONSTRAINT "userFilter_filterCode_fkey" FOREIGN KEY ("filterCode") REFERENCES "filter"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userLinkType" ADD CONSTRAINT "userLinkType_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userLinkType" ADD CONSTRAINT "userLinkType_linkTypeCode_fkey" FOREIGN KEY ("linkTypeCode") REFERENCES "linkType"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorite" ADD CONSTRAINT "favorite_userSrcId_fkey" FOREIGN KEY ("userSrcId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorite" ADD CONSTRAINT "favorite_userTrgId_fkey" FOREIGN KEY ("userTrgId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userAnnouncement" ADD CONSTRAINT "userAnnouncement_announcementId_fkey" FOREIGN KEY ("announcementId") REFERENCES "announcement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userAnnouncement" ADD CONSTRAINT "userAnnouncement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "announcementPhoto" ADD CONSTRAINT "announcementPhoto_announcementId_fkey" FOREIGN KEY ("announcementId") REFERENCES "announcement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "announcementPhoto" ADD CONSTRAINT "announcementPhoto_photoId_fkey" FOREIGN KEY ("photoId") REFERENCES "photo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userPhoto" ADD CONSTRAINT "userPhoto_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userPhoto" ADD CONSTRAINT "userPhoto_photoId_fkey" FOREIGN KEY ("photoId") REFERENCES "photo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "markedCard" ADD CONSTRAINT "markedCard_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_roleCode_fkey" FOREIGN KEY ("roleCode") REFERENCES "role"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_priorityCode_fkey" FOREIGN KEY ("priorityCode") REFERENCES "priority"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
