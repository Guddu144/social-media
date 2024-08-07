/*
  Warnings:

  - You are about to alter the column `category` on the `Event` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.
  - You are about to drop the column `profilePicture` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Event` MODIFY `category` ENUM('MUSIC', 'SPORT', 'TECH') NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `profilePicture`;
