import { Stack } from "expo-router";
import "./globals.css";
import { AuthProvider } from "./context/authContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <GestureHandlerRootView>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="inbox" options={{ headerShown: false }} />
            <Stack.Screen name="sent" options={{ headerShown: false }} />
            <Stack.Screen name="starred" options={{ headerShown: false }} />
            <Stack.Screen name="archived" options={{ headerShown: false }} />
            <Stack.Screen name="trash" options={{ headerShown: false }} />
            <Stack.Screen name="drafts" options={{ headerShown: false }} />
            <Stack.Screen
              name="accountSettings"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="updateAccountInformation"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="changePassword"
              options={{ headerShown: false }}
            />
          </Stack>
        </GestureHandlerRootView>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

export const unstable_settings = {
  initialRouteName: "(auth)",
  preserveStateOnFastRefresh: true,
};
