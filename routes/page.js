import express from 'express';
import {
      fetchRandomQuote,
      fetchSavedQuotes,
      storeRandomQuote,
} from '../utils/queries.js';

const router = express.Router();

router.get('/', async (req, res) => {
      try {
            const quote = await fetchRandomQuote();
            const newQuote = await storeRandomQuote(quote);
            res.render('index', { quote: newQuote, error: null });
      } catch (error) {
            res.status(500).render('index', {
                  quote: null,
                  error: 'Unable to load quote at this time',
            });
      }
});

router.get('/about', (req, res) => {
      res.render('about');
});

router.get('/project', (req, res) => {
      res.render('project');
});

router.get('/quotes', async (req, res) => {
      try {
            const savedQuotes = await fetchSavedQuotes(req.cookies.user_id);
            res.render('quotes', { savedQuotes: savedQuotes, error: null });
      } catch (error) {
            res.status(500).render('quotes', {
                  savedQuotes: null,
                  error: 'Unable to load saved quotes at this time',
            });
      }
});

export default router;
