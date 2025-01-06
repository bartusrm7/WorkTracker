const mysql = require("mysql2");

const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "monkeyking",
	database: "work_tracker",
});

db.query(`CREATE TABLE IF NOT EXISTS userData (
    ID int PRIMARY KEY AUTO_INCREMENT,
    firstName varchar(255),
	lastName varchar(255),
	email varchar (255) UNIQUE,
	password varchar(255)
)`);

db.connect(error => {
	if (error) {
		console.error("Error connect: ", error.stack);
		return;
	}
});

module.exports = db;
