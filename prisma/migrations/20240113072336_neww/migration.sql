/*
  Warnings:

  - A unique constraint covering the columns `[nepali_name,english_name]` on the table `roles` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `roles_nepali_name_english_name_key` ON `roles`(`nepali_name`, `english_name`);
