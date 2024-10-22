/*
  Warnings:

  - You are about to drop the column `userid` on the `Artwork` table. All the data in the column will be lost.
  - You are about to drop the column `userid` on the `Like` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `Artwork` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Like` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,artworkId]` on the table `Like` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Artwork" DROP CONSTRAINT "Artwork_userid_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_userid_fkey";

-- AlterTable
ALTER TABLE "Artwork" DROP COLUMN "userid",
ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "Like" DROP COLUMN "userid",
ADD COLUMN     "userId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Artwork_id_key" ON "Artwork"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Like_id_key" ON "Like"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Like_userId_artworkId_key" ON "Like"("userId", "artworkId");

-- AddForeignKey
ALTER TABLE "Artwork" ADD CONSTRAINT "Artwork_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
