import { Stack } from "expo-router";
import { StripeProvider } from "@stripe/stripe-react-native";

export default function AuthLayout() {
  return (
    <StripeProvider publishableKey="pk_test_51S9epkB46SXNQSOYlwkQuSGqh5BdzQhuDTxOpmAjoqzdax7cMFJ1ORHGSnxIOveHHroyNDoEXKxmUg6MTSLo4one00tCy6UULr">
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
    </StripeProvider>
  );
}
