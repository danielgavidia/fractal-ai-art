/*
  Warnings:

  - The `ballColor` column on the `Artwork` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `backgroundColor` column on the `Artwork` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `borderColor` column on the `Artwork` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Artwork" DROP COLUMN "ballColor",
ADD COLUMN     "ballColor" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "backgroundColor",
ADD COLUMN     "backgroundColor" INTEGER NOT NULL DEFAULT 360,
DROP COLUMN "borderColor",
ADD COLUMN     "borderColor" INTEGER NOT NULL DEFAULT 360;
