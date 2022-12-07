/*
  Warnings:

  - Added the required column `username` to the `shopping_cart` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `shopping_cart` ADD COLUMN `category` VARCHAR(255) NULL,
    ADD COLUMN `href` VARCHAR(255) NULL,
    ADD COLUMN `username` VARCHAR(255) NOT NULL,
    MODIFY `title` VARCHAR(255) NULL,
    MODIFY `description` VARCHAR(1000) NULL,
    MODIFY `image` VARCHAR(255) NULL,
    MODIFY `price` VARCHAR(255) NULL;
