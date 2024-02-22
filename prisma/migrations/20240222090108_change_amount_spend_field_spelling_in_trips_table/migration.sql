/*
  Warnings:

  - You are about to drop the column `amount_spend` on the `Trips` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Trips` DROP COLUMN `amount_spend`,
    ADD COLUMN `amount_spend` INTEGER NOT NULL DEFAULT 0;
