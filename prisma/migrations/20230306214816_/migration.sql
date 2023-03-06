-- CreateTable
CREATE TABLE "QuestsOnUser" (
    "userId" TEXT NOT NULL,
    "questName" TEXT NOT NULL,

    CONSTRAINT "QuestsOnUser_pkey" PRIMARY KEY ("questName","userId")
);

-- AddForeignKey
ALTER TABLE "QuestsOnUser" ADD CONSTRAINT "QuestsOnUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestsOnUser" ADD CONSTRAINT "QuestsOnUser_questName_fkey" FOREIGN KEY ("questName") REFERENCES "Quest"("value") ON DELETE RESTRICT ON UPDATE CASCADE;
