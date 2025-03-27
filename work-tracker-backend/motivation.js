const express = require("express");
const router = express.Router();

router.get("/motivation", async (req, res) => {
	try {
		const response = await fetch("https://zenquotes.io/api/random/");
		const data = await response.json();

		return res.status(200).json(data[0].q);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Could not fetch motivational quote." });
	}
});

module.exports = router;
