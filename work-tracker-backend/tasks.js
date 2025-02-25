const express = require("express");
const jwt = require("jsonwebtoken");
const db = require("./database");
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

		db.query(createNewTasksQuery, [email, taskName, taskDate, taskDescription], (err, data) => {
			if (err) {
				return res.status(500).json({ error: "Database query error", details: err });
			}

			return res.status(201).json({ message: "Task added successfully!", data });
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

			return res.status(200).json({ message: "Task gotten successfully!", tasks: results });
		});
	} catch (error) {
		console.error("Error during getting tasks:", error);
		return res.status(500).json({ error: "Internal server error!" });
	}
});

router.post("/done-task", authenticateUser, async (req, res) => {
	try {
		const { taskId, taskDone } = req.body;
		const email = req.email;

		if (!taskId) {
			return res.status(400).json({ error: "Task ID is required!" });
		}

		const doneTaskQuery = `UPDATE tasksData SET taskDone = TRUE WHERE ID = ? AND email = ?`;
		db.query(doneTaskQuery, [taskId, email], (err, results) => {
			if (err) {
				return res.status(500).json({ error: "Database query error", details: err });
			}
		});
	} catch (error) {
		console.error("Error during getting tasks:", error);
		return res.status(500).json({ error: "Internal server error!" });
	}
});

router.post("/edit-task", authenticateUser, async (req, res) => {
	try {
		const { taskId, taskName, taskDescription } = req.body;
		const email = req.email;

		if (!taskId) {
			return res.status(400).json({ error: "Task ID is required!" });
		}

		const editTaskQuery = `UPDATE tasksData SET taskName = ?, taskDescription = ? WHERE ID = ? AND email = ?`;
		db.query(editTaskQuery, [taskId, email], (err, results) => {
			if (err) {
				return res.status(500).json({ error: "Database query error", details: err });
			}
		});
	} catch (error) {
		console.error("Error during getting tasks:", error);
		return res.status(500).json({ error: "Internal server error!" });
	}
});

router.post("/remove-task", authenticateUser, async (req, res) => {
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
		console.error("Error during getting tasks:", error);
		return res.status(500).json({ error: "Internal server error!" });
	}
});

module.exports = router;
