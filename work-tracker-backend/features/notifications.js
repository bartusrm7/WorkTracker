const express = require("express");
const jwt = require("jsonwebtoken");
const db = require("../database");
const nodemailer = require("nodemailer");
const router = express.Router();

const transporter = nodemailer.createTransport({
	host: "smtp.ethereal.email",
	port: 587,
	auth: {
		user: "myron96@ethereal.email",
		pass: "KDRpTsGgqM9NHNHmwa",
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
				return res
					.status(200)
					.json({ message: "Got access for getting notifications successfully!", notificationsAccess: newStatus });
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
			if (results[0].notificationsAccess) {
				const getNotificationsQuery = `SELECT notificationName FROM notificationsData WHERE email = ?`;
				db.query(getNotificationsQuery, [email], (err, data) => {
					if (err) {
						return res.status(500).json({ error: "Database query error", details: err });
					}

					return res.status(200).json({ message: "Notifications are showed successfully!", notifications: data });
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

router.post("/send-create-task-notification", authenticateUser, async (req, res) => {
	try {
		const { taskName } = req.body;
		const email = req.email;

		if (!taskName) {
			return res.status(400).json({ error: "Task name is required!" });
		}

		const sendNotificationToEmail = {
			from: "myron96@ethereal.email",
			to: email,
			subject: "Task created",
			text: `New task "${taskName}" was created! Try to make it done! Good luck!`,
		};

		transporter.sendMail(sendNotificationToEmail, err => {
			if (err) {
				return res.status(500).json({ error: "Failed to send email!" });
			}
			return res.status(200).json({ message: "Email was sent successfully!" });
		});
	} catch (error) {
		console.error("Error during create new task notification:", error);
		return res.status(500).json({ error: "Internal server error!" });
	}
});

router.post("/send-done-task", authenticateUser, async (req, res) => {
	try {
		const { taskName } = req.body;
		const email = req.email;

		if (!taskName) {
			return res.status(400).json({ error: "Task name is required!" });
		}

		const sendNotificationToEmail = {
			from: "myron96@ethereal.email",
			to: email,
			subject: "Task completed",
			text: `Task "${taskName}" was completed! Congrats and keep going to finish another task!`,
		};

		transporter.sendMail(sendNotificationToEmail, err => {
			if (err) {
				return res.status(500).json({ error: "Failed to send email!" });
			}
			return res.status(200).json({ message: "Email was sent successfully!", taskName });
		});
	} catch (error) {
		console.error("Error during make task done:", error);
		return res.status(500).json({ error: "Internal server error!" });
	}
});

module.exports = router;
