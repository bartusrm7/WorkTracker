const express = require("express");
const router = express.Router();

router.get("/motivation", async (req, res) => {
	try {
		const response = await fetch("https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json");
		const data = await response.json();
		return res.status(200).json({
			author: data.quoteAuthor,
			quote: data.quoteText,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Could not fetch motivational quote." });
	}
});

module.exports = router;
