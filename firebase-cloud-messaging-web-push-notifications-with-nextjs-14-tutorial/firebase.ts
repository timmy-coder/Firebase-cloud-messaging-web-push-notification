import { getApp, getApps, initializeApp } from "firebase/app";
import { getMessaging, getToken, isSupported } from "firebase/messaging";

// Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZQB4JRQQq25gK1KxSYpbGpGDL2C2LDCc",
  authDomain: "fcm-demo-946e6.firebaseapp.com",
  projectId: "fcm-demo-946e6",
  storageBucket: "fcm-demo-946e6.appspot.com",
  messagingSenderId: "847585666975",
  appId: "1:847585666975:web:8a87c56ff853b8b8067faa",
  measurementId: "G-6L4RY1R2WW"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const messaging = async () => {
  const supported = await isSupported();
  return supported ? getMessaging(app) : null;
};

export const fetchToken = async () => {
  try {
    const fcmMessaging = await messaging();
    if (fcmMessaging) {
      const token = await getToken(fcmMessaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_FCM_VAPID_KEY,
      });
      return token;
    }
    return null;
  } catch (err) {
    console.error("An error occurred while fetching the token:", err);
    return null;
  }
};

export { app, messaging };
