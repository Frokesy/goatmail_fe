import { Stack } from "expo-router";
import "./globals.css";
import { AuthProvider } from "./context/authContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="inbox" options={{ headerShown: false }} />
      </Stack>
    </AuthProvider>
  );
}

export const unstable_settings = {
  initialRouteName: "(auth)",
  preserveStateOnFastRefresh: true,
};
