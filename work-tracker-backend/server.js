const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const registerRoutes = require("./auth/register");
const loginRoutes = require("./auth/login");
const logoutRoutes = require("./auth/logout");
const userDataRoutes = require("./auth/userData");
const tasksRoutes = require("./features/tasks");
const motivationRoutes = require("./features/motivation");
const notificationsRoutes = require("./features/notifications");

const app = express();
const port = process.env.PORT | 5174;

app.use(express.json());
app.use(
	cors({
		origin: ["https://worktrackerfrontend.onrender.com"],
		credentials: true,
	})
);
app.use(cookieParser());

app.use("/", registerRoutes);
app.use("/", loginRoutes);
app.use("/", logoutRoutes);
app.use("/", userDataRoutes);
app.use("/", tasksRoutes);
app.use("/", motivationRoutes);
app.use("/", notificationsRoutes);

app.listen(port, () => {
	console.log(`Server working at: "https://worktrackerfrontend.onrender.com${port}`);
});
