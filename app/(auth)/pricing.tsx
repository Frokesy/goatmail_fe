import { View, Text, Pressable, ScrollView, Alert } from "react-native";
import React, { useState } from "react";
import PricingCard from "../components/cards/PricingCard";
import { useRouter } from "expo-router";
import { useSearchParams } from "expo-router/build/hooks";
import EmailAccountCreationStatusModal from "../components/modals/EmailAccountCreationStatusModal";

const API_URL = "http://192.168.1.117:3000/api/auth";

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly"
  );
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email") || "";

  const pricingPlans = {
    monthly: [
      {
        cost: "$0",
        title: "Free Plan",
        subtext:
          "Send and receive emails with basic tracking and scheduling, perfect for personal use.",
        buttonText: "Use free plan",
        features: ["Basic email tracking", "Scheduling support", "5GB storage"],
      },
      {
        cost: "$20",
        title: "Premium Plan",
        subtext: "Make use of Goatmail features with unlimited access.",
        buttonText: "Start free trial now",
        bgColor: "#3359D2",
        textColor: "#FFFFFF",
        features: [
          "Unlimited storage",
          "Advanced analytics",
          "Team collaboration",
        ],
      },
      {
        cost: "$50",
        title: "Unlimited Plan",
        subtext: "Make use of Goatmail features with unlimited access.",
        buttonText: "Subscribe",
        bgColor: "#EEF0F4",
        textColor: "#000000",
        features: [
          "Unlimited storage",
          "Advanced analytics",
          "Team collaboration",
        ],
      },
    ],
    yearly: [
      {
        cost: "$0",
        title: "Free Plan",
        subtext:
          "Send and receive emails with basic tracking and scheduling, perfect for personal use.",
        buttonText: "Use free plan",
        features: ["Basic email tracking", "Scheduling support", "5GB storage"],
      },
      {
        cost: "$200",
        title: "Premium Plan (Save 20%)",
        subtext:
          "Make use of Goatmail features with unlimited access for a year.",
        buttonText: "Start free trial now",
        bgColor: "#3359D2",
        textColor: "#FFFFFF",
        features: [
          "Unlimited storage",
          "Advanced analytics",
          "Team collaboration",
        ],
      },
      {
        cost: "$500",
        title: "Unlimited Plan (Save 20%)",
        subtext:
          "Make use of Goatmail features with unlimited access for a year.",
        buttonText: "Subscribe",
        bgColor: "#EEF0F4",
        textColor: "#000000",
        features: [
          "Unlimited storage",
          "Advanced analytics",
          "Team collaboration",
        ],
      },
    ],
  };

  const handleSubscribe = async (plan: any) => {
    if (!email) {
      Alert.alert("Error", "User email not found.");
      return;
    }

    try {
      setLoading(true);

      if (plan.title === "Free Plan") {
        await fetch(`${API_URL}/subscribe`, {
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
      } else {
        await new Promise((res) => setTimeout(res, 2000));

        const response = await fetch(`${API_URL}/subscribe`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            plan: plan.title,
            billingCycle,
            cost: plan.cost,
          }),
        });

        if (response.ok) {
          setModalVisible(true);
        } else {
          Alert.alert("Error", "Subscription failed");
        }
      }
    } catch (err) {
      Alert.alert("Error", "Network or server error");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

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
        {pricingPlans[billingCycle].map((plan, idx) => (
          <PricingCard
            key={idx}
            {...plan}
            onPress={() => handleSubscribe(plan)}
            loading={loading}
          />
        ))}
      </View>
      <EmailAccountCreationStatusModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        screen="pricing"
      />
    </ScrollView>
  );
};

export default Pricing;
