import supabase from './database.js';

/**
 * Fetches a random quote from the dummyjson API.
 * @returns {Promise<Object>} An object containing random quote data.
 * @throws Will throw an error if the fetch operation fails.
 */
async function fetchRandomQuote() {
      const response = await fetch('https://dummyjson.com/quotes/random');

      if (!response.ok) throw new Error('Failed to fetch random quote');

      const json = await response.json();
      return json;
}

/**
 * Stores a new user in supabase.
 * @param {string} userId - The ID of the new user.
 * @returns {Promise<Object>} The newly created user record.
 * @throws Will throw an error if the operation fails.
 */
async function storeNewUser(userId) {
      const { data, error } = await supabase
            .from('users')
            .insert([{ id: userId }])
            .select()
            .single();

      if (error) throw new Error(error.message);
      return data;
}

/**
 * Stores random quote from the dummyjson API to supabase.
 * @returns {Promise<Object>} An object containing random quote data.
 * @throws Will throw an error if the operation fails.
 */
async function storeRandomQuote(quoteData) {
      const { data, error } = await supabase
            .from('quotes')
            .insert([
                  {
                        id: quoteData.id,
                        quote: quoteData.quote,
                        author: quoteData.author,
                  },
            ])
            .select()
            .single();

      if (error) throw new Error(error.message);
      return data;
}

/**
 * Fetches saved quotes for a specific user from supabase.
 * @param {string} userId - The ID of the user whose saved quotes are to be fetched.
 * @returns {Promise<Array>} An array of saved quote objects.
 */
async function fetchSavedQuotes(userId) {
      const { data, error } = await supabase
            .from('liked_quotes')
            .select(`quote:quotes(*)`)
            .eq('userId', userId);

      if (error) throw new Error(error.message);
      return data;
}

/**
 * Checks if a quote is already liked by a user.
 * @param {string} userId - The ID of the user.
 * @param {number} quoteId - The ID of the quote.
 * @returns {Promise<boolean>} True if the quote is liked by the user, false otherwise.
 * @throws Will throw an error if the operation fails.
 */
async function isQuoteLikedByUser(userId, quoteId) {
      const { data, error } = await supabase
            .from('liked_quotes')
            .select()
            .eq('userId', userId)
            .eq('quoteId', quoteId);

      if (error) throw new Error(error.message);
      return data;
}

/**
 * Stores a liked quote for a user in supabase.
 * @param {string} userId - The ID of the user.
 * @param {number} quoteId - The ID of the quote.
 * @returns {Promise<Object>} The newly created liked quote record.
 * @throws Will throw an error if the operation fails.
 */
async function storeLikedQuote(userId, quoteId) {
      const { data, error } = await supabase
            .from('liked_quotes')
            .insert([{ userId: userId, quoteId: quoteId }])
            .select()
            .single();

      if (error) throw new Error(error.message);
      return data;
}

/**
 * Remove a liked quote for a user in supabase.
 * @param {string} userId - The ID of the user.
 * @param {number} quoteId - The ID of the quote.
 * @returns {Promise<Object>} The deleted liked quote record.
 * @throws Will throw an error if the operation fails.
 */
async function removeLikedQuote(userId, quoteId) {
      const { data, error } = await supabase
            .from('liked_quotes')
            .delete()
            .eq('userId', userId)
            .eq('quoteId', quoteId)
            .select()
            .single();

      if (error) throw new Error(error.message);
      return data;
}

export {
      fetchRandomQuote,
      storeRandomQuote,
      fetchSavedQuotes,
      isQuoteLikedByUser,
      storeLikedQuote,
      removeLikedQuote,
      storeNewUser,
};
