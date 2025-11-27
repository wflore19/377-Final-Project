import express from "express";
import supabase from "../config/database.js";

const router = express.Router();

router.get("/", async (req, res) => {
	try {
		const response = await fetch("https://dummyjson.com/quotes/random");
		const json = await response.json();

		res.render("index", { quote: json });

		
		const { data, error } = await supabase
		.from('quotes')
		.insert([
			{ id: json.id, quote: json.quote, author: json.author },
		])
		.select()

	} catch (error) {
		console.error("Error fetching quote:", error);
		// Fallback to rendering without quote
		res.render("index");
	}
});

router.get("/about", (req, res) => {
	res.render("about");
});

router.get("/project", (req, res) => {
	res.render("project");
});

router.get("/quotes", async (req, res) => {
	// i need to join liked_quotes with quotes to get the quote text
	const { data, error } = await supabase
		.from('liked_quotes')
		.select(`quote:quotes(*)`)
		.eq('userId', req.cookies.user_id);

	res.render("quotes", { savedQuotes: data });
});

export default router;
