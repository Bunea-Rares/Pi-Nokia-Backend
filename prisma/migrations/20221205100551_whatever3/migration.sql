/*
  Warnings:

  - The required column `uuid` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- CreateEnum
CREATE TYPE "USER_STATUS" AS ENUM ('PENDING', 'ACTIVE');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "status" "USER_STATUS" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "uuid" TEXT NOT NULL;
