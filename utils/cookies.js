import { v4 as uuidv4 } from 'uuid';
import supabase from '../utils/database.js';
import { storeNewUser } from './queries.js';

async function cookieMiddleware(req, res, next) {
      if (!req.cookies.user_id) {
            const userId = uuidv4();
            try {
                  const data = await storeNewUser(userId);

                  res.cookie('user_id', data.id, {
                        maxAge: 365 * 24 * 60 * 60 * 1000,
                        httpOnly: true,
                  });
            } catch (error) {
                  console.error(error);
            }
      }
      next();
}

export default cookieMiddleware;
