import { Stack } from "expo-router";
import "./globals.css";
import { AuthProvider } from "./context/authContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
      </Stack>
    </AuthProvider>
  );
}
