const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const registerRoutes = require("./register");
const loginRoutes = require("./login");

const app = express();
const port = 5174;

app.use(express.json());
app.use(
	cors({
		origin: "http://localhost:5173",
		credentials: true,
	})
);
app.use(cookieParser());

app.use("/", registerRoutes);
app.use("/", loginRoutes);

app.listen(port, () => {
	console.log(`Server working at: http://localhost:${port}`);
});
