/*
  Warnings:

  - You are about to drop the column `status` on the `Ticket` table. All the data in the column will be lost.
  - Added the required column `status` to the `ReservationHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ReservationHistory` ADD COLUMN `status` ENUM('reserved', 'canceled') NOT NULL;

-- AlterTable
ALTER TABLE `Ticket` DROP COLUMN `status`;
