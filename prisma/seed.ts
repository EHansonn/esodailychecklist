import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

//Only do this when you need to update a large number of the preset quests
//It will remove all the quests attached to user's lists.
async function main() {
  await prisma.quest.deleteMany();
  await prisma.quest.createMany({
    data: [
      {
        value: "Maj al-Ragath's Pledges",
        category: "Undaunted Pledges",
        description:
          "Undaunted Pledges are daily quests available at Undaunted Enclaves. You must be level 45 to receive a Normal pledge and level 50 to receive a Veteran pledge. Only one of each type of pledge is offered per day, although technically a pledge from a previous day can also be completed if it was obtained but not completed.",
        repeatable: "daily",
        location: "Undaunted Enclave",
        questGiver: "Maj al-Ragath",
        uespLink:
          "https://en.uesp.net/wiki/Online:Repeatable_Quests#Maj_al-Ragath.27s_Pledges",
        reward: "Keys",
      },
      {
        value: "Glirion the Redbeard's Pledges",
        category: "Undaunted Pledges",
        description:
          "Undaunted Pledges are daily quests available at Undaunted Enclaves. You must be level 45 to receive a Normal pledge and level 50 to receive a Veteran pledge. Only one of each type of pledge is offered per day, although technically a pledge from a previous day can also be completed if it was obtained but not completed.",
        repeatable: "daily",
        location: "Undaunted Enclave",
        questGiver: "Glirion the Redbeard",
        uespLink:
          "https://en.uesp.net/wiki/Online:Repeatable_Quests#Glirion_the_Redbeard.27s_Pledges",
        reward: "Keys",
      },
      {
        value: "Urgarlag Chief-bane's Pledges",
        category: "Undaunted Pledges",
        description:
          "Undaunted Pledges are daily quests available at Undaunted Enclaves. You must be level 45 to receive a Normal pledge and level 50 to receive a Veteran pledge. Only one of each type of pledge is offered per day, although technically a pledge from a previous day can also be completed if it was obtained but not completed.",
        repeatable: "daily",
        location: "Undaunted Enclave",
        questGiver: "Urgarlag Chief-bane",
        uespLink:
          "https://en.uesp.net/wiki/Online:Repeatable_Quests#Urgarlag_Chief-bane.27s_Pledges",
        reward: "Keys",
      },
      {
        value: "Fighters Guild Daily Quests",
        category: "Guild Daily Quests",
        description:
          "These are offered by Cardea Gallus, who can be found at the Fighters Guild Halls in Elden Root (Grahtwood), Wayrest (Stormhaven), and Mournhold (Deshaan). One can be completed per day, and they can be shared with others",
        repeatable: "daily",
        location:
          "Fighters Guild Halls in Elden Root (Grahtwood), Wayrest (Stormhaven), and Mournhold (Deshaan)",
        questGiver: "Cardea Gallus",
        uespLink:
          "https://en.uesp.net/wiki/Online:Repeatable_Quests#Fighters_Guild_Daily_Quests",
        reward: "Fighters Guild Merrits",
      },
      {
        value: "Mages Guild Daily Quests",
        category: "Guild Daily Quests",
        description:
          "These are offered by Alvur Baren, who can be found at the Mages Guild Halls in Elden Root (Grahtwood), Wayrest (Stormhaven), and Mournhold (Deshaan). One can be completed per day, and they can be shared with others.",
        repeatable: "daily",
        location:
          "Mages Guild Halls in Elden Root (Grahtwood), Wayrest (Stormhaven), and Mournhold (Deshaan).",
        questGiver: "Alvur Baren",
        uespLink:
          "https://en.uesp.net/wiki/Online:Repeatable_Quests#Mages_Guild_Daily_Quests",
        reward: "Mages Guild Merits",
      },
      {
        value: "Undaunted Daily Quests",
        category: "Guild Daily Quests",
        description:
          "These are offered by Bolgrul, who can be found at the Undaunted Enclave in Elden Root (Grahtwood), Wayrest (Stormhaven), and Mournhold (Deshaan). One can be completed per day, and they can be shared with others.",
        repeatable: "daily",
        location:
          "Elden Root (Grahtwood), Wayrest (Stormhaven), and Mournhold (Deshaan).",
        questGiver: "Bolgrul",
        uespLink:
          "https://en.uesp.net/wiki/Online:Repeatable_Quests#Undaunted_Daily_Quests",
        reward: "Undaunted Merits",
      },
      {
        value: "Consumables Crafting Writs",
        category: "Crafting Writs",
        description:
          "Crafting Writs are repeatable quests available to certified crafters. After the initial certification quest, a daily writ can be accepted from the relevant noticeboard in most major cities. Days for crafting writs reset at 6:00 AM GMT, (2:00AM EST/11:00PM PST). \nThese are available from Consumables Crafting Writs Boards. Each writ can be completed once per day, and they cannot be shared with others.",
        repeatable: "daily",
        location: "Major Cities",
        questGiver: "Consumables Crafting Writs Board",
        uespLink:
          "https://en.uesp.net/wiki/Online:Repeatable_Quests#Consumables_Crafting_Writs",
        reward: "Gold",
      },
      {
        value: "Equipment Crafting Writs",
        category: "Crafting Writs",
        description:
          "Crafting Writs are repeatable quests available to certified crafters. After the initial certification quest, a daily writ can be accepted from the relevant noticeboard in most major cities. Days for crafting writs reset at 6:00 AM GMT, (2:00AM EST/11:00PM PST). These are available from Equipment Crafting Writs Boards. Each writ can be completed once per day, and they cannot be shared with others.",
        repeatable: "daily",
        location: "Major Cities",
        questGiver: "Equipment Crafting Writs Board",
        uespLink:
          "https://en.uesp.net/wiki/Online:Repeatable_Quests#Equipment_Crafting_Writs",
        reward: "Gold",
      },
      {
        value: "Master Writs",
        category: "Crafting Writs",
        description:
          "Crafting Writs are repeatable quests available to certified crafters. After the initial certification quest, a daily writ can be accepted from the relevant noticeboard in most major cities. Days for crafting writs reset at 6:00 AM GMT, (2:00AM EST/11:00PM PST). Sealed Master Writs may be awarded at the higher levels for completing normal crafting writs, and opening one will start a Master Writ quest. These can be completed as many times as you have collected Sealed Master Writs, and are not restricted in the number you can complete per day. You can only have one Master Writ quest active at one time, but you may have items for other writs pre-crafted before starting them, allowing you to turn in as many writs as you want in one visit. They cannot be shared with others.",
        repeatable: "daily",
        location: "Auction House",
        questGiver: "",
        uespLink:
          "https://en.uesp.net/wiki/Online:Repeatable_Quests#Master_Writs",
        reward: "Writ Vouchers",
      },
      {
        value: "Holiday Writs",
        category: "Crafting Writs",
        description:
          "Crafting Writs are repeatable quests available to certified crafters. After the initial certification quest, a daily writ can be accepted from the relevant noticeboard in most major cities. Days for crafting writs reset at 6:00 AM GMT, (2:00AM EST/11:00PM PST). Deep Winter Charity Writs and Imperial Charity Writs are awarded for completing quests during the New Life Festival. These can be completed as many times as you have collected Deep Winter Charity Writs and Imperial Charity Writs, and are not restricted in the number you can complete per day. You can only have one Deep Winter Charity Writ and Imperial Charity Writ quest active at one time, but you may have items for other writs pre-crafted before starting them, allowing you to turn in as many writs as you want in one visit. They cannot be shared with others.",
        repeatable: "daily",
        location: "",
        questGiver: "",
        uespLink:
          "https://en.uesp.net/wiki/Online:Repeatable_Quests#Holiday_Writs",
        reward: "Writ Vouchers",
      },
      {
        value: "Daily Login Reward",
        category: "Daily Tasks",
        description:
          "Log in each day, hit the button that says collect your reward, and eventually reach a somewhat larger reward at the end of the month",
        repeatable: "daily",
        location: "",
        questGiver: "",
        uespLink: "",
        reward: "",
      },
      {
        value: "Daily Mount Upgrades",
        category: "Daily Tasks",
        description:
          "You can train your character's Riding Skill every 20 hours at stablemasters, or as often as you like via the Crown Store, to receive a bonus to speed, inventory space, or stamina (up to the maximum of 60 points in each stat). The bonuses are permanent and cumulative, and are bound to the character rather than the mount, making the different mount types cosmetic. Three visual upgrades can also be applied to your mounts by increasing these stats. For more information, see Riding Skill.",
        repeatable: "daily",
        location: "",
        questGiver: "",
        uespLink: "https://en.uesp.net/wiki/Online:Mounts",
        reward: "",
      },
      {
        value: "Crafting Trait Research",
        category: "Daily Tasks",
        description:
          "Researching a trait will unlock it only for that particular type of item - e.g. researching the Reinforced trait on pauldrons will only allow you to construct reinforced heavy armor shoulders, but not any other heavy armor items like cuirass or sabatons, or any other shoulder slot items like epaulets or arm cops. The only exceptions are robes and jerkins, which are simply two different styles of light armor chest items. Researching is performed on a per-character basis, i.e., researching a trait on one character does not unlock that trait on any other character on that account.",
        repeatable: "daily",
        location: "",
        questGiver: "",
        uespLink: "https://en.uesp.net/wiki/Online:Traits#Research",
        reward: "",
      },
      {
        value: "Daily Random Dungeons",
        category: "Daily Tasks",
        description:
          "The Undaunted also offer rewards for completing random dungeons through the dungeon finder. Unlike pledges, there are no objectives to complete and no quest is given. The rewards and experience are automatically sent to you the moment the final boss of the dungeon dies. Completing the Daily event will grant Premium Undaunted Exploration Supplies. This event has a 20 hour cooldown per character, which means that any subsequent completion with the same character before the time is up will grant Undaunted Exploration Supplies. This is the same regardless of whether the dungeon is set to Normal or Veteran difficulty.",
        repeatable: "daily",
        location: "",
        questGiver: "",
        uespLink: "https://en.uesp.net/wiki/Online:Undaunted#Daily_Dungeons",
        reward:
          "Premium Undaunted Exploration Supplies or Undaunted Exploration Supplies",
      },
      {
        value: "Daily Battleground",
        category: "Daily Tasks",
        description:
          "Complete a random battleground once a day. Gives a huge chunk of xp, great for level alts.",
        repeatable: "daily",
        location: "",
        questGiver: "",
        uespLink:
          "https://en.uesp.net/wiki/Online:Battlegrounds#Repeatable_Quests",
        reward: "",
      },
      {
        value: "Daily Endeavors",
        category: "Daily Tasks",
        description:
          "Endeavors is a system introduced with Update 30 and was activated on June 17 2021. They are account-wide, limited time activities that reward a new currency, Seals of Endeavor. These can be used to purchase any item from a currently active Crown Crate. Endeavors reward you for completing simple tasks, such as killing a number of creatures, crafting a number of items from a specific tradeskill, etc, and can be found in the Group & Activity Finder. You can complete three of the five Daily Endeavors per day, and one of the three Weekly Endeavors per week, after which the other Endeavors are locked out.",
        repeatable: "daily",
        location: "Anywhere",
        questGiver: "",
        uespLink: "https://en.uesp.net/wiki/Online:Endeavors",
        reward: "Seals of Endeavor",
      },
      {
        value: "Weekly Endeavors",
        category: "Daily Tasks",
        description:
          "Endeavors is a system introduced with Update 30 and was activated on June 17 2021. They are account-wide, limited time activities that reward a new currency, Seals of Endeavor. These can be used to purchase any item from a currently active Crown Crate. Endeavors reward you for completing simple tasks, such as killing a number of creatures, crafting a number of items from a specific tradeskill, etc, and can be found in the Group & Activity Finder. You can complete three of the five Daily Endeavors per day, and one of the three Weekly Endeavors per week, after which the other Endeavors are locked out.",
        repeatable: "weekly",
        location: "Anywhere",
        questGiver: "",
        uespLink: "https://en.uesp.net/wiki/Online:Endeavors",
        reward: "Seals of Endeavor",
      },
      {
        value: "Assaulting the Citadel",
        category: "Trials",
        optionalTitle: "Hel Ra Citadel",
        description: "Launch an attack on the Celestial Warrior's stronghold.",
        repeatable: "weekly",
        location: "Hel Ra Citadel",
        questGiver: "Kailstig the Axe",
        uespLink: "https://en.uesp.net/wiki/Online:Assaulting_the_Citadel",
        reward:
          "Warrior's Dulled Coffer (Normal Mode) or Warrior's Honed Coffer (Veteran Mode)",
      },
      {
        value: "The Fight for Kyne's Aegis",
        category: "Trials",
        optionalTitle: "Kyne's Aegis",
        description: "Retake Kyne's Aegis from a Vampire Lord's army.",
        repeatable: "weekly",
        location: "Kyne's Aegis",
        questGiver: "Thane Ogvar",
        uespLink:
          "https://en.uesp.net/wiki/Online:The_Fight_for_Kyne%27s_Aegis",
        reward:
          "Kyne's Mundane Coffer (Normal Mode) or Kyne's Gleaming Coffer (Veteran Mode)",
      },
      {
        value: "Forging the Future",
        category: "Trials",
        optionalTitle: "Halls of Fabrication",
        description:
          "Stem the tide of fabricants before they overwhelm Tel Fyr.",
        repeatable: "weekly",
        location: "Halls of Fabrication",
        questGiver: "Divayth Fyr",
        uespLink: "https://en.uesp.net/wiki/Online:Forging_the_Future",
        reward:
          "Fabricant's Burnished Coffer (Normal Mode) or Fabricant's Shining Coffer (Veteran Mode)",
      },
      {
        value: "Into the Maw",
        category: "Trials",
        optionalTitle: "Maw of Lorkhaj",
        description: "Stop the dro-m'Athra from flooding into Tamriel.",
        repeatable: "weekly",
        location: "Maw of Lorkhaj",
        questGiver: "Adara'hai",
        uespLink: "https://en.uesp.net/wiki/Online:Into_the_Maw",
        reward:
          "Dro-m'Athra's Burnished Coffer (Normal Mode) orDro-m'Athra's Shining Coffer (Veteran Mode)",
      },
      {
        value: "Of Stone and Steam",
        category: "Trials",
        optionalTitle: "Rockgrove",
        description:
          "Save the souls of Rockgrove's fallen and drive back the Dagonite invaders.",
        repeatable: "weekly",
        location: "Rockgrove",
        questGiver: "Dust-On-Scales",
        uespLink: "https://en.uesp.net/wiki/Online:Of_Stone_and_Steam",
        reward:
          "Rockgrove Mundane Coffer (Normal Mode) or Gleaming Rockgrove Coffer (Veteran Mode)",
      },
      {
        value: "The Mage's Tower",
        category: "Trials",
        optionalTitle: "Aetherian Archive",
        description: "Defeat the Celestial Mage to save her from the Serpent.",
        repeatable: "weekly",
        location: "Aetherian Archive",
        questGiver: "Mighty Mordra",
        uespLink: "https://en.uesp.net/wiki/Online:The_Mage%27s_Tower",
        reward:
          "Mage's Ignorant Coffer (Normal Mode) or Mage's Knowledgeable Coffer (Veteran Mode)",
      },
      {
        value: "The Oldest Ghost",
        category: "Trials",
        optionalTitle: "Sanctum Ophidia",
        description: "Launch a direct assault on the Celestial Serpent.",
        repeatable: "weekly",
        location: "Sanctum Ophidia",
        questGiver: "Turuk Redclaws",
        uespLink: "https://en.uesp.net/wiki/Online:The_Oldest_Ghost",
        reward:
          "Serpent's Languid Coffer (Normal Mode) or Serpent's Coiled Coffer (Veteran Mode)",
      },
      {
        value: "The Return of Alkosh",
        category: "Trials",
        optionalTitle: "Sunspire",
        description:
          "Defeat the Alkosh pretender and liberate the faithful of Sunspire.",
        repeatable: "weekly",
        location: "Sunspire",
        questGiver: "Moon-Bishop Azin-jo",
        uespLink: "https://en.uesp.net/wiki/Online:The_Return_of_Alkosh",
        reward:
          "Dragon God's Time-Worn Hoard (Normal Mode) or Dragon God's Pristine Hoard (Veteran Mode)",
      },
      {
        value: "Reavers of the Reef",
        category: "Trials",
        optionalTitle: "Dreadsail Reef",
        description: "Drive the Dreadsail pirates from the Systres.",
        repeatable: "weekly",
        location: "Dreadsail Reef",
        questGiver: "Admiral Galvendier",
        uespLink: "https://en.uesp.net/wiki/Online:Reavers_of_the_Reef",
        reward:
          "Taleria's Sundry Treasure (Normal Mode) or Taleria's Glistening Treasure (Veteran Mode)",
      },
      {
        value: "Saints' Mercy",
        category: "Trials",
        optionalTitle: "Asylum Sanctorium",
        description: "End the Clockwork Saints torment in Asylum Sanctorium.",
        repeatable: "weekly",
        location: "Asylum Sanctorium",
        questGiver: "Alienist Llandras",
        uespLink: "https://en.uesp.net/wiki/Online:Saints%27_Mercy",
        reward: "Saint's Beatified Coffer",
      },
      {
        value: "Woe of the Welkynars",
        category: "Trials",
        optionalTitle: "Cloudrest",
        description: "Help Olorime take back Cloudrest.",
        repeatable: "weekly",
        location: "Cloudrest",
        questGiver: "Olorime",
        uespLink: "https://en.uesp.net/wiki/Online:Woe_of_the_Welkynars",
        reward:
          " 	Welkynar's Grounded Coffer (Normal Mode) or Welkynar's Soaring Coffer (Veteran Mode)",
      },
      {
        value: "The Black Gauntlet",
        category: "Arenas",
        optionalTitle: "Blackrose Prison",
        description:
          "Enter a deadly gauntlet held by the Blackguards of Blackrose Prison.",
        repeatable: "weekly",
        location: "Blackrose Prison",
        questGiver: "Erilthel",
        uespLink: "https://en.uesp.net/wiki/Online:The_Black_Gauntlet",
        reward: "Blackrose Weapon",
      },
      {
        value: "Maelstrom Arena",
        category: "Arenas",
        description: "Survive the Maelstrom Arena",
        repeatable: "immediately",
        location: "Maelstrom Arena",
        questGiver: "Fa-Nuit-Hen",
        uespLink: "https://en.uesp.net/wiki/Online:Maelstrom_Arena_(quest)",
        reward: "Maelstrom Weapon",
      },
      {
        value: "Veteran Maelstrom Arena",
        category: "Arenas",
        description: "Survive the Maelstrom Arena.",
        repeatable: "immediately",
        location: "Maelstrom Arena",
        questGiver: "Fa-Nuit-Hen",
        uespLink: "https://en.uesp.net/wiki/Online:Veteran_Maelstrom_Arena",
        reward: "Perfected Maelstrom Weapon",
      },

      {
        value: "Vateshran's Rites",
        category: "Arenas",
        optionalTitle: "Vateshran Hollows",
        description:
          "Enter Vateshran Hollows and survive the challenges within",
        repeatable: "immediately",
        location: "Vateshran Hollows",
        questGiver: "Rites Matron",
        uespLink: "https://en.uesp.net/wiki/Online:Vateshran%27s_Rites",
        reward: "Vateshran Weapon",
      },
      {
        value: "Veteran Vateshran's Rites",
        category: "Arenas",
        optionalTitle: "Veteran Vateshran Hollows",
        description:
          "Enter Vateshran Hollows and survive the challenges within.",
        repeatable: "immediately",
        location: "Vateshran Hollows",
        questGiver: "Rites Matron",
        uespLink: "https://en.uesp.net/wiki/Online:Veteran_Vateshran%27s_Rites",
        reward: "Perfected Vateshran Weapon",
      },
      {
        value: "Critical Mass",
        category: "Craglorn Quests",
        description: "Stabilize the Mage's staff before it explodes.",
        repeatable: "daily",
        location: "Spellscar",
        questGiver: "Sara Benele",
        uespLink: "https://en.uesp.net/wiki/Online:Critical_Mass",
        reward: "Yokudan Coffer of Merit",
      },
      {
        value: "The Fallen City of Shada",
        category: "Craglorn Quests",
        description: "Discover the secret of the cursed waters of Shada's Tear",
        repeatable: "daily",
        location: "Shada's Tear",
        questGiver: "Greban",
        uespLink: "https://en.uesp.net/wiki/Online:The_Fallen_City_of_Shada",
        reward: "Yokudan Coffer of Distinction",
      },
      {
        value: "The Reason We Fight",
        category: "Craglorn Quests",
        description: "Release an undead Nedic priest from his curse.",
        repeatable: "daily",
        location: "Shada's Tear",
        questGiver: "Nhalan",
        uespLink: "https://en.uesp.net/wiki/Online:The_Reason_We_Fight",
        reward: "Yokudan Coffer of Merit",
      },
      {
        value: "The Seeker's Archive",
        category: "Craglorn Quests",
        description: "Uncover the secret in the ancient library.",
        repeatable: "daily",
        location: "The Seeker's Archive",
        questGiver: "Ibrula",
        uespLink:
          "https://en.uesp.net/wiki/Online:The_Seeker%27s_Archive_(quest)",
        reward: "Yokudan Coffer of Merit",
      },
      {
        value: "Supreme Power",
        category: "Craglorn Quests",
        description: "Stop the mages from destroying Elinhir.",
        repeatable: "daily",
        location: "Elinhir",
        questGiver: "Fights-With-Tail",
        uespLink: "https://en.uesp.net/wiki/Online:Supreme_Power",
        reward: "Yokudan Coffer of Merit",
      },
      {
        value: "The Trials of Rahni'Za",
        category: "Craglorn Quests",
        description:
          "Discover what happened to the Sword-Disciples of Rahni'Za.",
        repeatable: "daily",
        location: "Rahni'Za, School of Warriors",
        questGiver: "Fada at-Glina",
        uespLink: "https://en.uesp.net/wiki/Online:The_Trials_of_Rahni%27Za",
        reward: "Yokudan Box",
      },
      {
        value: "Waters Run Foul",
        category: "Craglorn Quests",
        description:
          "Release the researchers from the Nereid Queen's influence.",
        repeatable: "daily",
        location: "Shada's Tear",
        questGiver: "Ralai",
        uespLink: "https://en.uesp.net/wiki/Online:Waters_Run_Foul",
        reward: "Yokudan Coffer of Merit",
      },
      {
        value: "Uncaged",
        category: "Craglorn Quests",
        description: "Seal an ancient laboratory filled with angry Celestials.",
        repeatable: "daily",
        location: "Skyreach Pinnacle",
        questGiver: "Mederic Vyger",
        uespLink: "https://en.uesp.net/wiki/Online:Uncaged",
        reward: "Yokudan Coffer of Merit",
      },
      {
        value: "The Truer Fangs",
        category: "Craglorn Quests",
        description:
          "Assassinate three Satakal worshippers who converted to the Scaled Court.",
        repeatable: "daily",
        location: "Dragonstar, Upper Craglorn",
        questGiver: "The Gray Passage",
        uespLink: "https://en.uesp.net/wiki/Online:The_Truer_Fangs",
        reward: "Nedic Coffer",
      },
      {
        value: "Taken Alive",
        category: "Craglorn Quests",
        description:
          "Find Scattered-Leaves' missing guards in the Valley of Scars.",
        repeatable: "daily",
        location: "Valley of Scars",
        questGiver: "Scattered-Leaves",
        uespLink: "https://en.uesp.net/wiki/Online:Taken_Alive",
        reward: "Yokudan Coffer of Humility",
      },
      {
        value: "Souls of the Betrayed",
        category: "Craglorn Quests",
        description: "",
        repeatable: "daily",
        location: "",
        questGiver: "",
        uespLink: "",
        reward: "",
      },
      {
        value: "Iron and Scales",
        category: "Craglorn Quests",
        description:
          "Avenge the Iron Orcs by striking back at the Scaled Court's minion.",
        repeatable: "daily",
        location: "Exarch's Stronghold, Valley of Scars",
        questGiver: "Lashburr Tooth-Breaker",
        uespLink: "https://en.uesp.net/wiki/Online:Iron_and_Scales",
        reward: "Yokudan Coffer of Merit",
      },
      {
        value: "The Blood of Nirn",
        category: "Craglorn Quests",
        description:
          "Prevent the Scaled Court from acquiring a large supply of nirncrux.",
        repeatable: "daily",
        location: "Skyreach Hold",
        questGiver: "Nendirume",
        uespLink: "https://en.uesp.net/wiki/Online:The_Blood_of_Nirn",
        reward: "Yokudan Coffer of Merit",
      },
      {
        value: "The Gray Passage",
        category: "Craglorn Quests",
        description: "Gain the Stars' favor by completing this pilgrimage.",
        repeatable: "daily",
        location: "Caravan Company Depot",
        questGiver: "The Gray Passage",
        uespLink: "https://en.uesp.net/wiki/Online:The_Gray_Passage",
        reward: "Yokudan Coffer of Distinction",
      },

      {
        value: "Daily Cyrodilic Collection Quest",
        category: "Cyrodilic Collections",
        description:
          "After completing the prologue for Murkmire, you will be able to assist Jee-Lar, a representative of the Cyrodilic Collections in preparing for expeditions into Black Marsh. You can do one quest per day.",
        repeatable: "daily",
        location: "Black Marsh",
        questGiver: "Jee-Lar",
        uespLink:
          "https://en.uesp.net/wiki/Online:Repeatable_Quests#Cyrodilic_Collections",
        reward: "Cyrodilic Collections Daily Contract Recompense",
      },

      {
        value: "Daily Northern Elsweyr Defense Force Quest",
        category: "Northern Elsweyr Defense Force",
        description:
          "After completing the prologue for Elsweyr, you will be able to assist Zahari, a representative of the Northern Elsweyr Defense Force in preparing their defense. You can do one quest per day.",
        repeatable: "daily",
        location: "Northern Elsweyr",
        questGiver: "Zahari",
        uespLink:
          "https://en.uesp.net/wiki/Online:Repeatable_Quests#Northern_Elsweyr_Defense_Force",
        reward: "Northern Elsweyr Defense Force Cache",
      },

      {
        value: "Dousing the Fires of Industry",
        category: "Imperial City Quests",
        description: "Halt Legion Zero's production of siege weaponry.",
        repeatable: "daily",
        location: "Elven Gardens District",
        questGiver: "Quintia Rullus",
        uespLink:
          "https://en.uesp.net/wiki/Online:Dousing_the_Fires_of_Industry",
        reward: "Siegemaster's Coffer",
      },
      {
        value: "Historical Accuracy",
        category: "Imperial City Quests",
        description: "Help an archivist preserve Imperial documents.",
        repeatable: "daily",
        location: "Arboretum",
        questGiver: "Loncano",
        uespLink: "https://en.uesp.net/wiki/Online:Historical_Accuracy",
        reward: "Siegemaster's Coffer",
      },
      {
        value: "The Lifeblood of an Empire",
        category: "Imperial City Quests",
        description: "Rescue Imperial citizens from the Daedra.",
        repeatable: "daily",
        location: "Arena District",
        questGiver: "Valga Atrius",
        uespLink: "https://en.uesp.net/wiki/Online:The_Lifeblood_of_an_Empire",
        reward: "Siegemaster's Coffer",
      },
      {
        value: "Priceless Treasures",
        category: "Imperial City Quests",
        description:
          "Place a ward on the Temple of the One's treasured artifacts.",
        repeatable: "daily",
        location: "Temple District",
        questGiver: "Sister J'Reeza",
        uespLink: "https://en.uesp.net/wiki/Online:Priceless_Treasures",
        reward: "Siegemaster's Coffer",
      },
      {
        value: "Speaking For The Dead",
        category: "Imperial City Quests",
        description:
          "Create an undead spy network to keep an eye on the Worm Cultists.",
        repeatable: "daily",
        location: "Memorial District",
        questGiver: "Legate Gallus",
        uespLink: "https://en.uesp.net/wiki/Online:Speaking_For_The_Dead",
        reward: "Siegemaster's Coffer",
      },
      {
        value: "Watch Your Step",
        category: "Imperial City Quests",
        description: "Set traps for ogrim in the Nobles District.",
        repeatable: "daily",
        location: "Nobles District",
        questGiver: "Brihana",
        uespLink: "https://en.uesp.net/wiki/Online:Watch_Your_Step",
        reward: "Siegemaster's Coffer",
      },
      {
        value: "Wrothgar Bounty",
        category: "Wrothgar Quests",
        description:
          "These are given by Arzorag in Skalar's Hostel and involve defeating World Bosses in Wrothgar. One can be obtained per day, however, you may group with other players to obtain the other five.",
        repeatable: "daily",
        location: "Wrothgar",
        questGiver: "Arzorag at Skalar's Hostel",
        uespLink: "https://en.uesp.net/wiki/Online:Repeatable_Quests#Bounty",
        reward: "Wrothgar Daily Contract Recompense",
      },
      {
        value: "Wrothgar Exploratory",
        category: "Wrothgar Quests",
        description: "Deal with the bandits in Watcher's Hold.",
        repeatable: "daily",
        location: "Wrothgar",
        questGiver: "Guruzug at Morkul Stronghold",
        uespLink:
          "https://en.uesp.net/wiki/Online:Repeatable_Quests#Exploratory",
        reward: "Wrothgar Daily Contract Recompense",
      },
      {
        value: "Guild Jobs",
        category: "Thieves Guild Quests",
        description:
          "These are given by the Tip Board in the Thieves Den and involve going to all base-game, non-starter, and non-PvP zones and involve thievery. They are repeatable immediately and cannot be shared with others.",
        repeatable: "immediately",
        location: "",
        questGiver: "Tip Board",
        uespLink:
          "https://en.uesp.net/wiki/Online:Repeatable_Quests#Guild_Jobs",
        reward: "Large Laundered Shipment",
      },
      {
        value: "Heists",
        category: "Thieves Guild Quests",
        description:
          "These quests will take you to instanced heist areas with the goal of obtaining stolen goods and can be completed solo or in a group. One can be obtained per day, however, you may group with other players to obtain the other four.",
        repeatable: "daily",
        location: "",
        questGiver: "Heist Board",
        uespLink: "https://en.uesp.net/wiki/Online:Repeatable_Quests#Heists",
        reward:
          "Satchel of Laundered Goods and Professional Thief's Satchel of Laundered Goods",
      },
      {
        value: "Thieves Guild Exploratory",
        category: "Thieves Guild Quests",
        description:
          "These are given by the Reacquisitions Board in the Thieves Den and involve exploring Delves in Hew's Bane. One can be obtained per day, however, you may group with other players to obtain the other three.",
        repeatable: "daily",
        location: "",
        questGiver: "Reacquisitions Board",
        uespLink:
          "https://en.uesp.net/wiki/Online:Repeatable_Quests#Exploratory_2",
        reward: "",
      },
      {
        value: "Dark Brotherhood Contracts",
        category: "Gold Coast Quests",
        description:
          "These are given by the Marked for Death ledger in the Dark Brotherhood Sanctuary and involve assassinating a target and involve going to all base-game, non-starter, and non-PvP zones to perform assassinations. The introductory quest Contract: Kvatch is excluded from this list since it can only be done once. They are repeatable immediately and cannot be shared with others.",
        repeatable: "immediately",
        location: "Dark Brotherhood Sanctuary",
        questGiver: "Marked for Death",
        uespLink:
          "https://en.uesp.net/wiki/Online:Repeatable_Quests#Dark_Brotherhood_Contracts",
        reward:
          "Dark Brotherhood Reward Pouch (for a single murder) orDark Brotherhood Reward Satchel (for a murder spree)",
      },
      {
        value: "Dark Brotherhood Sacraments",
        category: "Gold Coast Quests",
        description:
          "These are given by Speaker Terenus in the Dark Brotherhood Sanctuary and involve assassinating a target in an instanced area. One can be obtained per day and they cannot be shared.",
        repeatable: "daily",
        location: "Dark Brotherhood Sanctuary",
        questGiver: "Speaker Terenus",
        uespLink:
          "https://en.uesp.net/wiki/Online:Repeatable_Quests#Dark_Brotherhood_Sacraments",
        reward:
          "Unidentified Sithis' Touch Equipment or Unidentified Sithis' Touch Equipment (for completing all challenges)",
      },
      {
        value: "Gold Coast Bounties",
        category: "Gold Coast Quests",
        description:
          "These are given by the Bounty Board in Kvatch and involve defeating World Bosses in the Gold Coast. One can be obtained per day, however, you may group with other players to obtain the other one.",
        repeatable: "daily",
        location: "Gold Coast",
        questGiver: "Bounty Board",
        uespLink: "https://en.uesp.net/wiki/Online:Repeatable_Quests#Bounties",
        reward: "Gold Coast Daily Contract Recompense",
      },
      {
        value: "Gold Coast Exploratory",
        category: "Gold Coast Quests",
        description:
          "These are given by Bounty Board in Anvil and involve exploring Delves in the Gold Coast. One can be obtained per day, however, you may group with other players to obtain another one.",
        repeatable: "daily",
        location: "Gold Coast",
        questGiver: "Bounty Board",
        uespLink:
          "https://en.uesp.net/wiki/Online:Repeatable_Quests#Exploratory_3",
        reward: "Gold Coast Daily Contract Recompense",
      },
      {
        value: "Vvardenfell Bounty",
        category: "Vvardenfell Quests",
        description:
          "These are given by the Beleru Omoril in the Hall of Justice and involve defeating World Bosses in Vvardenfell. One can be obtained per day, however, you may group with other players to obtain the other five.",
        repeatable: "daily",
        location: "",
        questGiver: "",
        uespLink: "https://en.uesp.net/wiki/Online:Repeatable_Quests#Bounty_2",
        reward: "",
      },

      {
        value: "Vvardenfell Exploratory",
        category: "Vvardenfell Quests",
        description:
          "These are given by Traylan Omoril in the Hall of Justice and involve exploring Delves in Vvardenfell. One can be obtained per day, however, you may group with other players to obtain the other five.",
        repeatable: "daily",
        location: "",
        questGiver: "",
        uespLink:
          "https://en.uesp.net/wiki/Online:Repeatable_Quests#Exploratory_4",
        reward: "",
      },
      {
        value: "Vvardenfell Hunt",
        category: "Vvardenfell Quests",
        description:
          "These are given by Huntmaster Sorim-Nakar in Ald'ruhn and involve hunting a unique version of Vvardenfell's creatures (and returning with a trophy). One can be obtained per day, however, you may group with other players to obtain the other six.",
        repeatable: "daily",
        location: "",
        questGiver: "",
        uespLink: "https://en.uesp.net/wiki/Online:Repeatable_Quests#Hunt",
        reward: "",
      },
      {
        value: "Vvardenfell Relics",
        category: "Vvardenfell Quests",
        description:
          "These are given by Numani-Rasi in Ald'ruhn and involve going to a Daedric ruin and recovering its relics. One can be obtained per day, however, you may group with other players to obtain the other six.",
        repeatable: "daily",
        location: "",
        questGiver: "",
        uespLink: "https://en.uesp.net/wiki/Online:Repeatable_Quests#Relics",
        reward: "",
      },

      {
        value: "Clockwork City Bounty",
        category: "Clockwork City Quests",
        description:
          "These are given by the Clockwork Facilitator in the Brass Fortress and involve defeating World Bosses in the Clockwork City. One can be obtained per day, however, you may group with other players to obtain the other one.",
        repeatable: "daily",
        location: "",
        questGiver: "",
        uespLink: "https://en.uesp.net/wiki/Online:Repeatable_Quests#Bounty_3",
        reward: "",
      },
      {
        value: "Clockwork City Exploratory",
        category: "Clockwork City Quests",
        description:
          "These are given by Novice Holli in the Brass Fortress and involve exploring Delves in the Clockwork City. One can be obtained per day, however, you may group with other players to obtain the other five.",
        repeatable: "daily",
        location: "",
        questGiver: "",
        uespLink:
          "https://en.uesp.net/wiki/Online:Repeatable_Quests#Exploratory_5",
        reward: "",
      },
      {
        value: "Tarnished",
        category: "Clockwork City Quests",
        description:
          "These quests are given out by Razgurug in Slag Town and involve performing various tasks at gathering nodes throughout the Clockwork City. One can be obtained per day, however, you may group with other players to obtain the other five.",
        repeatable: "daily",
        location: "",
        questGiver: "",
        uespLink: "https://en.uesp.net/wiki/Online:Repeatable_Quests#Tarnished",
        reward: "",
      },
      {
        value: "Blackfeather Court",
        category: "Clockwork City Quests",
        description:
          "These quests are given out by the Bursar of Tributes in Slag Town and involve finding certain items to give to the Blackfeather Court",
        repeatable: "daily",
        location: "",
        questGiver: "",
        uespLink:
          "https://en.uesp.net/wiki/Online:Repeatable_Quests#Blackfeather_Court",
        reward: "",
      },
      {
        value: "Summerset Bounty",
        category: "Summerset Quests",
        description:
          "These are given by Justiciar Farowel at Rinmawen's Plaza and involve defeating World Bosses in Summerset. One can be obtained per day, however, you may group with other players to obtain the other five.",
        repeatable: "daily",
        location: "",
        questGiver: "",
        uespLink: "https://en.uesp.net/wiki/Online:Repeatable_Quests#Bounty_4",
        reward: "",
      },
      {
        value: "Summerset Exploratory",
        category: "Summerset Quests",
        description:
          "These are given by Justiciar Tanorian at Rinmawen's Plaza and involve exploring Delves in Summerset. One can be obtained per day, however, you may group with other players to obtain the other five",
        repeatable: "daily",
        location: "",
        questGiver: "",
        uespLink:
          "https://en.uesp.net/wiki/Online:Repeatable_Quests#Exploratory_6",
        reward: "",
      },

      {
        value: "Abyssal Geyser",
        category: "Summerset Quests",
        description:
          "These are given by Battlereeve Tanerline at the Plaza of the Hand and involve completing Summerset's Abyssal Geysers. Only one can be completed per day, and they cannot be shared with others.",
        repeatable: "daily",
        location: "",
        questGiver: "",
        uespLink:
          "https://en.uesp.net/wiki/Online:Repeatable_Quests#Abyssal_Geysers",
        reward: "",
      },

      {
        value: "Murkmire Bounty",
        category: "Murkmire Quests",
        description:
          "These are given by Bolu in Lilmoth and involve defeating World Bosses in Murkmire. One can be obtained per day, however, you may group with other players to obtain the other five.",
        repeatable: "daily",
        location: "",
        questGiver: "",
        uespLink: "https://en.uesp.net/wiki/Online:Repeatable_Quests#Bounty_5",
        reward: "",
      },
      {
        value: "Murkmire Exploratory",
        category: "Murkmire Quests",
        description:
          "These are given by Varo Hosidias in Lilmoth and involve exploring Murkmire's Delves in Murkmire. One can be obtained per day, however, you may group with other players to obtain the other five.",
        repeatable: "daily",
        location: "",
        questGiver: "",
        uespLink:
          "https://en.uesp.net/wiki/Online:Repeatable_Quests#Exploratory_7",
        reward: "",
      },
      {
        value: "Root-Whisper",
        category: "Murkmire Quests",
        description:
          "These are given by Tuwul in Root-Whisper Village and require completion of By River and Root. They involve completing a variety of tasks in the delves and overland in Murkmire. One can be obtained per day, however, you may group with other players to obtain the other five.",
        repeatable: "daily",
        location: "",
        questGiver: "",
        uespLink:
          "https://en.uesp.net/wiki/Online:Repeatable_Quests#Root-Whisper",
        reward: "",
      },
      {
        value: "Elsweyr Bounty",
        category: "Elsweyr Quests",
        description:
          "These are given by Ri'hirr at the Job Brokers' tent in Rimmen and involve defeating World Bosses in Northern Elsweyr. One can be obtained per day, however, you may group with other players to obtain the other five.",
        repeatable: "daily",
        location: "",
        questGiver: "",
        uespLink: "https://en.uesp.net/wiki/Online:Repeatable_Quests#Bounty_6",
        reward: "",
      },
      {
        value: "Elsweyr Exploratory",
        category: "Elsweyr Quests",
        description:
          "These are given by Nisuzi at the Job Brokers' tent in Rimmen and involve exploring Delves in Northern Elsweyr. One can be obtained per day, however, you may group with other players to obtain the other five.",
        repeatable: "daily",
        location: "",
        questGiver: "",
        uespLink:
          "https://en.uesp.net/wiki/Online:Repeatable_Quests#Exploratory_8",
        reward: "",
      },
      {
        value: "Dragon World Events",
        category: "Elsweyr Quests",
        description:
          "These are given by Battlereeve Tanerline and involve Dragon World Events. Only one for this zone can be completed per day, however, you may group with other players to get a repeat of this quest.",
        repeatable: "daily",
        location: "",
        questGiver: "",
        uespLink:
          "https://en.uesp.net/wiki/Online:Repeatable_Quests#Dragon_World_Events",
        reward: "",
      },
      {
        value: "Dragonhold Bounty",
        category: "Dragonhold Quests",
        description:
          "These are given by Bruccius Baenius at the Merchant Square in Senchal and involve defeating World Bosses in Southern Elsweyr. One can be obtained per day, however, you may group with other players to obtain the other five.",
        repeatable: "daily",
        location: "",
        questGiver: "",
        uespLink: "https://en.uesp.net/wiki/Online:Repeatable_Quests#Bounty_7",
        reward: "",
      },
      {
        value: "Dragonhold Exploratory",
        category: "Dragonhold Quests",
        description:
          "These are given by Guybert Flaubert at the Merchant Square in Senchal and involve exploring Delves in Southern Elsweyr. One can be obtained per day, however, you may group with other players to obtain the other five.",
        repeatable: "daily",
        location: "",
        questGiver: "",
        uespLink:
          "https://en.uesp.net/wiki/Online:Repeatable_Quests#Exploratory_9",
        reward: "",
      },
      {
        value: "Dragon Hunts",
        category: "Dragonhold Quests",
        description:
          "These are given by Chizbari the Chipper at the Dragonguard Sanctum and involve Dragon World Events. Only one for this zone can be completed per day, however, you may group with other players to get a repeat of this quest.",
        repeatable: "daily",
        location: "",
        questGiver: "",
        uespLink:
          "https://en.uesp.net/wiki/Online:Repeatable_Quests#Dragon_Hunts",
        reward: "",
      },
      {
        value: "New Moon",
        category: "Dragonhold Quests",
        description:
          "These are given by Dirge Truptor at the Dragonguard Sanctum and involve fighting against the New Moon at various locations throughout Tamriel. One can be obtained per day, however, you may group with other players to obtain the other five.",
        repeatable: "daily",
        location: "",
        questGiver: "",
        uespLink: "https://en.uesp.net/wiki/Online:Repeatable_Quests#New_Moon",
        reward: "",
      },
      {
        value: "Western Skyrim Bounty",
        category: "Western Skyrim Quests",
        description:
          "These are given by Hidaver in Solitude and involve defeating World Bosses in Western Skyrim or Blackreach. One can be obtained per day, however, you may group with other players to obtain the other one.",
        repeatable: "daily",
        location: "",
        questGiver: "",
        uespLink: "https://en.uesp.net/wiki/Online:Repeatable_Quests#Bounty_8",
        reward: "",
      },
      {
        value: "Western Skyrim Exploratory",
        category: "Western Skyrim Quests",
        description:
          "These are given by Tinzen in Solitude and involve exploring Delves in Western Skyrim or Blackreach.One can be obtained per day, however, you may group with other players to obtain the other one.",
        repeatable: "daily",
        location: "",
        questGiver: "",
        uespLink:
          "https://en.uesp.net/wiki/Online:Repeatable_Quests#Exploratory_10",
        reward: "",
      },
      {
        value: "Western Skyrim Harrowstorms",
        category: "Western Skyrim Quests",
        description:
          "These are given by Swordthane Jylta in Solitude and involve defeating Harrowstorms in Western Skyrim or Blackreach. Only one for this zone can be completed per day, however, you may group with other players to get a repeat of this quest.",
        repeatable: "daily",
        location: "",
        questGiver: "",
        uespLink:
          "https://en.uesp.net/wiki/Online:Repeatable_Quests#Harrowstorms",
        reward: "",
      },
      {
        value: "The Reach Bounty",
        category: "The Reach Quests",
        description:
          "These are given by Gwenyfe in Markarth and involve defeating World Bosses in The Reach or Blackreach. One can be obtained per day, however, you may group with other players to obtain the other five",
        repeatable: "daily",
        location: "",
        questGiver: "",
        uespLink: "https://en.uesp.net/wiki/Online:Repeatable_Quests#Bounty_9",
        reward: "",
      },
      {
        value: "The Reach Exploratory",
        category: "The Reach Quests",
        description:
          "These are given by Bralthahawn in Markarth and involve exploring Delves in The Reach or Blackreach. One can be obtained per day, however, you may group with other players to obtain the other five.",
        repeatable: "daily",
        location: "",
        questGiver: "",
        uespLink:
          "https://en.uesp.net/wiki/Online:Repeatable_Quests#Exploratory_11",
        reward: "",
      },
      {
        value: "The Reach Harrowstorms",
        category: "The Reach Quests",
        description:
          "These are given by Nelldena in Markarth and involve defeating Harrowstorms in The Reach or Blackreach. Only one for this zone can be completed per day, however, you may group with other players to get a repeat of this quest.",
        repeatable: "daily",
        location: "",
        questGiver: "",
        uespLink:
          "https://en.uesp.net/wiki/Online:Repeatable_Quests#Harrowstorms_2",
        reward: "",
      },
      {
        value: "Wayward Guardian",
        category: "The Reach Quests",
        description:
          "These are given by Ardanir in Markarth and involve assorted quest locations all across The Reach or Blackreach. One can be obtained per day, however, you may group with other players to obtain the other six.",
        repeatable: "daily",
        location: "",
        questGiver: "",
        uespLink:
          "https://en.uesp.net/wiki/Online:Repeatable_Quests#Wayward_Guardian",
        reward: "",
      },
      {
        value: "Blackwood Bounty",
        category: "Blackwood Quests",
        description:
          "These are given by Britta Silanus in Leyawiin and involve defeating World Bosses in Blackwood. One can be obtained per day, however, you may group with other players to obtain the other five.",
        repeatable: "daily",
        location: "",
        questGiver: "",
        uespLink: "https://en.uesp.net/wiki/Online:Repeatable_Quests#Bounty_10",
        reward: "",
      },
      {
        value: "Blackwood Exploratory",
        category: "Blackwood Quests",
        description:
          "These are given by Deetum-Jas in Leyawiin and involve exploring Delves in Blackwood. One can be obtained per day, however, you may group with other players to obtain the other five.",
        repeatable: "daily",
        location: "",
        questGiver: "",
        uespLink:
          "https://en.uesp.net/wiki/Online:Repeatable_Quests#Exploratory_12",
        reward: "",
      },
      {
        value: "Deadlands Bounty",
        category: "Deadlands Quests",
        description:
          "These are given by Vaveli Indavel in Fargrave and involve defeating World Bosses in the Deadlands. One can be obtained per day, however, you may group with other players to obtain the other five.",
        repeatable: "daily",
        location: "",
        questGiver: "",
        uespLink: "https://en.uesp.net/wiki/Online:Repeatable_Quests#Bounty_11",
        reward: "",
      },
      {
        value: "Deadlands Exploratory",
        category: "Deadlands Quests",
        description:
          "These are given by Luna Beriel in Fargrave and involve exploring Delves in the Deadlands and Fargrave. One can be obtained per day, however, you may group with other players to obtain the other five.",
        repeatable: "daily",
        location: "",
        questGiver: "",
        uespLink:
          "https://en.uesp.net/wiki/Online:Repeatable_Quests#Exploratory_13",
        reward: "",
      },
      {
        value: "High Isle Bounty",
        category: "High Isle Quests",
        description:
          "These are given by Parisse Plouff in Gonfalon Bay and involve defeating World Bosses in High Isle. One can be obtained per day, however, you may group with other players to obtain the other five.",
        repeatable: "daily",
        location: "",
        questGiver: "",
        uespLink: "https://en.uesp.net/wiki/Online:Repeatable_Quests#Bounty_12",
        reward: "",
      },
      {
        value: "High Isle Exploratory",
        category: "High Isle Quests",
        description:
          "These are given by Wayllod in Gonfalon Bay and involve exploring Delves in High Isle. One can be obtained per day, however, you may group with other players to obtain the other five.",
        repeatable: "daily",
        location: "",
        questGiver: "",
        uespLink:
          "https://en.uesp.net/wiki/Online:Repeatable_Quests#Exploratory_14",
        reward: "",
      },
      {
        value: "High Isle Volcanic Vents",
        category: "High Isle Quests",
        description:
          "There are two with the same name offered by Druid Peeska in Gonfalon Bay and involve completing High Isle's Volcanic Vents. Only one for this zone can be completed per day, however, you may group with other players to get a repeat of this quest.",
        repeatable: "daily",
        location: "",
        questGiver: "",
        uespLink:
          "https://en.uesp.net/wiki/Online:Repeatable_Quests#Volcanic_Vents",
        reward: "",
      },
      {
        value: "Cards Across the Continent",
        category: "Tales of Tribute",
        description:
          "These are given by Kishka the Broker in Gonfalon Gaming Hall and involve defeating other NPCs in Tales of Tribute. Only one can be completed per day, and they cannot be shared with others.",
        repeatable: "daily",
        location: "",
        questGiver: "",
        uespLink: "https://en.uesp.net/wiki/Online:Cards_Across_the_Continent",
        reward: "",
      },
      {
        value: "Dueling Tributes",
        category: "Tales of Tribute",
        description:
          "These are given by Kishka the Broker in Gonfalon Gaming Hall and involve defeating other NPCs in Tales of Tribute. Only one can be completed per day, and they cannot be shared with others.",
        repeatable: "daily",
        location: "",
        questGiver: "",
        uespLink: "https://en.uesp.net/wiki/Online:Dueling_Tributes",
        reward: "",
      },
      {
        value: "Galen Bounty",
        category: "Galen Quests",
        description:
          "These are given by Druid Gastoc in Vastyr and involve defeating World Bosses in Galen. One can be obtained per day, however, you may group with other players to obtain the other five.",
        repeatable: "daily",
        location: "",
        questGiver: "",
        uespLink: "https://en.uesp.net/wiki/Online:Repeatable_Quests#Bounty_13",
        reward: "",
      },
      {
        value: "Galen Exploratory",
        category: "Galen Quests",
        description:
          "These are given by Juline Courcelles in Vastyr and involve exploring Delves in Galen. One can be obtained per day, however, you may group with other players to obtain the other five.",
        repeatable: "daily",
        location: "",
        questGiver: "",
        uespLink:
          "https://en.uesp.net/wiki/Online:Repeatable_Quests#Exploratory_15",
        reward: "",
      },
      {
        value: "Galen Volcanic Vents",
        category: "Galen Quests",
        description:
          "These are given by Druid Aishabeh in Vastyr and involve completing Galen's Volcanic Vents. Only one for this zone can be completed per day, however, you may group with other players to get a repeat of this quest.",
        repeatable: "daily",
        location: "",
        questGiver: "",
        uespLink:
          "https://en.uesp.net/wiki/Online:Repeatable_Quests#Volcanic_Vents_2",
        reward: "",
      },
      {
        value: "Bruma",
        category: "Cyrodiil Settlement Quests",
        description: "These are offered by Grigerda and Hjorik.",
        repeatable: "daily",
        location: "",
        questGiver: "",
        uespLink: "https://en.uesp.net/wiki/Online:Repeatable_Quests#Bruma",
        reward: "",
      },
      {
        value: "Cheydinhal",
        category: "Cyrodiil Settlement Quests",
        description: "These are offered by Sylvian Herius and Vyctoria Girien.",
        repeatable: "daily",
        location: "",
        questGiver: "",
        uespLink:
          "https://en.uesp.net/wiki/Online:Repeatable_Quests#Cheydinhal",
        reward: "",
      },
      {
        value: "Chorrol and Wynon Priory",
        category: "Cyrodiil Settlement Quests",
        description: "These are offered by Lliae the Quick and Mael.",
        repeatable: "daily",
        location: "",
        questGiver: "",
        uespLink:
          "https://en.uesp.net/wiki/Online:Repeatable_Quests#Chorrol_and_Weynon_Priory",
        reward: "",
      },
      {
        value: "Cropsford",
        category: "Cyrodiil Settlement Quests",
        description:
          "These are offered by Prefect Antias and Ufgra gra-Gum. Although the quest Goblin's Delight is also needed for the Cropsford Adventurer achievement, it is not repeatable.",
        repeatable: "daily",
        location: "",
        questGiver: "",
        uespLink: "https://en.uesp.net/wiki/Online:Repeatable_Quests#Cropsford",
        reward: "",
      },
      {
        value: "Vlastarus",
        category: "Cyrodiil Settlement Quests",
        description: "These are offered by Nelerien and Jurana.",
        repeatable: "daily",
        location: "",
        questGiver: "",
        uespLink: "https://en.uesp.net/wiki/Online:Repeatable_Quests#Vlastarus",
        reward: "",
      },
      {
        value: "Fighters Guild Bounty from skill line",
        category: "Fighters Guild Bounty Quests",
        description:
          "These quests are available at your Alliance's Border Keeps once you've unlocked the Bounty Hunter passive skill in the Fighters Guild skill line. One can be completed per day, and they cannot be shared with others.",
        repeatable: "daily",
        location: "",
        questGiver: "",
        uespLink:
          "https://en.uesp.net/wiki/Online:Repeatable_Quests#Fighters_Guild_Bounty_Quests",
        reward: "",
      },
      {
        value: "Battle Missions",
        category: "PvP Quests",
        description:
          "These are given by the Battle Mission Board in either the Eastern Elsweyr Gate for Dominion players, the Southern High Rock Gate for Covenant players, or the Northern Morrowind Gate for Pact players.",
        repeatable: "daily",
        location: "",
        questGiver: "",
        uespLink:
          "https://en.uesp.net/wiki/Online:Repeatable_Quests#Battle_Missions",
        reward: "",
      },
      {
        value: "Bounty Missions",
        category: "PvP Quests",
        description:
          "These are given by the Bounty Mission Board in either the Eastern Elsweyr Gate for Dominion players, the Southern High Rock Gate for Covenant players, or the Northern Morrowind Gate for Pact players.",
        repeatable: "daily",
        location: "",
        questGiver: "",
        uespLink:
          "https://en.uesp.net/wiki/Online:Repeatable_Quests#Bounty_Missions",
        reward: "",
      },
      {
        value: "Conquest Missions",
        category: "PvP Quests",
        description:
          "These are given by the Conquest Missions Board in either the Eastern Elsweyr Gate for Dominion players, the Southern High Rock Gate for Covenant players, or the Northern Morrowind Gate for Pact players.",
        repeatable: "daily",
        location: "",
        questGiver: "",
        uespLink:
          "https://en.uesp.net/wiki/Online:Repeatable_Quests#Conquest_Missions",
        reward: "",
      },
      {
        value: "Scouting Missions",
        category: "PvP Quests",
        description:
          "These are given by the Scouting Missions Board in either the Eastern Elsweyr Gate for Dominion players, the Southern High Rock Gate for Covenant players, or the Northern Morrowind Gate for Pact players.",
        repeatable: "daily",
        location: "",
        questGiver: "",
        uespLink:
          "https://en.uesp.net/wiki/Online:Repeatable_Quests#Scouting_Missions",
        reward: "",
      },
      {
        value: "Warfront Missions",
        category: "PvP Quests",
        description:
          "These are given by the Warfront Missions Board in either the Eastern Elsweyr Gate for Dominion players, the Southern High Rock Gate for Covenant players, or the Northern Morrowind Gate for Pact players.",
        repeatable: "daily",
        location: "",
        questGiver: "",
        uespLink:
          "https://en.uesp.net/wiki/Online:Repeatable_Quests#Warfront_Missions",
        reward: "",
      },
      {
        value: "Elder Scrolls Missions",
        category: "PvP Quests",
        description:
          "These are given by Grand Warlord Sorcalin in the Eastern Elsweyr Gate for Dominion players, Grand Warlord Dortene in the Southern High Rock Gate for Covenant players, or Grand Warlord Zimmeron in the Northern Morrowind Gate for Pact players.",
        repeatable: "daily",
        location:
          "These are given by Battlemaster Rivyn, who can be found at any of the Gladiator's Quarters in Alinor, Daggerfall, Davon's Watch, Gonfalon Bay, Leyawiin, Rimmen, Solitude, Vivec City, or Vulkhel Guard, or at any of the three Battlegrounds found on Vvardenfell.",
        questGiver: "",
        uespLink:
          "https://en.uesp.net/wiki/Online:Repeatable_Quests#Elder_Scrolls_Missions",
        reward: "",
      },
      {
        value: "Battlegrounds Missions",
        category: "PvP Quests",
        description:
          "These are given by Battlemaster Rivyn, who can be found at any of the Gladiator's Quarters in Alinor, Daggerfall, Davon's Watch, Gonfalon Bay, Leyawiin, Rimmen, Solitude, Vivec City, or Vulkhel Guard, or at any of the three Battlegrounds found on Vvardenfell.",
        repeatable: "daily",
        location: "",
        questGiver: "",
        uespLink:
          "https://en.uesp.net/wiki/Online:Repeatable_Quests#Battlegrounds_Missions",
        reward: "",
      },
      {
        value: "New Life Festival",
        category: "Event Quests",
        description:
          "These quests are given by Breda south of Windhelm after you've completed the introductory quest. They can all be completed daily.",
        repeatable: "daily",
        location: "",
        questGiver: "",
        uespLink: "",
        reward: "",
      },
      {
        value: "Jester's Festival",
        category: "Event Quests",
        description:
          "These quests are available during the Jester's Festival once you've completed the introductory quest. One quest is available from each of the three jesters: Jester King Emeric northeast of Daggerfall, Jester King Jorunn south of Ebonheart, and Jester Queen Ayrenn north of Vulkhel Guard. They can all be completed daily.",
        repeatable: "daily",
        location: "",
        questGiver: "",
        uespLink: "",
        reward: "",
      },
      {
        value: "Whitestrakes's Mayhem",
        category: "Event Quests",
        description:
          "These quests are given when speaking to Predicant Maera in Cyrodiil at any gate garrison or at the Battlegrounds camps. It can be completed once per event.",
        repeatable: "daily",
        location: "",
        questGiver: "",
        uespLink: "",
        reward: "",
      },
      {
        value: "Witches Festival",
        category: "Event Quests",
        description:
          "These quests are given using a Crow Caller or speaking to Witchmother Taerma in Olyve's Brewery. They can be completed daily.",
        repeatable: "daily",
        location: "",
        questGiver: "",
        uespLink: "",
        reward: "",
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect;
  });
