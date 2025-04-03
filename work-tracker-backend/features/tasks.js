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

router.post("/create-task", authenticateUser, async (req, res) => {
	try {
		const { taskName, taskDate, taskDescription } = req.body;
		const email = req.email;

		if (!taskName || !taskDate) {
			return res.status(400).json({ error: "All fields are required!" });
		}

		const createNewTasksQuery = `INSERT INTO tasksData (email, taskName, taskDate, taskDescription) VALUES (?, ?, ?, ?)`;
		db.query(createNewTasksQuery, [email, taskName, taskDate, taskDescription], err => {
			if (err) {
				return res.status(500).json({ error: "Database query error", details: err });
			}

			const createNewNotificationQuery = `INSERT INTO notificationsData (email, notificationName) VALUES (?, ?)`;
			db.query(createNewNotificationQuery, [email, taskName], err => {
				if (err) {
					return res.status(500).json({ error: "Database query error", details: err });
				}

				return res.status(201).json({ message: "Task and notification added successfully!" });
			});
		});
	} catch (error) {
		console.error("Error during adding task:", error);
		return res.status(500).json({ error: "Internal server error!" });
	}
});

router.get("/get-task", authenticateUser, async (req, res) => {
	try {
		const email = req.email;

		const getTasksFromDatabase = `SELECT * FROM tasksData WHERE email = ?`;
		db.query(getTasksFromDatabase, [email], (err, results) => {
			if (err) {
				return res.status(500).json({ error: "Database query error", details: err });
			}

			return res.status(200).json({ message: "Task recived successfully!", tasks: results });
		});
	} catch (error) {
		console.error("Error during getting tasks:", error);
		return res.status(500).json({ error: "Internal server error!" });
	}
});

router.put("/done-task", authenticateUser, async (req, res) => {
	try {
		const { ID } = req.body;
		const email = req.email;

		if (!ID) {
			return res.status(400).json({ error: "Task ID is required!" });
		}

		const taskStatusFromDatabase = `SELECT taskStatus FROM tasksData WHERE ID = ? AND email = ?`;
		db.query(taskStatusFromDatabase, [ID, email], (err, results) => {
			if (err) {
				return res.status(500).json({ error: "Database query error", details: err });
			}
			const currentStatus = results[0].taskStatus;
			const newStatus = currentStatus === "pending" ? "done" : "pending";

			const doneTaskQuery = `UPDATE tasksData SET taskStatus = ? WHERE ID = ? AND email = ?`;
			db.query(doneTaskQuery, [newStatus, ID, email], err => {
				if (err) {
					return res.status(500).json({ error: "Database query error", details: err });
				}

				return res.status(200).json({ message: `New task status ${newStatus} changed successfully!`, newStatus, ID });
			});
		});
	} catch (error) {
		console.error("Error during mark done task:", error);
		return res.status(500).json({ error: "Internal server error!" });
	}
});

router.put("/edit-task", authenticateUser, async (req, res) => {
	try {
		const { ID, taskName, taskDescription } = req.body;
		const email = req.email;

		if (!ID) {
			return res.status(400).json({ error: "Task ID is required!" });
		}

		if (!taskName && !taskDescription) {
			return res.status(400).json({ error: "At least one field must be completed!" });
		}

		const editTaskQuery = `UPDATE tasksData SET taskName = ?, taskDescription = ? WHERE ID = ? AND email = ?`;
		db.query(editTaskQuery, [taskName, taskDescription, ID, email], err => {
			if (err) {
				return res.status(500).json({ error: "Database query error", details: err });
			}

			return res.status(200).json({ message: "Task edit successfully!" });
		});
	} catch (error) {
		console.error("Error during edit task:", error);
		return res.status(500).json({ error: "Internal server error!" });
	}
});

router.delete("/remove-task", authenticateUser, async (req, res) => {
	try {
		const { ID } = req.body;
		const email = req.email;

		if (!ID) {
			return res.status(400).json({ error: "Task ID is required!" });
		}

		const removeTaskQuery = `DELETE FROM tasksData WHERE ID = ? AND email = ?`;
		db.query(removeTaskQuery, [ID, email], (err, results) => {
			if (err) {
				return res.status(500).json({ error: "Database query error", details: err });
			}
			if (results.affectedRows === 0) {
				return res.status(404).json({ error: "Task not found!" });
			}

			return res.status(200).json({ message: "Task deleted successfully!" });
		});
	} catch (error) {
		console.error("Error during remove task:", error);
		return res.status(500).json({ error: "Internal server error!" });
	}
});

module.exports = router;
