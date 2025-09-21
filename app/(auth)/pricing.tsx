import {
  View,
  Text,
  Pressable,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React from "react";
import PricingCard from "../components/cards/PricingCard";

const Pricing = () => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ScrollView className="pt-[5vh]">
        <Text className="text-[24px] mx-6 font-semibold text-center">
          Pricing plans
        </Text>
        <Text className="text-[#A3A3A3] text-[14px] mt-2 mx-10 text-center">
          Enjoy the simple, transparent pricing plans that Goatmail offers.
        </Text>

        <View className="flex flex-row bg-gray-200 px-6 py-2 mt-10">
          <Pressable className="bg-white p-3 rounded-lg flex-1 items-center">
            <Text className="text-[#3D4294] font-medium">Monthly Billing</Text>
          </Pressable>
          <Pressable className="p-3 rounded-lg flex-1 items-center">
            <Text className="text-[#667085] font-medium">Yearly Billing</Text>
          </Pressable>
        </View>

        <View className="mt-2 mx-6">
          <PricingCard
            cost="$0"
            title="Free Plan"
            subtext="Send and receive emails with basic tracking and scheduling, perfect for personal use."
            buttonText="Use free plan"
            features={[
              "Basic email tracking",
              "Scheduling support",
              "5GB storage",
            ]}
          />

          <PricingCard
            cost="$20"
            title="Premium Plan"
            subtext="Make use of Goatmail features with unlimited access."
            buttonText="Start free trial now"
            bgColor="#3359D2"
            textColor="#FFFFFF"
            features={[
              "Unlimited storage",
              "Advanced analytics",
              "Team collaboration",
            ]}
          />

          <PricingCard
            cost="$50"
            title="Unlimited Plan"
            subtext="Make use of Goatmail features with unlimited access."
            buttonText="Subscribe"
            bgColor="#EEF0F4"
            textColor="#000000"
            features={[
              "Unlimited storage",
              "Advanced analytics",
              "Team collaboration",
            ]}
          />
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default Pricing;
