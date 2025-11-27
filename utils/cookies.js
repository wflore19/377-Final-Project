import { v4 as uuidv4 } from "uuid";
import supabase from "../utils/database.js";

async function cookieMiddleware(req, res, next) {
    if (!req.cookies.user_id) {
        const userId = uuidv4();
    
        res.cookie('user_id', userId, { maxAge: 365 * 24 * 60 * 60 * 1000, httpOnly: true });

        // save to database
        const { data, error } = await supabase
            .from('users')
            .insert([
                { id: userId },
            ])
            .select()
    
    } else {
        const userId = req.cookies.user_id;
    }
    next();
}

export default cookieMiddleware;