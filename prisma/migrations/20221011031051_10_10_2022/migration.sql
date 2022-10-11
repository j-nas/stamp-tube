/*
  Warnings:

  - Added the required column `published` to the `Timestamp` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstTimestampAdded` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Timestamp" ADD COLUMN     "published" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Video" ADD COLUMN     "firstTimestampAdded" TIMESTAMP(3) NOT NULL;
