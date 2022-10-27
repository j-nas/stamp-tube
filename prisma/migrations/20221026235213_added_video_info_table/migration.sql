/*
  Warnings:

  - You are about to drop the column `timestampsAuthoredId` on the `User` table. All the data in the column will be lost.
  - Added the required column `videoId` to the `Stamp` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Stamp" ADD COLUMN     "videoId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "timestampsAuthoredId";

-- CreateTable
CREATE TABLE "Video" (
    "id" TEXT NOT NULL,
    "ytId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "duration" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Stamp" ADD CONSTRAINT "Stamp_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
