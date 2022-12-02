/*
  Warnings:

  - A unique constraint covering the columns `[id,authorId]` on the table `Task` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Task_id_authorId_teamId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Task_id_authorId_key" ON "Task"("id", "authorId");
