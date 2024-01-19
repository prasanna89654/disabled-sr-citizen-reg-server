/*
  Warnings:

  - You are about to drop the column `name` on the `roles` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `roles` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nepali_name]` on the table `roles` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[english_name]` on the table `roles` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `english_name` to the `roles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nepali_name` to the `roles` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `roles_name_key` ON `roles`;

-- AlterTable
ALTER TABLE `roles` DROP COLUMN `name`,
    ADD COLUMN `english_name` VARCHAR(191) NOT NULL,
    ADD COLUMN `nepali_name` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `roles_id_key` ON `roles`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `roles_nepali_name_key` ON `roles`(`nepali_name`);

-- CreateIndex
CREATE UNIQUE INDEX `roles_english_name_key` ON `roles`(`english_name`);
