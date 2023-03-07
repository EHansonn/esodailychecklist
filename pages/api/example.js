export default function handler(req, res) {
  const { APP_KEY } = process.env;
  const { ACTION_KEY } = req.headers.authorization.split(" ")[1];

  try {
    if (ACTION_KEY === APP_KEY) {
      // Process the POST request
      console.log("Happeneeddd1231231023921312");
      res.status(200).json({ success: "true" });
    } else {
      res.status(401);
    }
  } catch (err) {
    res.status(500);
  }
}
