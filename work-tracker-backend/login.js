const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const db = require("./database");

router.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return res.status(400).send("All fields are required!");
		}

		const [result] = await db.promise().query(`SELECT * FROM userData WHERE email = ?`, [result]);
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

		return res.status(200).json({ message: "User logged successfully!", result });
	} catch (error) {
		return res.status(500).send("Intevnal server error!");
	}
});

module.exports = router;
