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

export { fetchRandomQuote, storeRandomQuote };
