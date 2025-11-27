import express from 'express';
import supabase from '../utils/database.js';

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
            const { data: existingLike, error: selectError } = await supabase
                  .from('liked_quotes')
                  .select()
                  .eq('quoteId', quoteId)
                  .eq('userId', userId)
                  .single();

            if (existingLike) return res.status(409);

            const { data: newLike, error: insertError } = await supabase
                  .from('liked_quotes')
                  .insert([{ userId: userId, quoteId: quoteId }])
                  .select()
                  .single();

            return res.status(201).json({
                  message: 'Quote liked successfully',
                  newLike: newLike,
            });
      } catch (error) {
            console.error('Unexpected error in like handler:', error);
            return res.status(500).json({
                  error: 'Internal Server Error',
                  details: 'An unexpected error occurred.',
                  success: false,
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
