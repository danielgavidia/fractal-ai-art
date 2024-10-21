-- CreateTable
CREATE TABLE "Config" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "xVelocity" INTEGER NOT NULL DEFAULT 0,
    "yVelocity" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Config_pkey" PRIMARY KEY ("id")
);
