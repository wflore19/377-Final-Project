import express from 'express';
import supabase from '../utils/database.js';
import { fetchRandomQuote, storeRandomQuote } from '../utils/queries.js';

const router = express.Router();

router.get('/', async (req, res) => {
      try {
            const quote = await fetchRandomQuote();

            res.render('index', { quote: quote });

            const newQuote = await storeRandomQuote(quote);
            res.status(200).json(newQuote);
      } catch (error) {
            console.error('Error fetching quote:', error);
            // Fallback to rendering without quote
            res.render('index');
      }
});

router.get('/about', (req, res) => {
      res.render('about');
});

router.get('/project', (req, res) => {
      res.render('project');
});

router.get('/quotes', async (req, res) => {
      // i need to join liked_quotes with quotes to get the quote text
      const { data, error } = await supabase
            .from('liked_quotes')
            .select(`quote:quotes(*)`)
            .eq('userId', req.cookies.user_id);

      res.render('quotes', { savedQuotes: data });
});

export default router;
