/*
  Warnings:

  - You are about to drop the column `userId` on the `TokenPasswordReset` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userEmail]` on the table `TokenPasswordReset` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userEmail` to the `TokenPasswordReset` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TokenPasswordReset" DROP CONSTRAINT "TokenPasswordReset_userId_fkey";

-- DropIndex
DROP INDEX "TokenPasswordReset_userId_key";

-- AlterTable
ALTER TABLE "TokenPasswordReset" DROP COLUMN "userId",
ADD COLUMN     "userEmail" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "TokenPasswordReset_userEmail_key" ON "TokenPasswordReset"("userEmail");

-- AddForeignKey
ALTER TABLE "TokenPasswordReset" ADD CONSTRAINT "TokenPasswordReset_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
