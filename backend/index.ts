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
