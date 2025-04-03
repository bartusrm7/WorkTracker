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

		const getUserDataFromDatabaseQuery = `SELECT * FROM userData WHERE email = ?`;
		db.query(getUserDataFromDatabaseQuery, [email], err => {
			if (err) {
				return res.status(500).json({ error: "Database query error", details: err });
			}

			return res.status(200).json({ message: "User data got successfully!" });
		});
	} catch (error) {
        
    }
});

module.exports = router;
