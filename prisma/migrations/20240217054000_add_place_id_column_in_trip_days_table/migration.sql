/*
  Warnings:

  - Added the required column `place_id` to the `Trip_days` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Trip_days` ADD COLUMN `place_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Trip_days` ADD CONSTRAINT `Trip_days_place_id_fkey` FOREIGN KEY (`place_id`) REFERENCES `Places`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
