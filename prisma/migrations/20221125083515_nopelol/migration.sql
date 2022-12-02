/*
  Warnings:

  - You are about to drop the column `owner` on the `Team` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,teamId]` on the table `UserToTeam` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ownerId` to the `Team` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "priority" SET DEFAULT 'LOW',
ALTER COLUMN "status" SET DEFAULT 'NOT_ASSIGNED';

-- AlterTable
ALTER TABLE "Team" DROP COLUMN "owner",
ADD COLUMN     "ownerId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "UserToTeam_userId_teamId_key" ON "UserToTeam"("userId", "teamId");

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
