import express from "express";
import { verifyFirebaseToken } from "./middleware";
import { getUserLogin, getUserSignup } from "./prisma/prismaAuth";
import { getConfigs, postConfig } from "./prisma/prismaFunctions";

// Types
import type { Config } from "./types/types";
import type { User } from "@prisma/client";

// Setup
const app = express();
const port = process.env.PORT || 3000;
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

// Post to config array
app.post("/api/config", async (req, res) => {
	console.log("POST: api/config");
	const { xVelocity, yVelocity } = req.body;
	const data: Config = await postConfig(xVelocity, yVelocity);
	console.log(data);
	res.status(200).json({ data: data });
});

// Get config array
app.get("/api/config", async (req, res) => {
	console.log("GET: api/config");
	const data: Config[] = await getConfigs();
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
