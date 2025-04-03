require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../database");
const router = express.Router();

function authenticateToken(req, res, next) {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];

	if (!token) {
		return res.status(401).json({ message: "Token is not provide!" });
	}

	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
		if (err) {
			return res.status(403).json({ message: "Invalid token!" });
		}
		req.user = user;
		next();
	});
}

function authenticateUser(req, res, next) {
	try {
		const accessToken = req.cookies.accessToken;
		if (!accessToken) {
			return res.status(401).json({ error: "No token provided!" });
		}

		jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
			if (err) {
				return res.status(403).json({ error: "Invalid token!" });
			}
			req.email = decoded.email;
			next();
		});
	} catch (error) {
		return res.status(500).json({ error: "Internal server error!" });
	}
}

router.post("/authorization", authenticateToken, (req, res) => {
	return res.status(200).json({ message: "", user: req.user });
});

router.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return res.status(400).send("All fields are required!");
		}

		const checkUserQuery = `SELECT * FROM userData WHERE email = ?`;
		db.query(checkUserQuery, [email], async (err, data) => {
			if (err) {
				return res.status(500).json({ error: "Database query error", details: err });
			}
			if (data.length === 0) {
				return res.status(404).json({ error: "User not found!" });
			}

			const user = data[0];
			const isPasswordValid = await bcrypt.compare(password, user.password);
			if (!isPasswordValid) {
				return res.status(401).json({ error: "Password is not correct!" });
			}

			const accessToken = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, {
				expiresIn: "15m",
			});
			const refreshToken = jwt.sign({ email }, process.env.REFRESH_TOKEN_SECRET, {
				expiresIn: "30d",
			});

			res.cookie("accessToken", accessToken, {
				maxAge: 15 * 60 * 1000,
				secure: process.env.NODE_ENV === "production",
				httpOnly: false,
				sameSite: "Lax",
			});

			res.cookie("refreshToken", refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				secure: process.env.NODE_ENV === "production",
				httpOnly: false,
				sameSite: "Lax",
			});

			res.status(200).json({
				message: "User logged successfully!",
				isLogged: true,
				firstName: user.firstName,
				lastName: user.lastName,
				accessToken,
			});
		});
	} catch (error) {
		console.error("Error during user login:", error);
		return res.status(500).json({ error: "Internal server error!" });
	}
});

router.get("/user-names", authenticateUser, async (req, res) => {
	try {
		const email = req.email;

		if (!email) {
			return res.status(404).json({ error: "User not found!" });
		}
		const getNamesQuery = `SELECT firstName, lastName FROM userData WHERE email = ?`;
		db.query(getNamesQuery, [email], (err, results) => {
			if (err) {
				return res.status(500).json({ error: "Database query error", details: err });
			}
			if (results.length === 0) {
				return res.status(404).json({ error: "No user found with this adress email!" });
			}

			const { firstName, lastName } = results[0];
			return res.status(200).json({ message: "User firstName and lastName got successfully!", firstName, lastName });
		});
	} catch (error) {
		console.error("Error during getting user names:", error);
		return res.status(500).json({ error: "Internal server error!" });
	}
});

router.post("/refresh-token", async (req, res) => {
	try {
		const refreshToken = req.cookies.refreshToken;

		if (!refreshToken) {
			return res.status(401).json({ error: "Invalid refresh token" });
		}

		jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
			if (err) {
				return res.status(403).json({ error: "Invalid token!" });
			}

			const email = decoded.email;
			const accessToken = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });

			res.cookie("accessToken", accessToken, {
				maxAge: 15 * 60 * 1000,
				secure: process.env.NODE_ENV === "production",
				httpOnly: false,
				sameSite: "Lax",
			});

			return res.status(200).json({ message: "Access token provided successfully!" });
		});
	} catch (error) {
		console.error("Error during refreshing token:", error);
		return res.status(500).json({ error: "Internal server error!" });
	}
});

module.exports = router;
