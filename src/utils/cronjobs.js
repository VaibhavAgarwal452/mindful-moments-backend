import cron from 'node-cron';
import { Quote } from '../models/quote.model.js';
import { sendNotificationToAllUsers } from './commonFunctions.js';

export const cronjobs = async () => {
    // const users = await User.find({})

    cron.schedule('*/2 * * * *', async () => {
        console.log("it runs")
        const currentQuote = await Quote.aggregate([{ $sample: { size: 1 } }])
        sendNotificationToAllUsers(currentQuote[0].quote)

    });
}