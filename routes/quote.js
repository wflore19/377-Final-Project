import express from 'express';
import supabase from '../utils/database.js';
import {
      isQuoteLikedByUser,
      removeLikedQuote,
      storeLikedQuote,
} from '../utils/queries.js';

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
            if (!likedQuote)
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
            console.log(error);
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
            const data = await removeLikedQuote(userId, quoteId);

            return res.status(201).json({
                  unlikedQuote: data,
                  error: null,
            });
      } catch (error) {
            return res.status(500).json({
                  unlikedQuote: null,
                  error: 'Internal Server Error',
            });
      }
});

export default quotesRouter;
