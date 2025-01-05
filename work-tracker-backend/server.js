const express = require("express");
const cors = require("cors");

const registerRoutes = require("./register");

const app = express();
const port = 5174;

app.use(express.json());
app.use(cors());

app.use("/register", registerRoutes);

app.listen(port, () => {
	console.log(`Server working at: http://localhost:${port}`);
});
