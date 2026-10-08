import {
  focusManager,
  onlineManager,
  QueryClient,
} from "@tanstack/react-query";
import * as Network from "expo-network";
import { AppState, Platform } from "react-native";
import { ApiError } from "./client";

onlineManager.setEventListener((setOnline) => {
  const sub = Network.addNetworkStateListener((state) => {
    setOnline(!!state.isConnected);
  });

  return () => sub.remove();
});

if (Platform.OS != "web") {
  AppState.addEventListener("change", (status) => {
    focusManager.setFocused(status === "active");
  });
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000, // data counts as fresh for 1 min, so no refetch on every mount
      retry: (failureCount, error) => {
        // don't retry 4xx (bad request, 401, 404); retrying won't fix them
        if (
          error instanceof ApiError &&
          error.status >= 400 &&
          error.status < 500
        ) {
          return false;
        }
        return failureCount < 2;
      },
    },
    mutations: {
      retry: false, // retrying a POST can create duplicates
    },
  },
});
