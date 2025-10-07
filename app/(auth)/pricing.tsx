import {
  View,
  Text,
  Pressable,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import PricingCard from "../../components/cards/PricingCard";
import { useSearchParams } from "expo-router/build/hooks";
import EmailAccountCreationStatusModal from "../../components/modals/EmailAccountCreationStatusModal";
import {
  initPaymentSheet,
  presentPaymentSheet,
} from "@stripe/stripe-react-native";

const apiUrl =
  "http://ec2-13-60-67-114.eu-north-1.compute.amazonaws.com:3000/api";
const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly"
  );
  const [loadingPlan, setLoadingPlan] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [plans, setPlans] = useState<any | null>(null);
  const [fetching, setFetching] = useState(true);

  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "ayanfeoluwaakindele24@gmail.com";

  const handleSubscribe = async (plan: any) => {
    if (!email) {
      Alert.alert("Error", "User email not found.");
      return;
    }
    try {
      setLoadingPlan(plan.title);

      if (plan.title === "Free Plan") {
        await fetch(`${apiUrl}/auth/subscribe`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            plan: plan.title,
            billingCycle,
            cost: plan.cost,
          }),
        });
        setModalVisible(true);
        return;
      }

      const res = await fetch(`${apiUrl}/auth/payment-sheet`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId: plan.priceId, email }),
      });

      const { paymentIntentClientSecret, ephemeralKey, customer } =
        await res.json();

      const { error: initError } = await initPaymentSheet({
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret,
        merchantDisplayName: "Goatmail",
      });

      if (initError) {
        Alert.alert("Init error", initError.message);
        return;
      }

      const { error: presentError } = await presentPaymentSheet();

      if (presentError) {
        Alert.alert("Payment failed", presentError.message);
      } else {
        await fetch(`${apiUrl}/auth/subscribe`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            plan: plan.title,
            billingCycle,
            cost: plan.cost,
          }),
        });

        setModalVisible(true);
      }
    } catch (err: any) {
      Alert.alert("Error", err.message);
    } finally {
      setLoadingPlan("");
    }
  };

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch(`${apiUrl}/auth/plans`);
        const data = await response.json();
        setPlans(data);
      } catch (err) {
        console.error("Error fetching plans:", err);
        Alert.alert("Error", "Could not load pricing plans");
      } finally {
        setFetching(false);
      }
    };

    fetchPlans();
  }, []);

  return (
    <ScrollView className="pt-[5vh]">
      <Text className="text-[24px] mx-6 font-semibold text-center">
        Pricing plans
      </Text>
      <Text className="text-[#A3A3A3] text-[14px] mt-2 mx-10 text-center">
        Enjoy the simple, transparent pricing plans that Goatmail offers.
      </Text>

      <View className="flex flex-row bg-gray-200 px-6 py-2 mt-10 rounded-lg mx-6">
        <Pressable
          className={`p-3 rounded-lg flex-1 items-center ${
            billingCycle === "monthly" ? "bg-white" : ""
          }`}
          onPress={() => setBillingCycle("monthly")}
        >
          <Text
            className={
              billingCycle === "monthly" ? "text-[#3D4294]" : "text-[#667085]"
            }
          >
            Monthly Billing
          </Text>
        </Pressable>

        <Pressable
          className={`p-3 rounded-lg flex-1 items-center ${
            billingCycle === "yearly" ? "bg-white" : ""
          }`}
          onPress={() => setBillingCycle("yearly")}
        >
          <Text
            className={
              billingCycle === "yearly" ? "text-[#3D4294]" : "text-[#667085]"
            }
          >
            Yearly Billing
          </Text>
        </Pressable>
      </View>

      <View className="mt-2 mx-6">
        {fetching ? (
          <ActivityIndicator size="large" color="#3D4294" />
        ) : (
          plans &&
          plans[billingCycle]?.map((plan: any, idx: number) => (
            <PricingCard
              key={idx}
              {...plan}
              onPress={() => handleSubscribe(plan)}
              loading={loadingPlan === plan.title}
            />
          ))
        )}
      </View>

      <EmailAccountCreationStatusModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        email={email}
        screen="pricing"
      />
    </ScrollView>
  );
};

export default Pricing;
