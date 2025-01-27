require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const db = require("./database");

function authenticateToken(req, res, next) {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];

	if (!token) {
		return res.status(401).send({ message: "No token provided!" });
	}

	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
		if (err) {
			return res.status(403).send({ message: "Invalid token!" });
		}
		req.user = user;
		next();
	});
}

router.post("/authorization", authenticateToken, (req, res) => {
	console.log(req.user);
	res.status(200).json({ message: "Authorization successful!", user: req.user });
});

router.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return res.status(400).send("All fields are required!");
		}

		const [result] = await db.promise().query(`SELECT * FROM userData WHERE email = ?`, [email]);
		if (result.length === 0) {
			return res.status(401).send("Invalid email or password!");
		}

		const user = result[0];

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(403).send("Invalid email or password!");
		}

		const accessToken = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
		const refreshToken = jwt.sign({ email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "30d" });

		res.cookie("accessToken", accessToken, {
			maxAge: 15 * 60 * 1000,
			secure: process.env.NODE_ENV === "production",
			httpOnly: true,
			sameSite: "Lax",
		});

		res.cookie("refreshToken", refreshToken, {
			maxAge: 30 * 24 * 60 * 60 * 1000,
			secure: process.env.NODE_ENV === "production",
			httpOnly: true,
			sameSite: "Lax",
		});

		return res.status(200).json({ message: "User logged successfully!" });
	} catch (error) {
		console.error("Error during login:", error);
		return res.status(500).send("Interval server error!");
	}
});

module.exports = router;
