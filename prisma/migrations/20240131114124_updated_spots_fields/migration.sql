/*
  Warnings:

  - Added the required column `category` to the `Spots` table without a default value. This is not possible if the table is not empty.
  - Added the required column `season` to the `Spots` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timing` to the `Spots` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Spots` ADD COLUMN `category` VARCHAR(191) NOT NULL,
    ADD COLUMN `description` VARCHAR(191) NULL,
    ADD COLUMN `google_location` VARCHAR(191) NULL,
    ADD COLUMN `must_visit` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `season` VARCHAR(191) NOT NULL,
    ADD COLUMN `timing` VARCHAR(191) NOT NULL;
