-- CreateTable
CREATE TABLE "TokenPasswordReset" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "token" TEXT NOT NULL,

    CONSTRAINT "TokenPasswordReset_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TokenPasswordReset_userId_key" ON "TokenPasswordReset"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "TokenPasswordReset_token_key" ON "TokenPasswordReset"("token");

-- AddForeignKey
ALTER TABLE "TokenPasswordReset" ADD CONSTRAINT "TokenPasswordReset_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
