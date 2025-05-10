// Database Diagram:
// https://www.figma.com/board/1YEWUVZgZ2Z8k8PSvfugTM/Project-A?node-id=0-1&p=f&t=js4BtH8uwqX82II7-0

import Database from "better-sqlite3";
import bcrypt from "bcrypt";

const db = new Database("sqlite.db", { verbose: console.log });

db.exec(`
	CREATE TABLE IF NOT EXISTS Users (
		uid INTEGER PRIMARY KEY, 
		username TEXT NOT NULL UNIQUE, 
		uemail TEXT NOT NULL UNIQUE, 
		upassword TEXT,
		ufirstname TEXT,
		ulastname TEXT,
		ucity TEXT,
		cid INTEGER REFERENCES Contractors(cid)
	);

	CREATE TABLE IF NOT EXISTS Contractors (
		cid INTEGER PRIMARY KEY,
		uid INTEGER REFERENCES Users(uid),
		jobType TEXT NOT NULL,
		biography TEXT,
		rating REAL DEFAULT 0
	);

	CREATE TABLE IF NOT EXISTS JobRequests (
		rid INTEGER PRIMARY KEY,
		uid INTEGER REFERENCES Users(uid),
		jobTitle TEXT,
		jobDescription TEXT,
		location TEXT,
		jobType TEXT,
		offeredPrice INTEGER DEFAULT 0,
		datePosted TEXT DEFAULT CURRENT_TIMESTAMP,
		status INTEGER DEFAULT 0
	);

	CREATE TABLE IF NOT EXISTS ContractorJobs (
		jid INTEGER PRIMARY KEY,
		cid INTEGER REFERENCES Contractors(cid),
		rid INTEGER REFERENCES JobRequests(rid),
		jobDescription TEXT,
		offeredPrice INTEGER DEFAULT 0,
		datePosted TEXT DEFAULT CURRENT_TIMESTAMP,
		status INTEGER DEFAULT 0
	);

	CREATE TABLE IF NOT EXISTS Ratings (
		ratingid INTEGER PRIMARY KEY,
		reviewerId INTEGER REFERENCES Users(uid),
		cid INTEGER REFERENCES Contractors(cid),
		rid INTEGER REFERENCES JobRequests(rid),
		rating INTEGER DEFAULT 0,
		review TEXT
	);
`);

try {
	db.prepare(`ALTER TABLE Contractors ADD COLUMN companyName TEXT`).run();
} catch (e) {
	if (!e.message.includes("duplicate column name")) console.error(e);
}

try {
	db.prepare(`ALTER TABLE Contractors ADD COLUMN cityLocation TEXT`).run();
} catch (e) {
	if (!e.message.includes("duplicate column name")) console.error(e);
}


const fill = db.prepare("SELECT uid FROM Users WHERE uid = ?").get(1);
if (!fill) {
	// mikelRocks' password is Pass123
	// jennyIsCool's password is Jenny23
	db.exec(`	
		INSERT INTO Users VALUES (1,'mikelRocks','MG@gmail.com','$2b$12$vcI6ssLdqUHlQnH38pSynugDWrU8GtpDQta3Tae1F3D/6deoNJEjy','Michel','Gonzalez','Pharr',NULL);
		INSERT INTO Users VALUES (2,'jennyIsCool','jen@outlook.com','$2b$12$7V.2ubRpRCPnxy/Y6IwpKOQHLjZsnirmgUo3BVNzto5v6MTHLnSdC','Jennifer','Ross','Mission',NULL);
		INSERT INTO Contractors VALUES (1,2,'Jenny Cleans','Quality cleaning since forever!',4.5);
		UPDATE Users SET cid = 1 WHERE uid = 2;
		INSERT INTO JobRequests VALUES (1,1,'I need a plumber quick!','Need someone to replace the sink.','Pharr','Plumbing',700,'2025-04-28 00:13:24',NULL);
		INSERT INTO JobRequests VALUES (2,2,'I need a babysitter!','I got 4 kids that need watchin!','Edingburg','Childcare',80,'2025-05-07 00:18:46',NULL);
	`);
}

export default db;
