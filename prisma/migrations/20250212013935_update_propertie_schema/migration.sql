/*
  Warnings:

  - Changed the type of `parkingSpaces` on the `Property` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Property" DROP COLUMN "parkingSpaces",
ADD COLUMN     "parkingSpaces" BOOLEAN NOT NULL;
