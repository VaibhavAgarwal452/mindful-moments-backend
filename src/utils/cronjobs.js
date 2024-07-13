import cron from 'node-cron';
import { Quote } from '../models/quote.model.js';
import { sendNotificationToAllUsers } from './commonFunctions.js';

export const cronjobs = async () => {
    // const users = await User.find({})

    cron.schedule('0 12,17 * * *', async () => {
        const currentQuote = await Quote.aggregate([{ $sample: { size: 1 } }])
        sendNotificationToAllUsers(currentQuote[0].quote)

    });
}