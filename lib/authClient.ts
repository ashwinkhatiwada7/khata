import { expoClient } from "@better-auth/expo/client";
import { inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import * as SecureStore from "expo-secure-store";

export const authClient = createAuthClient({
  baseURL: process.env.EXPO_PUBLIC_AUTH_URL, // Base URL of your Better Auth backend.
  plugins: [
    expoClient({
      scheme: "khata",
      storagePrefix: "khata",
      storage: SecureStore,
    }),
    // Mirrors `user.additionalFields` in the backend auth config so
    // signUp.email({ phone }) and session.user.shopName etc. are typed.
    inferAdditionalFields({
      user: {
        shopName: { type: "string", required: false },
        location: { type: "string", required: false },
        phone: { type: "string", required: true },
      },
    }),
  ],
});
