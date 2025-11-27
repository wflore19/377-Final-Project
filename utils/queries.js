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

      if (error) throw new Error('Failed to store random quote to supabase');
      return data;
}

/**
 * Fetch saved quotes for a specific user from supabase.
 * @param {string} userId - The ID of the user whose saved quotes are to be fetched.
 * @returns {Promise<Array>} An array of saved quote objects.
 */
async function fetchSavedQuotes(userId) {
      const { data, error } = await supabase
            .from('liked_quotes')
            .select(`quote:quotes(*)`)
            .eq('userId', userId);

      if (error) throw new Error('Failed to fetch saved quotes from supabase');
      return data;
}

export { fetchRandomQuote, storeRandomQuote, fetchSavedQuotes };
