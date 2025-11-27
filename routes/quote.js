import express from 'express';
import supabase from '../utils/database.js';
import { isQuoteLikedByUser, storeLikedQuote } from '../utils/queries.js';

const quotesRouter = express.Router();

/**
 * Route to like a quote.
 * Expects `quoteId` in the request body.
 * Uses `user_id` from cookies to identify the user.
 */
quotesRouter.post('/like', async (req, res) => {
      const userId = req.cookies.user_id;
      const { quoteId } = req.body;
      try {
            const likedQuote = await isQuoteLikedByUser(userId, quoteId);
            if (likedQuote)
                  return res.status(409).json({
                        newLike: likedQuote,
                        error: 'Quote already liked by user',
                  });

            const newLikedQuote = await storeLikedQuote(userId, quoteId);

            return res.status(201).json({
                  newLike: newLikedQuote,
                  error: null,
            });
      } catch (error) {
            return res.status(500).json({
                  newLike: null,
                  error: 'Internal Server Error',
            });
      }
});

quotesRouter.delete('/unlike', async (req, res) => {
      const userId = req.cookies.user_id;

      const { quoteId } = req.body;

      try {
            // DELETE the like record
            const { data, error } = await supabase
                  .from('liked_quotes')
                  .delete()
                  .eq('quoteId', quoteId)
                  .eq('userId', userId);

            return res.status(201).json({
                  message: 'Quote unliked successfully',
                  data: data,
                  success: true,
            });
      } catch (error) {
            console.error('Error unliking quote:', error);
            return res.status(500).json({ message: 'Error unliking quote' });
      }
});

export default quotesRouter;
