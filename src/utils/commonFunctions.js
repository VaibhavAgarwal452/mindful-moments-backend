import { Expo } from "expo-server-sdk";
import { User } from '../models/user.model.js';

const expo = new Expo()

export const sendNotificationToAllUsers = async (quote) => {
    const users = await User.find({})
    users.forEach(async (user) => {
        if (Expo.isExpoPushToken(user.expoPushToken)) {
            let reciets = await expo.sendPushNotificationsAsync([
                {
                    to: user.expoPushToken,
                    title: "Mindful-moments",
                    body: quote,
                },
            ])

        }
    })
}