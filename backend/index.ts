import { getConfigs, postConfig } from "./prisma/prismaFunctions";
import type { Config } from "./types/types";
import express from "express";
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
	// Consoles
	console.log("POST: api/config");

	// Logic
	const { xVelocity, yVelocity } = req.body;
	const data: Config = await postConfig(xVelocity, yVelocity);
	console.log(data);

	// Res
	res.status(200).json({ data: data });
});

// Get config array
app.get("/api/config", async (req, res) => {
	// Consoles
	console.log("GET: api/config");

	// Logic
	const data: Config[] = await getConfigs();
	console.log(data);

	// Res
	res.status(200).json({ data: data });
});
