-- AlterTable
ALTER TABLE "Artwork" ADD COLUMN     "ballSize" INTEGER NOT NULL DEFAULT 30,
ALTER COLUMN "xVelocity" SET DEFAULT 2,
ALTER COLUMN "yVelocity" SET DEFAULT 2;
