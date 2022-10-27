/*
  Warnings:

  - You are about to drop the column `videoId` on the `Stamp` table. All the data in the column will be lost.
  - You are about to drop the `Video` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Stamp" DROP CONSTRAINT "Stamp_videoId_fkey";

-- AlterTable
ALTER TABLE "Stamp" DROP COLUMN "videoId";

-- DropTable
DROP TABLE "Video";
