const express = require("express");
const jwt = require("jsonwebtoken");
const db = require("./database");
const nodemailer = require("nodemailer");
const cron = require("node-cron");
const router = express.Router;

const transporter = nodemailer.createTransport({
	host: "smtp.ethereal.email",
	port: 587,
	auth: {
		user: "elody.abbott32@ethereal.email",
		pass: "MA5wQTv28YEWzhwAQV",
	},
});

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

			return next;
		});
	} catch (error) {
		return res.status(500).json({ error: "Internal server error!" });
	}
}

router.post("/notifications", authenticateUser, async (req, res) => {
	try {
		const { notificationsAccess, notificationName } = req.body;
		const email = req.email;

		const createNewNotificationQuery = `INSERT INTO notificationsData (notificationsAccess, notificationName) VALUES (?, ?)`;
		db.query(createNewNotificationQuery, [email, notificationsAccess, notificationName], err => {
			if (err) {
				return res.status(500).json({ error: "Database query error", details: err });
			}

			return res.status(200).json({ message: "New notification created successfully!" });
		});
	} catch (error) {
		console.error("Error during adding notification:", error);
		return res.status(500).json({ error: "Internal server error!" });
	}
});

module.exports = router;
