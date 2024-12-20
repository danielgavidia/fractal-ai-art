import express from "express";
import { verifyFirebaseToken } from "./middleware";
import { getUserLogin, getUserSignup } from "./prisma/prismaAuth";
import {
  deleteArtwork,
  getArtworks,
  getArtworksUser,
  getArtworkUser,
  getUser,
  getUsers,
  postArtwork,
  postLike,
} from "./prisma/prismaFunctions";

// Types
import type { Artwork, Like } from "./types/types";
import type { User } from "@prisma/client";

// Setup
const app = express();
const port = process.env.BACKEND_PORT;
const cors = require("cors");

app.use(
  cors({
    // origin: process.env.FRONTEND_URL, // Allow your frontend origins
    // origin: "*", // Allow your frontend origins
    // origin: ["https://www.bouncy-art.com", "https://bouncy-art.com"],
    origin: [process.env.FRONTEND_URL_1, process.env.FRONTEND_URL_2],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());

app.options("*", cors()); // Preflight for all routes

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`CORS: ${process.env.FRONTEND_URL}`);
});

// Routes

// Get user info
app.post("/api/user/info", verifyFirebaseToken, async (req, res) => {
  console.log("POST: /api/user/info");
  const { userId } = req.body;
  const data: User = await getUser({ userId: userId });
  console.log(data);
  res.status(200).json({ data: data });
});

// Get user info (all users)
app.post("/api/user/info/all", verifyFirebaseToken, async (req, res) => {
  console.log("POST: /api/user/info/all");
  const data: User[] = await getUsers();
  console.log(data);
  res.status(200).json({ data: data });
});

// Get user info (current)
app.post("/api/user/info/current", verifyFirebaseToken, async (req, res) => {
  console.log("POST: /api/user/info/current");
  const { firebaseId } = req.body;
  const data: User = await getUser({ firebaseId: firebaseId });
  console.log(data);
  res.status(200).json({ data: data });
});

// Get artworks array (all)
app.get("/api/artwork/all", async (req, res) => {
  console.log("GET: /api/artwork/all");
  const data: Artwork[] = await getArtworks();
  console.log(data);
  res.status(200).json({ data: data });
});

// Get artworks for a single user
app.post("/api/artwork/user", verifyFirebaseToken, async (req, res) => {
  console.log(`POST: /api/artwork/user`);
  const { userId } = req.body;
  const data: Artwork[] = await getArtworksUser(userId);
  console.log(data);
  res.status(200).json({ data: data });
});

// Get single artwork for a single user
app.post("/api/artwork/user/single", verifyFirebaseToken, async (req, res) => {
  console.log(`POST: /api/artwork/user/single`);
  const { artworkId } = req.body;
  const data: Artwork = await getArtworkUser(artworkId);
  console.log(data);
  res.status(200).json({ data: data });
});

// Post to artwork array
app.post("/api/artwork", verifyFirebaseToken, async (req, res) => {
  console.log("POST: /api/artwork");
  const firebaseId = req.body.firebaseId;
  const {
    xVelocity,
    yVelocity,
    ballSize,
    ballColor,
    backgroundColor,
    ballCount,
    randomnessFactor,
    randomColors,
    borderRadius,
    borderWidth,
    borderColor,
    artworkId,
  } = req.body;
  const data: Artwork = await postArtwork(
    firebaseId,
    xVelocity,
    yVelocity,
    ballSize,
    ballColor,
    backgroundColor,
    ballCount,
    randomnessFactor,
    randomColors,
    borderRadius,
    borderWidth,
    borderColor,
    artworkId
  );
  console.log(data);
  res.status(200).json({ data: data });
});

// Delete artwork
app.post("/api/artwork/delete", verifyFirebaseToken, async (req, res) => {
  console.log("POST: /api/artwork/delete");
  const { artworkId } = req.body;
  const data: Artwork = await deleteArtwork(artworkId);
  console.log(data);
  res.status(200).json({ data: data });
});

// Create like
app.post("/api/artwork/like/add", verifyFirebaseToken, async (req, res) => {
  console.log("POST: /api/artwork/like/add");
  const firebaseId = req.body.firebaseId;
  const { artworkId } = req.body;
  const data: Like = await postLike(firebaseId, artworkId);
  console.log(data);
  res.status(200).json({ data: data });
});

// ---
// Auth

// Base auth
app.post("/authenticate", verifyFirebaseToken, (req, res) => {
  const firebaseId = req.body.firebaseId;
  res.status(200).json({ firebaseId: firebaseId });
});

// Login
app.post("/user/login", verifyFirebaseToken, async (req, res) => {
  console.log("POST: /user/login");
  const { firebaseId } = req.body;
  const user: User = await getUserLogin(firebaseId);
  console.log(user);
  res.status(200).json({ user: user });
});

// Signup
app.post("/user/signup", verifyFirebaseToken, async (req, res) => {
  console.log("POST: /user/signup");
  const { firebaseId, email, username } = req.body;
  const user: User = await getUserSignup(firebaseId, email, username);
  console.log(user);
  res.status(200).json({ user: user });
});
