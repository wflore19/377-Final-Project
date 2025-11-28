/* eslint-disable no-console */

import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

import pageRouter from './routes/page.js';
import quotesRouter from './routes/quote.js';
import cookieMiddleware from './utils/cookies.js';

const app = express();

const PORT = process.env.PORT || 3000;

// HTML template engine setup
app.set('views', path.join(import.meta.dirname, 'views'));
app.set('view engine', 'ejs');
// Static files
app.use(express.static(path.join(import.meta.dirname, 'public')));
// Logger Middleware
morgan.token('date-est', (req, res) => {
      return new Date()
            .toLocaleString('en-US', {
                  timeZone: 'America/New_York',
            })
            .replace(/ /g, '');
});
app.use(
      morgan(
            ':remote-addr :remote-user :date-est :method ":url" :status :response-time ms ":referrer"'
      )
);
// Cookie Parser Middleware
app.use(cookieParser());
// Json Parser
app.use(express.json());
// Form encoded Parser
app.use(express.urlencoded());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use('/quotes', quotesRouter);

// Page routes + cookie middleware
app.use('/', cookieMiddleware, pageRouter);

app.listen(PORT, () => {
      console.log(`Listening on: http://localhost:${PORT}`);
});
