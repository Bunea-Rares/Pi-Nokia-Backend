/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `UserToTeam` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `teamId` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "UserToTeam_teamId_key";

-- DropIndex
DROP INDEX "UserToTeam_userId_key";

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "teamId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Team" ADD COLUMN     "userToTeamTeamId" INTEGER,
ADD COLUMN     "userToTeamUserId" INTEGER;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "userToTeamTeamId" INTEGER,
ADD COLUMN     "userToTeamUserId" INTEGER;

-- AlterTable
ALTER TABLE "UserToTeam" ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "UserToTeam_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "UserToTeam_id_key" ON "UserToTeam"("id");

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
