/*
  Warnings:

  - Made the column `yearBuilt` on table `Property` required. This step will fail if there are existing NULL values in that column.
  - Made the column `elevator` on table `Property` required. This step will fail if there are existing NULL values in that column.
  - Made the column `parkingSpaces` on table `Property` required. This step will fail if there are existing NULL values in that column.
  - Made the column `furnished` on table `Property` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Property" ALTER COLUMN "yearBuilt" SET NOT NULL,
ALTER COLUMN "elevator" SET NOT NULL,
ALTER COLUMN "parkingSpaces" SET NOT NULL,
ALTER COLUMN "furnished" SET NOT NULL;

-- CreateTable
CREATE TABLE "Service" (
    "id" SERIAL NOT NULL,
    "service" TEXT NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceToProperty" (
    "id" SERIAL NOT NULL,
    "propertyId" INTEGER NOT NULL,
    "serviceId" INTEGER NOT NULL,

    CONSTRAINT "ServiceToProperty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImagesToProperty" (
    "id" SERIAL NOT NULL,
    "propertyId" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "publishedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ImagesToProperty_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ServiceToProperty" ADD CONSTRAINT "ServiceToProperty_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceToProperty" ADD CONSTRAINT "ServiceToProperty_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImagesToProperty" ADD CONSTRAINT "ImagesToProperty_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
