-- CreateTable
CREATE TABLE "YourModel" (
    "id" SERIAL NOT NULL,
    "yourNumberField" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "YourModel_pkey" PRIMARY KEY ("id")
);
