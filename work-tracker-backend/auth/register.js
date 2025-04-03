const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../database");
const router = express.Router();

router.post("/register", async (req, res) => {
	try {
		const { firstName, lastName, email, password } = req.body;

		if (!firstName || !lastName || !email || !password) {
			return res.status(400).json({ error: "All fields are required" });
		}

		const checkUserQuery = `SELECT * FROM userData WHERE email = ?`;
		db.query(checkUserQuery, [email], (err, data) => {
			if (err) {
				console.error("Database query error during user check:", err.message);
				return res.status(500).json({ error: "Internal server error" });
			}
			if (data.length > 0) {
				return res.status(409).json({ error: "User with this email address is already exists!" });
			}

			const salt = bcrypt.genSaltSync(8);
			const hashedPassword = bcrypt.hashSync(password, salt);

			const createUserQuery = `INSERT INTO userData (firstName, lastName, email, password) VALUES (?, ?, ?, ?)`;
			db.query(createUserQuery, [firstName, lastName, email, hashedPassword], err => {
				if (err) {
					console.error("Database query error during user creation:", err.message);
					return res.status(500).json({ error: "Internal server error" });
				}

				return res
					.status(201)
					.json({ message: "User registered successfully!", firstName, lastName, email, hashedPassword });
			});
		});
	} catch (error) {
		console.error("Error during registration:", error);
		return res.status(500).json({ error: "Internal server error!" });
	}
});

module.exports = router;
