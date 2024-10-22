import express from "express";
import { verifyFirebaseToken } from "./middleware";
import { getUserLogin, getUserSignup } from "./prisma/prismaAuth";
import { getArtworks, postArtwork } from "./prisma/prismaFunctions";

// Types
import type { Artwork } from "./types/types";
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

// Post to artwork array
app.post("/api/artwork", async (req, res) => {
	console.log("POST: api/artwork");
	const { xVelocity, yVelocity } = req.body;
	const data: Artwork = await postArtwork(xVelocity, yVelocity);
	console.log(data);
	res.status(200).json({ data: data });
});

// Get config array
app.get("/api/artwork", async (req, res) => {
	console.log("GET: api/artwork");
	const data: Artwork[] = await getArtworks();
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
	const { firebaseId, email } = req.body;
	const user: User = await getUserLogin(firebaseId, email);
	console.log(user);
	res.status(200).json({ user: user });
});

// Signup
app.post("/user/signup", verifyFirebaseToken, async (req, res) => {
	const { firebaseId, email } = req.body;
	const user: User = await getUserSignup(firebaseId, email);
	console.log(user);
	res.status(200).json({ user: user });
});
