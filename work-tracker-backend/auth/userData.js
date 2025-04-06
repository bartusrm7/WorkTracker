const express = require("express");
const jwt = require("jsonwebtoken");
const db = require("../database");
const router = express.Router();

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

router.get("/user-data", authenticateUser, async (req, res) => {
	try {
		const email = req.email;

		if (!email) {
			return res.status(404).json({ error: "User not found!" });
		}
		const getUserDataFromDatabaseQuery = `SELECT * FROM userData WHERE email = ?`;
		db.query(getUserDataFromDatabaseQuery, [email], (err, results) => {
			if (err) {
				return res.status(500).json({ error: "Database query error", details: err });
			}
			const { firstName, lastName, email, userImage } = results[0];
			const userData = { firstName, lastName, email, userImage };
			console.log(userData);

			return res.status(200).json({ message: "User data got successfully!", userData });
		});
	} catch (error) {
		console.error("Error during registration:", error);
		return res.status(500).json({ error: "Internal server error!" });
	}
});

router.put("/edit-user-data", authenticateUser, (req, res) => {
	try {
		const { firstName, lastName, userImage } = req.body;
		const email = req.email;

		const editUserDataQuery = `UPDATE userData SET firstName = ?, lastName = ?, userImage = ? WHERE email = ?`;
		db.query(editUserDataQuery, [firstName, lastName, userImage, email], err => {
			if (err) {
				return res.status(500).json({ error: "Database query error!", details: err });
			}
			return res.status(200).json({ message: "User data edited successfully!" });
		});
	} catch (error) {
		console.error("Error during registration:", error);
		return res.status(500).json({ error: "Internal server error!" });
	}
});

module.exports = router;
