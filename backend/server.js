import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import bodyParser from "body-parser";
import Redis from "ioredis";
import { generateRandomCards } from "./utils/index.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const redis = new Redis();

app.use(bodyParser.json());
app.use(cors());

//leaderboard
const getLatestLeaderboard = async () => {
  const leaderboard = await redis.zrevrange("leaderboard", 0, -1, "WITHSCORES");
  const formattedLeaderboard = [];
  for (let i = 0; i < leaderboard.length; i += 2) {
    const userName = leaderboard[i];
    const userScore = parseInt(leaderboard[i + 1]);
    formattedLeaderboard.push({ userName, userScore });
  }
  return formattedLeaderboard;
};


io.on("connection", (socket) => {
  console.log("WebSocket connected");
  socket.on("disconnect", () => {
    console.log("WebSocket disconnected");
  }); // WebSocket
});

app.get("/game", async (req, res) => {
    try {
      const { userName } = req.query;
      let isMember = await redis.exists(userName);

      if (!isMember && userName) {
        const rCards = generateRandomCards();
        await redis.hmset(userName, "score", 0, "gameCards", JSON.stringify(rCards), "hasDefuseCard", "false", "activeCard", null);
        redis.zadd("leaderboard", 0, userName);
      }

      let game = await redis.hgetall(userName);
      const leaderboardLatest = await getLatestLeaderboard();

      io.emit("leaderboardUpdate", leaderboardLatest);

      res.status(200).send({
        ...game,
        gameCards: JSON.parse(game.gameCards || "[]"),
      });
    } catch (e) {
      console.error(e);
      res.status(500).send("Error in data fetching");
    }
  });

app.put("/game", async (req, res) => {
    try {
      const { userName, hasDefuseCard, activeCard, score: reqScore, gameCards: reqGameCards } = req.body;
  
      const score = reqScore || 0;
      const gameCards = reqGameCards || generateRandomCards();
  
      await redis.hmset(userName, "gameCards", JSON.stringify(gameCards), "hasDefuseCard", hasDefuseCard, "activeCard", activeCard, "score", score);
      redis.zadd("leaderboard", score, userName);
  
      const leaderboardLatest = await getLatestLeaderboard();
      io.emit("leaderboardUpdate", leaderboardLatest);
      
      res.status(200).send({ userName, gameCards, hasDefuseCard, activeCard, score });
    } catch (e) {
      console.error(e);
      res.status(500).send("Failed to update data");
    }
  }); // update

app.delete("/game", async (req, res) => {
    try {
      const { userName } = req.body;
      await redis.del(userName);
      const score = await redis.hget(userName, "score");
      redis.zadd("leaderboard", score, userName);

      const leaderboardLatest = await getLatestLeaderboard();
      io.emit("leaderboardUpdate", leaderboardLatest);

      res.status(200).send("Reset successful");

    } catch (e) {
      console.error(e);
      res.status(500).send("Failed to reset data");
    }
  }); // reset

server.listen(3000, () => {
  console.log("Server is running on port 3000");
}); // listening
