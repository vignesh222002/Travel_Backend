-- DropForeignKey
ALTER TABLE `Spots` DROP FOREIGN KEY `Spots_place_id_fkey`;

-- AddForeignKey
ALTER TABLE `Spots` ADD CONSTRAINT `Spots_place_id_fkey` FOREIGN KEY (`place_id`) REFERENCES `Places`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
