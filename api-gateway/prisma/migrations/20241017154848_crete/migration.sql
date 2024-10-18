-- CreateTable
CREATE TABLE "acc" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "hashpassword" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "acc_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "acc_authority" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "authority" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userRoleId" TEXT NOT NULL,

    CONSTRAINT "acc_authority_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "acc_username_key" ON "acc"("username");
