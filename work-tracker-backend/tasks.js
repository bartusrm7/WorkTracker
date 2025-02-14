const express = require("express");
const jwt = require("jsonwebtoken");
const db = require("./database");
const router = express.Router();

router.post("/create-task", async (req, res) => {
	try {
		const { taskName, taskDate, taskDescription } = req.body;
		const accessToken = req.cookies.accessToken;

		if (!taskName || !taskDate) {
			return res.status(400).json({ error: "All fields are required!" });
		}
		if (!accessToken) {
			return res.status(401).json({ error: "Access token missing!" });
		}

		jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
			if (err) {
				return res.status(403).json({ error: "Invalid token!" });
			}
			const email = decoded.email;

			const createNewTasksQuery = `INSERT INTO tasksData (email, taskName, taskDate, taskDescription) VALUES (?, ?, ?, ?)`;

			db.query(createNewTasksQuery, [email, taskName, taskDate, taskDescription], (err, data) => {
				if (err) {
					return res.status(500).json({ error: "Database query error", details: err });
				}

				return res.status(201).json({ message: "Task added successfully!", data });
			});
		});
	} catch (error) {
		console.error("Error during adding task:", error);
		return res.status(500).json({ error: "Internal server error!" });
	}
});

router.get("/get-task", async (req, res) => {
	try {
		const accessToken = req.cookies.accessToken;

		jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
			if (err) {
				return res.status(403).json({ error: "Invalid token!" });
			}
			const email = decoded.email;

			const getTasksFromDatabase = `SELECT * FROM tasksData WHERE email = ?`;
			db.query(getTasksFromDatabase, [email], (err, results) => {
				if (err) {
					return res.status(500).json({ error: "Database query error", details: err });
				}

				return res.status(200).json({ message: "Task gotten successfully!" }, { tasks: results });
			});
		});
	} catch (error) {
		console.error("Error during getting tasks:", error);
		return res.status(500).json({ error: "Internal server error!" });
	}
});

module.exports = router;
