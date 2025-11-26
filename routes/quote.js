import express from "express";

const quotesRouter = express.Router();

quotesRouter.post("/", (req, res) => {
	const newQuote = req.body;
});

quotesRouter.get("/user/:userId", (req, res) => {
	const userId = req.params.userId;
	// Logic to retrieve quotes by userId
});

quotesRouter.post("/like", (req, res) => {
	console.log("Like quote endpoint hit");
	console.log(req.body);
	const { quoteId, quoteText } = req.body;
	console.log(quoteId, quoteText);
	// Logic to like a quote
});

quotesRouter.post("/unlike", (req, res) => {
	const { quoteId, quoteText } = req.body;
	// Logic to unlike a quote
});

export default quotesRouter;
