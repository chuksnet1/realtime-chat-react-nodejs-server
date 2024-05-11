const express = require("express");
const cors = require("cors");
const { default: axios } = require("axios");
require("dotenv").config();


const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

app.post("/authenticate", async (req, res) => {
    //we get a username from req.body which is from htm in client side
  const { username } = req.body;
  const API = process.env.API_KEY
console.log(API)
  try {
    //we get or create a user if it exist if not we create one
    const r = await axios.put(
        'https://api.chatengine.io/users/',
        {'username':username, 'secret':username, 'firstname':username},
        {headers: {"private-key": API}}
    )
    return res.status(r.status).json(r.data)
  } catch (error) {
    return res.status(error.response.status).json(error.response.data)
  }
  
  //return res.json({ username: username, secret: "sha256..." });
});

app.listen(3001);