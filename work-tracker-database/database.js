const mysql = require("mysql2");

const db = mysql.createConnection({
	host: "database",
	user: "root",
	password: "monkeyking",
	database: "work_tracker",
	port: 3306,
});

db.query(`CREATE TABLE IF NOT EXISTS userData (
    ID int PRIMARY KEY AUTO_INCREMENT,
    firstName varchar(255) NOT NULL,
	lastName varchar(255) NOT NULL,
	email varchar (255) NOT NULL,
	password varchar(255) NOT NULL
)`);

db.query(`CREATE TABLE IF NOT EXISTS tasksData (
	ID int PRIMARY KEY AUTO_INCREMENT,
	email varchar (255) NOT NULL,
	taskName varchar(255) NOT NULL,
	taskDate DATETIME NOT NULL,
	taskDescription varchar(255),
	taskStatus varchar(255) DEFAULT 'pending'
)`);

db.query(`CREATE TABLE IF NOT EXISTS notificationsData (
	ID int PRIMARY KEY AUTO_INCREMENT,
	email varchar (255) NOT NULL,
	notificationsAccess TINYINT (1) DEFAULT 0,
	notificationName varchar (255) NOT NULL
)`);

db.connect(error => {
	if (error) {
		console.error("Error connect: ", error.stack);
		return;
	}
});

module.exports = db;
