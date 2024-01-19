-- CreateTable
CREATE TABLE `local_levels` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `district_id` INTEGER NOT NULL,
    `nepali_name` VARCHAR(191) NOT NULL,
    `english_name` VARCHAR(191) NOT NULL,
    `type` ENUM('vdc', 'municipality', 'sub_metropolitan', 'metropolitan') NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `local_levels_nepali_name_key`(`nepali_name`),
    UNIQUE INDEX `local_levels_english_name_key`(`english_name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `states` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nepali_name` VARCHAR(191) NOT NULL,
    `english_name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `states_nepali_name_key`(`nepali_name`),
    UNIQUE INDEX `states_english_name_key`(`english_name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `districts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `state_id` INTEGER NOT NULL,
    `nepali_name` VARCHAR(191) NOT NULL,
    `english_name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `districts_nepali_name_key`(`nepali_name`),
    UNIQUE INDEX `districts_english_name_key`(`english_name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `roles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `roles_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `role_id` INTEGER NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `mobile` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    UNIQUE INDEX `users_mobile_key`(`mobile`),
    UNIQUE INDEX `users_password_key`(`password`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `certifiers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `local_level_id` INTEGER NOT NULL,
    `nepali_name` VARCHAR(191) NOT NULL,
    `english_name` VARCHAR(191) NOT NULL,
    `post_nepali` VARCHAR(191) NOT NULL,
    `post_english` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `genders` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nepali_name` VARCHAR(191) NOT NULL,
    `english_name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `genders_nepali_name_key`(`nepali_name`),
    UNIQUE INDEX `genders_english_name_key`(`english_name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `disability_types` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nepali_name` VARCHAR(191) NOT NULL,
    `english_name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `disability_types_nepali_name_key`(`nepali_name`),
    UNIQUE INDEX `disability_types_english_name_key`(`english_name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `disables` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `gender_id` INTEGER NOT NULL,
    `state_id` INTEGER NOT NULL,
    `district_id` INTEGER NOT NULL,
    `local_level_id` INTEGER NOT NULL,
    `disability_type_id` INTEGER NOT NULL,
    `nepali_name` VARCHAR(191) NOT NULL,
    `english_name` VARCHAR(191) NOT NULL,
    `dob_ad` DATETIME(3) NOT NULL,
    `dob_bs` VARCHAR(191) NOT NULL,
    `age` INTEGER NOT NULL,
    `blood_group` ENUM('A_Positive', 'A_Negative', 'B_Positive', 'B_Negative', 'AB_Positive', 'AB_Negative', 'O_Positive', 'O_Negative') NOT NULL,
    `ward` INTEGER NOT NULL,
    `guardian_name_nepali` VARCHAR(191) NOT NULL,
    `guardian_name_english` VARCHAR(191) NOT NULL,
    `is_adult` BOOLEAN NOT NULL,
    `citizenship_no` VARCHAR(191) NULL,
    `citizenship_district_id` INTEGER NULL,
    `citizenship_issued_date_nepali` VARCHAR(191) NULL,
    `citizenship_issued_date_english` DATETIME(3) NULL,
    `disability_level` ENUM('full', 'severe', 'medium', 'normal') NOT NULL,
    `image_url` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `senior_citizens` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `gender_id` INTEGER NOT NULL,
    `state_id` INTEGER NOT NULL,
    `district_id` INTEGER NOT NULL,
    `local_level_id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `street` VARCHAR(191) NOT NULL,
    `dob_ad` DATETIME(3) NOT NULL,
    `dob_bs` VARCHAR(191) NOT NULL,
    `age` INTEGER NOT NULL,
    `blood_group` ENUM('A_Positive', 'A_Negative', 'B_Positive', 'B_Negative', 'AB_Positive', 'AB_Negative', 'O_Positive', 'O_Negative') NOT NULL,
    `citizenship_no` VARCHAR(191) NOT NULL,
    `citizenship_district_id` INTEGER NOT NULL,
    `citizenship_issued_date_nepali` VARCHAR(191) NOT NULL,
    `citizenship_issued_date_english` DATETIME(3) NOT NULL,
    `spouse_name` VARCHAR(191) NULL,
    `facilities` VARCHAR(191) NULL,
    `contact_person_name` VARCHAR(191) NULL,
    `contact_person_address` VARCHAR(191) NULL,
    `certificate_no` VARCHAR(191) NULL,
    `home_care_name` VARCHAR(191) NULL,
    `disease` VARCHAR(191) NULL,
    `medicine` VARCHAR(191) NULL,
    `image_url` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `local_levels` ADD CONSTRAINT `local_levels_district_id_fkey` FOREIGN KEY (`district_id`) REFERENCES `districts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `districts` ADD CONSTRAINT `districts_state_id_fkey` FOREIGN KEY (`state_id`) REFERENCES `states`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `certifiers` ADD CONSTRAINT `certifiers_local_level_id_fkey` FOREIGN KEY (`local_level_id`) REFERENCES `local_levels`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `disables` ADD CONSTRAINT `disables_gender_id_fkey` FOREIGN KEY (`gender_id`) REFERENCES `genders`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `disables` ADD CONSTRAINT `disables_state_id_fkey` FOREIGN KEY (`state_id`) REFERENCES `states`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `disables` ADD CONSTRAINT `disables_district_id_fkey` FOREIGN KEY (`district_id`) REFERENCES `districts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `disables` ADD CONSTRAINT `disables_local_level_id_fkey` FOREIGN KEY (`local_level_id`) REFERENCES `local_levels`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `disables` ADD CONSTRAINT `disables_disability_type_id_fkey` FOREIGN KEY (`disability_type_id`) REFERENCES `disability_types`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `senior_citizens` ADD CONSTRAINT `senior_citizens_gender_id_fkey` FOREIGN KEY (`gender_id`) REFERENCES `genders`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `senior_citizens` ADD CONSTRAINT `senior_citizens_state_id_fkey` FOREIGN KEY (`state_id`) REFERENCES `states`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `senior_citizens` ADD CONSTRAINT `senior_citizens_district_id_fkey` FOREIGN KEY (`district_id`) REFERENCES `districts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `senior_citizens` ADD CONSTRAINT `senior_citizens_local_level_id_fkey` FOREIGN KEY (`local_level_id`) REFERENCES `local_levels`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
