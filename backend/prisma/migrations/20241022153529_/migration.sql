/*
  Warnings:

  - You are about to drop the `Config` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "firebaseId" DROP DEFAULT,
ALTER COLUMN "email" DROP DEFAULT;

-- DropTable
DROP TABLE "Config";

-- CreateTable
CREATE TABLE "Artwork" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "xVelocity" INTEGER NOT NULL DEFAULT 0,
    "yVelocity" INTEGER NOT NULL DEFAULT 0,
    "userid" TEXT,

    CONSTRAINT "Artwork_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Artwork" ADD CONSTRAINT "Artwork_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
