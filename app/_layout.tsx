import { Stack } from "expo-router";
import "./globals.css";
import { AuthProvider } from "./context/authContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ContactsProvider } from "./context/contactContext";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <ContactsProvider>
          <GestureHandlerRootView>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(auth)" />
              <Stack.Screen name="inbox" options={{ headerShown: false }} />
              <Stack.Screen name="sent" options={{ headerShown: false }} />
              <Stack.Screen name="starred" options={{ headerShown: false }} />
              <Stack.Screen name="archived" options={{ headerShown: false }} />
              <Stack.Screen name="trash" options={{ headerShown: false }} />
              <Stack.Screen name="drafts" options={{ headerShown: false }} />
              <Stack.Screen name="newLabel" options={{ headerShown: false }} />
              <Stack.Screen
                name="settings/accountSettings"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="settings/updateAccountInformation"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="settings/changePassword"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="settings/updateRecoveryEmail"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="settings/swipeActions"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="settings/swipeToNextMessage"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="settings/conversationMode"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="settings/pushNotifications"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="settings/appPreferences"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="/createGroup"
                options={{ headerShown: false }}
              />
            </Stack>
          </GestureHandlerRootView>
        </ContactsProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

export const unstable_settings = {
  initialRouteName: "(auth)",
  preserveStateOnFastRefresh: true,
};
