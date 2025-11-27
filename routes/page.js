import express from 'express';
import supabase from '../utils/database.js';
import { fetchRandomQuote, storeRandomQuote } from '../utils/queries.js';

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
      const { data, error } = await supabase
            .from('liked_quotes')
            .select(`quote:quotes(*)`) // rename quotes to quote for cosmetics
            .eq('userId', req.cookies.user_id);

      res.render('quotes', { savedQuotes: data });
});

export default router;
