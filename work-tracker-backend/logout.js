const express = require("express");
const router = express.Router();

router.post("/logout", async (req, res) => {
	try {
		res.clearCookie("accessToken");
		res.clearCookie("refreshToken");

		res.status(200).send({ message: "User logged out successfully!", isLogged: false });
	} catch (error) {
		console.error("Error during logout:", error);
		return res.status(500).send("Interval server error!");
	}
});

module.exports = router;
