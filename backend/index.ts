import express from "express";
import { verifyFirebaseToken } from "./middleware";
import { getUserLogin, getUserSignup } from "./prisma/prismaAuth";
import { getArtworks, getArtworksUser, postArtwork, postLike } from "./prisma/prismaFunctions";

// Types
import type { Artwork, Like } from "./types/types";
import type { User } from "@prisma/client";

// Setup
const app = express();
const port = process.env.BACKEND_PORT;
const cors = require("cors");

app.use(
	cors({
		origin: process.env.FRONTEND_URL,
		methods: ["GET", "POST"],
	})
);
app.use(express.json());

app.get("/", (req, res) => {
	res.send("Hello World!");
});
app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});

// Routes

// Get artworks array (all)
app.get("/api/artwork/all", async (req, res) => {
	console.log("GET: /api/artwork/all");
	const data: Artwork[] = await getArtworks();
	console.log(data);
	res.status(200).json({ data: data });
});

// Get artworks for a single user
app.get("/api/artwork/user", verifyFirebaseToken, async (req, res) => {
	console.log(`GET: /api/artwork/user`);
	const firebaseId = req.body.firebaseId;
	const data: Artwork[] = await getArtworksUser(firebaseId);
	console.log(data);
	res.status(200).json({ data: data });
});

// Post to artwork array
app.post("/api/artwork", verifyFirebaseToken, async (req, res) => {
	console.log("POST: /api/artwork");
	const firebaseId = req.body.firebaseId;
	const { xVelocity, yVelocity } = req.body;
	const data: Artwork = await postArtwork(firebaseId, xVelocity, yVelocity);
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
	const { firebaseId, email } = req.body;
	const user: User = await getUserLogin(firebaseId, email);
	console.log(user);
	res.status(200).json({ user: user });
});

// Signup
app.post("/user/signup", verifyFirebaseToken, async (req, res) => {
	console.log("POST: /user/signup");
	const { firebaseId, email } = req.body;
	const user: User = await getUserSignup(firebaseId, email);
	console.log(user);
	res.status(200).json({ user: user });
});
