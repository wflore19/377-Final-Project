/* eslint-disable no-console */

import express from "express";
import path from "path";

import pageRouter from "./routes/page.js";
import quotesRouter from "./routes/quote.js";

const app = express();

const PORT = process.env.PORT || 3000;

// HTML template engine setup
app.set("views", path.join(import.meta.dirname, "templates"));
app.set("view engine", "ejs");
// Json Parser
app.use(express.json());
// Form encoded Parser
app.use(express.urlencoded()); 
app.use(express.urlencoded({ extended: true }));
// Static files
app.use(express.static(path.join(import.meta.dirname, "public")));

// API routes
app.use("/quotes", quotesRouter);

// Page routes
app.use("/", pageRouter);

app.listen(PORT, () => {
	console.log(`Listening on: http://localhost:${PORT}`);
});
