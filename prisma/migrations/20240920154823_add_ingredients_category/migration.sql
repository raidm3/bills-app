/*
  Warnings:

  - Added the required column `category` to the `ingredients` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ingredients" ADD COLUMN     "category" TEXT NOT NULL;
