-- DropForeignKey
ALTER TABLE `Trip_days` DROP FOREIGN KEY `Trip_days_place_id_fkey`;

-- AddForeignKey
ALTER TABLE `Trip_days` ADD CONSTRAINT `Trip_days_place_id_fkey` FOREIGN KEY (`place_id`) REFERENCES `Places`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
