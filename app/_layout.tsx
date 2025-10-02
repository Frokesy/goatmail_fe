import { Stack } from "expo-router";
import "./globals.css";
import { AuthProvider } from "./context/authContext";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="inbox" options={{ headerShown: false }} />
          <Stack.Screen name="sent" options={{ headerShown: false }} />
          <Stack.Screen name="starred" options={{ headerShown: false }} />
        </Stack>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

export const unstable_settings = {
  initialRouteName: "(auth)",
  preserveStateOnFastRefresh: true,
};
