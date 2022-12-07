/*
  Warnings:

  - You are about to drop the column `username` on the `shopping_cart` table. All the data in the column will be lost.
  - Added the required column `name` to the `shopping_cart` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `shopping_cart` DROP COLUMN `username`,
    ADD COLUMN `name` VARCHAR(255) NOT NULL;
