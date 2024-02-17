-- CreateTable
CREATE TABLE `Trips` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Trip_days` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `trip_id` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `place_id` INTEGER NOT NULL,
    `spot_id` INTEGER NOT NULL,
    `order` INTEGER NOT NULL,
    `description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Trip_days` ADD CONSTRAINT `Trip_days_trip_id_fkey` FOREIGN KEY (`trip_id`) REFERENCES `Trips`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Trip_days` ADD CONSTRAINT `Trip_days_spot_id_fkey` FOREIGN KEY (`spot_id`) REFERENCES `Spots`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
