/*
  Warnings:

  - You are about to drop the column `uuid` on the `User` table. All the data in the column will be lost.
  - The `status` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "uuid",
DROP COLUMN "status",
ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT false;

-- DropEnum
DROP TYPE "USER_STATUS";

-- CreateTable
CREATE TABLE "TokenMailConfirmation" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "token" TEXT NOT NULL,

    CONSTRAINT "TokenMailConfirmation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TokenMailConfirmation_userId_key" ON "TokenMailConfirmation"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "TokenMailConfirmation_token_key" ON "TokenMailConfirmation"("token");

-- AddForeignKey
ALTER TABLE "TokenMailConfirmation" ADD CONSTRAINT "TokenMailConfirmation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
