// Setting the port number that will be used
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

// Setting up Axios for help with requests
const axios = require("axios");

// Serving static files
app.use(express.static("public"));

// Base URL for the Wikipedia Scraper Used
const wikiScraper = "http://areks-wikipedia-scraper.herokuapp.com/?page=";
// URL for development, will be removed before final product
//const wikiScraper = "http://localhost:4203/?page=";

// Base URL for Marilyn's Image Service
const imgService = "http://notforlong.net:5007/requestImage?name=";

// Home
app.get("/", (req, res) => {
	const meta = { title: "Home" };
	res.render("home", meta);
});

// View all page for each category of wonder
app.get("/all", (req, res) => {
	const meta = {
		title: `${req.query.type.replace(/_/g, " ")}`,
	};
	res.render("all", meta);
});

// Detailed information pages for each wonder
app.get("/details", (req, res) => {
	let wikiURL = wikiScraper + req.query.wonder;
	let wonder = `${req.query.wonder.replace(/_/g, " ")}`;
	console.log(`Scrape Data From: ${wikiURL}`);
	console.log(`Request Image from: ${imgService + wonder}`);

	// Need to readd code for Image scraper now that Wiki scraper
	// is fully integrated.
	axios(wikiURL)
		.then((wikiResponse) => {
			let data = wikiResponse.data;
			const meta = {
				title: wonder,
				wonder: `${req.query.wonder}`,
				map: `https://maps.google.com/maps?q=${req.query.long}, ${req.query.lat}&z=15&output=embed`,
				img: " ",
				data: data,
			};
			res.render("details", meta);
		})
		.catch(console.error);
});

// Error Handling
app.use((req, res) => {
	const meta = { title: "Not Found" };
	res.status(404);
	res.render("error404", meta);
});

// Communication on the server
app.listen(port, () => {
	console.log(`LIVE @ http://localhost:${port}/`);
});
