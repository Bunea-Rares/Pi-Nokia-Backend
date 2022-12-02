/*
  Warnings:

  - You are about to drop the column `userToTeamTeamId` on the `Team` table. All the data in the column will be lost.
  - You are about to drop the column `userToTeamUserId` on the `Team` table. All the data in the column will be lost.
  - You are about to drop the column `userToTeamTeamId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `userToTeamUserId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id,authorId,teamId]` on the table `Task` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `Team` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id,ownerId]` on the table `Team` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Team" DROP COLUMN "userToTeamTeamId",
DROP COLUMN "userToTeamUserId";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "userToTeamTeamId",
DROP COLUMN "userToTeamUserId";

-- CreateIndex
CREATE UNIQUE INDEX "Task_id_authorId_teamId_key" ON "Task"("id", "authorId", "teamId");

-- CreateIndex
CREATE UNIQUE INDEX "Team_code_key" ON "Team"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Team_id_ownerId_key" ON "Team"("id", "ownerId");
