/*
  Warnings:

  - You are about to drop the column `order` on the `ImagesToProperty` table. All the data in the column will be lost.
  - You are about to drop the column `images` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `security24h` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `services` on the `Property` table. All the data in the column will be lost.
  - Added the required column `imageMain` to the `Property` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ImagesToProperty" DROP COLUMN "order";

-- AlterTable
ALTER TABLE "Property" DROP COLUMN "images",
DROP COLUMN "security24h",
DROP COLUMN "services",
ADD COLUMN     "imageMain" TEXT NOT NULL;
