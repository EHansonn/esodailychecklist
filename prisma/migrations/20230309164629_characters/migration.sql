-- CreateTable
CREATE TABLE "Character" (
    "value" TEXT NOT NULL,
    "userId" TEXT,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("value")
);

-- CreateTable
CREATE TABLE "QuestsOnCharacter" (
    "characterId" TEXT NOT NULL,
    "questName" TEXT NOT NULL,

    CONSTRAINT "QuestsOnCharacter_pkey" PRIMARY KEY ("questName","characterId")
);

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestsOnCharacter" ADD CONSTRAINT "QuestsOnCharacter_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("value") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestsOnCharacter" ADD CONSTRAINT "QuestsOnCharacter_questName_fkey" FOREIGN KEY ("questName") REFERENCES "Quest"("value") ON DELETE CASCADE ON UPDATE CASCADE;
