/*
  Warnings:

  - You are about to drop the column `groups` on the `category` table. All the data in the column will be lost.
  - Added the required column `typ` to the `category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `category` DROP COLUMN `groups`,
    ADD COLUMN `typ` VARCHAR(255) NOT NULL;
