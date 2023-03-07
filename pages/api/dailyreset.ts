import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "../../lib/prisma";
export default async function handler(req:NextApiRequest, res:NextApiResponse) {

  const { APP_KEY } = process.env;
  
  const  ACTION_KEY  = req?.headers?.authorization
  //console.log(ACTION_KEY)
  try {
    if (ACTION_KEY === APP_KEY) {
      // Process the POST request
      console.log("made it in equals")
      const post =await prisma.questsOnUser.deleteMany({
        where: { quest: {
          repeatable: "daily"
        } },
      });
      console.log(post)
      res.status(200).json({ success: 'true' })
    } else {
      res.status(401)
      res.end()
    }
  } catch(err) {
    res.status(500)
    res.end()
  }
}