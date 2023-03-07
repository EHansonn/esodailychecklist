export default async function handler(req, res) {
  const { APP_KEY } = process.env;
  const { ACTION_KEY } = req.headers.authorization.split(" ")[1];

  try {
    if (ACTION_KEY === APP_KEY) {
      // Process the POST request
      const deleteDaily = await prisma.questsOnUser.deleteMany({
        where: {
          quest: {
            repeatable: {contains: 'daily',}
            
          },
        },
      })

      console.log("Happeneeddd1231231023921312");
      res.status(200).json({ success: "true" });
    } else {
      console.log("whoooooooooooooooops")
      res.status(401);
      throw new Error("yikes")
    }
  } catch (err) {
    res.status(500);
  }
}
