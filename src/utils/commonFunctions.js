import { Expo } from "expo-server-sdk";
import { User } from '../models/user.model.js';

const expo = new Expo()

export const sendNotificationToAllUsers = async (quote) => {
    const users = await User.find({})
    users.forEach((user) => {
        if (Expo.isExpoPushToken(user.expoPushToken)) {
            expo.sendPushNotificationsAsync([
                {
                    to: user.expoPushToken,
                    title: "Mindful-moments",
                    body: quote,
                },
            ])

        }
    })
}