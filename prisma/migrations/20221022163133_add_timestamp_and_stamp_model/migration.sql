-- CreateTable
CREATE TABLE "Stamp" (
    "id" TEXT NOT NULL,
    "video" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "Stamp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TimeStamp" (
    "id" TEXT NOT NULL,
    "time" DECIMAL(65,30) NOT NULL,
    "label" TEXT NOT NULL,
    "stampId" TEXT NOT NULL,

    CONSTRAINT "TimeStamp_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TimeStamp_time_key" ON "TimeStamp"("time");

-- AddForeignKey
ALTER TABLE "Stamp" ADD CONSTRAINT "Stamp_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeStamp" ADD CONSTRAINT "TimeStamp_stampId_fkey" FOREIGN KEY ("stampId") REFERENCES "Stamp"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
