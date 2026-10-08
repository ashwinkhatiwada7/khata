import { expoClient } from "@better-auth/expo/client";
import { inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "khata_bt";
export const getToken = () => SecureStore.getItem(TOKEN_KEY);
export const clearToken = () => SecureStore.deleteItemAsync(TOKEN_KEY);
export const authClient = createAuthClient({
  baseURL: process.env.EXPO_PUBLIC_AUTH_URL, // Base URL of your Better Auth backend.
  fetchOptions: {
    onSuccess: (ctx) => {
      const token = ctx.response.headers.get("set-auth-token");
      if (token) {
        SecureStore.setItem(TOKEN_KEY, token);
      }
    },
  },
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
