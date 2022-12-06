/*
  Warnings:

  - A unique constraint covering the columns `[userEmail,token]` on the table `TokenPasswordReset` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "TokenPasswordReset_userEmail_token_key" ON "TokenPasswordReset"("userEmail", "token");
