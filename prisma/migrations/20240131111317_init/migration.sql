-- CreateTable
CREATE TABLE `States` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `state` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Places` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `place` VARCHAR(191) NOT NULL,
    `state_id` INTEGER NOT NULL,
    `landscape` VARCHAR(191) NOT NULL,
    `is_visited` BOOLEAN NOT NULL DEFAULT false,
    `is_oneday_trip` BOOLEAN NOT NULL DEFAULT false,
    `stay_option` VARCHAR(191) NULL,
    `best_time_to_visit` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Spots` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `spot` VARCHAR(191) NOT NULL,
    `place_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Nearest_place` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `place_id` INTEGER NOT NULL,
    `nearest_place_id` INTEGER NOT NULL,

    UNIQUE INDEX `Nearest_place_place_id_key`(`place_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Places` ADD CONSTRAINT `Places_state_id_fkey` FOREIGN KEY (`state_id`) REFERENCES `States`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Spots` ADD CONSTRAINT `Spots_place_id_fkey` FOREIGN KEY (`place_id`) REFERENCES `Places`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Nearest_place` ADD CONSTRAINT `Nearest_place_place_id_fkey` FOREIGN KEY (`place_id`) REFERENCES `Places`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Nearest_place` ADD CONSTRAINT `Nearest_place_nearest_place_id_fkey` FOREIGN KEY (`nearest_place_id`) REFERENCES `Places`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
