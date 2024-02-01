/*
  Warnings:

  - You are about to drop the column `nearest_place_id` on the `Nearest_place` table. All the data in the column will be lost.
  - Added the required column `nearest_place` to the `Nearest_place` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Nearest_place` DROP FOREIGN KEY `Nearest_place_nearest_place_id_fkey`;

-- AlterTable
ALTER TABLE `Nearest_place` DROP COLUMN `nearest_place_id`,
    ADD COLUMN `nearest_place` VARCHAR(191) NOT NULL;
