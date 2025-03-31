const express = require("express");
const jwt = require("jsonwebtoken");
const db = require("./database");
const nodemailer = require("nodemailer");
const cron = require("node-cron");
const router = express.Router();

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
			next();
		});
	} catch (error) {
		return res.status(500).json({ error: "Internal server error!" });
	}
}

router.put("/access-notifications", authenticateUser, async (req, res) => {
	try {
		const email = req.email;

		const notificationStatusFromDatabase = `SELECT notificationsAccess FROM notificationsData WHERE email = ?`;
		db.query(notificationStatusFromDatabase, [email], (err, results) => {
			if (err) {
				return res.status(500).json({ error: "Database query error", details: err });
			}
			const currentStatus = results[0].notificationsAccess;
			const newStatus = currentStatus === 0 ? 1 : 0;
			
			const getAccessNotificationsQuery = `UPDATE notificationsData SET notificationsAccess = ? WHERE email = ?`;
			db.query(getAccessNotificationsQuery, [newStatus, email], err => {
				if (err) {
					return res.status(500).json({ error: "Database query error", details: err });
				}
				return res.status(200).json({ message: "Got access for getting notifications successfully!", newStatus });
			});
		});
	} catch (error) {
		console.error("Error during adding notification:", error);
		return res.status(500).json({ error: "Internal server error!" });
	}
});

router.get("/display-notification", authenticateUser, async (req, res) => {
	try {
		const email = req.email;

		const isUserAllowedForGetNotificationsQuery = `SELECT notificationsAccess FROM notificationsData WHERE email = ?`;
		db.query(isUserAllowedForGetNotificationsQuery, [email], (err, results) => {
			if (err) {
				return res.status(500).json({ error: "Database query error", details: err });
			}
			if (results[0].notificationAccess) {
				const getNotificationsQuery = `SELECT notificationName FROM notificationsData WHERE email = ?`;
				db.query(getNotificationsQuery, [email], err => {
					if (err) {
						return res.status(500).json({ error: "Database query error", details: err });
					}

					return res.status(200).json({ message: "New notification created successfully!" });
				});
			} else {
				return res.status(403).json({ message: "Notifications are not available for this user." });
			}
		});
	} catch (error) {
		console.error("Error during adding notification:", error);
		return res.status(500).json({ error: "Internal server error!" });
	}
});

router.delete("/remove-notification", authenticateUser, async (req, res) => {
	try {
		const { ID } = req.body;
		const email = req.email;

		const removeNotificationQuery = `DELETE FROM notificationsData WHERE ID = ? AND email = ?`;
		db.query(removeNotificationQuery, [ID, email], (err, results) => {
			if (err) {
				return res.status(500).json({ error: "Database query error", details: err });
			}
			if (results.affectedRows === 0) {
				return res.status(404).json({ error: "Notification not found!" });
			}

			return res.status(200).json({ message: "Notification deleted successfully!" });
		});
	} catch (error) {
		console.error("Error during remove task:", error);
		return res.status(500).json({ error: "Internal server error!" });
	}
});

module.exports = router;
