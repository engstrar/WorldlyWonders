// Setting the port number that will be used on the FLIP1 engr server
const port = 3012;

// Setting up express
const express = require("express");
const app = express();
const path = require("path");
const engine = require("ejs-mate");

// Setting up ejs and ejs-mate
app.engine("ejs", engine);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// For parsing post requests
app.use(express.urlencoded({ extended: true }));

// Serving static files
app.use(express.static("public"));

// Home
app.get("/", (req, res) => {
	const meta = { title: "Home" };
	res.render("home", meta);
});

// Detailed information pages for each wonder
app.get("/all", (req, res) => {
	const meta = {
		title: `${req.query.type.replace(/_/g, " ")}`,
	};
	res.render("all", meta);
});

// Detailed information pages for each wonder
app.get("/details", (req, res) => {
	const meta = {
		title: `${req.query.wonder.replace(/_/g, " ")}`,
		wonder: `${req.query.wonder}`,
	};
	res.render("details", meta);
});

// Error Handling
app.use((req, res) => {
	const meta = { title: "Not Found" };
	res.status(404);
	res.render("error404", meta);
});

// Communication on the server
app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
