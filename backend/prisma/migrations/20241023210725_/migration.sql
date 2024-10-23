-- AlterTable
ALTER TABLE "Artwork" ADD COLUMN     "borderColor" TEXT NOT NULL DEFAULT 'rgb(0, 0, 0)',
ADD COLUMN     "borderWidth" INTEGER NOT NULL DEFAULT 0;
