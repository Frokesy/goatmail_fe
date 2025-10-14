import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Pressable,
  TextInput,
} from "react-native";
import React from "react";
import CaretLeft from "@/components/icons/CaretLeft";
import { useRouter } from "expo-router";

const UpdateRecoveryEmail = () => {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView>
        <View className="pt-10 pb-6 px-4 border-b flex flex-row justify-between border-[#E4E4E7]">
          <Pressable
            onPress={() => router.back()}
            className="flex flex-row items-center"
          >
            <CaretLeft />
            <Text className="text-[18px] font-semibold ml-4">
              Recovery email
            </Text>
          </Pressable>
          <Text className="text-[#1A2E6C] text-[14px]">Save changes</Text>
        </View>
        <View className="flex flex-col w-[100%] mt-3 px-4">
          <Text className="text-[14px] text-[#344054] font-medium mt-6">
            Recovery email
          </Text>
          <TextInput
            className="border border-[#D6D6D6] mt-3 p-3 rounded-lg"
            inputMode="email"
            placeholder="Enter email address"
            placeholderTextColor="#9ca3af"
            autoCapitalize="none"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UpdateRecoveryEmail;
