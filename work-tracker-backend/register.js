const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const db = require("./database");

router.post("/register", async (req, res) => {
	try {
		const { firstName, lastName, email, password } = req.body;
		if (!firstName || !lastName || !email || !password) {
			return res.status(400).send("All fields are required!");
		}

		const [existingUser] = await db.promise().query(`SELECT * FROM userData WHERE email = ?`);
		if (existingUser.length > 0) return res.status(400).send("User with this email is already exists!");

		const hashedPassword = await bcrypt.hash(password, 8);
		const registerUserToDataBase = `INSERT INTO userData (firstName, lastName, email, password) VALUES (?, ?, ?, ?)`;

		await db.promise().query(registerUserToDataBase, [firstName, lastName, email, hashedPassword]);

		return res.status(201).json({ message: "User registered successfully!" });
	} catch (error) {
		console.error("Error during registration:", error);
		return res.status(500).send("Server error!");
	}
});

module.exports = router;
