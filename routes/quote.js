import express from 'express';
import supabase from '../utils/database.js';

const quotesRouter = express.Router();

quotesRouter.post('/like', async (req, res) => {
      const userId = req.cookies.user_id;

      const { quoteId } = req.body;

      try {
            // 1. CHECK if the quote is already liked by the user
            const { data: existingLike, error: selectError } = await supabase
                  .from('liked_quotes')
                  .select()
                  .eq('quoteId', quoteId)
                  .eq('userId', userId)
                  .single();

            // 2. QUOTE ALREADY LIKED
            if (existingLike) {
                  return res
                        .status(200)
                        .json({
                              message: 'Quote already liked',
                              success: false,
                        });
            }

            // 3. INSERT the new like record
            const { data: newLike, error: insertError } = await supabase
                  .from('liked_quotes')
                  .insert([{ userId: userId, quoteId: quoteId }])
                  .select();

            // 4. SUCCESS RESPONSE
            return res
                  .status(201)
                  .json({
                        message: 'Quote liked successfully',
                        newLike: newLike,
                        success: true,
                  });
      } catch (e) {
            // Catch any unexpected runtime errors
            console.error('Unexpected error in like handler:', e);
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

            return res
                  .status(201)
                  .json({
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
