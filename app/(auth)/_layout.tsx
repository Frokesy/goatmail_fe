import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="signup"
        options={{
          headerTitle: "",
          headerBackTitle: "Back",
        }}
      />
      <Stack.Screen
        name="confirmEmailAddress"
        options={{
          headerTitle: "",
          headerBackTitle: "Back",
        }}
      />
      <Stack.Screen
        name="createPassword"
        options={{
          headerTitle: "",
          headerBackTitle: "Back",
        }}
      />
      <Stack.Screen
        name="incomingEmailServerType"
        options={{
          headerTitle: "",
          headerBackTitle: "Back",
        }}
      />
      <Stack.Screen
        name="twoFA"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="addRecoveryEmail"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="outgoingEmailServerType"
        options={{
          headerTitle: "",
          headerBackTitle: "Back",
        }}
      />
      <Stack.Screen
        name="pricing"
        options={{
          headerTitle: "",
          headerBackTitle: "Back",
        }}
      />
    </Stack>
  );
}
