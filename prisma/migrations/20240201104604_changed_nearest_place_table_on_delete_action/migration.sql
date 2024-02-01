-- DropForeignKey
ALTER TABLE `Nearest_place` DROP FOREIGN KEY `Nearest_place_place_id_fkey`;

-- AddForeignKey
ALTER TABLE `Nearest_place` ADD CONSTRAINT `Nearest_place_place_id_fkey` FOREIGN KEY (`place_id`) REFERENCES `Places`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
