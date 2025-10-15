import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Pressable,
  TextInput,
} from "react-native";
import React from "react";
import CaretLeft from "@/components/icons/CaretLeft";
import { useRouter } from "expo-router";
import ArrowRight from "@/components/icons/ArrowRight";

const UpdateAccountInformation = () => {
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
              Account settings
            </Text>
          </Pressable>
          <Text className="text-[#1A2E6C] text-[14px]">Save changes</Text>
        </View>
        <View className="py-10 px-6">
          <Text className="text-[16px] mb-4 border-b border-[#E4E4E7] pb-3">
            Account information
          </Text>

          <View className="flex flex-col w-[100%] mt-3">
            <Text className="text-[14px] text-[#344054] font-semibold">
              First Name
            </Text>
            <TextInput
              placeholder="John"
              placeholderTextColor="#9ca3af"
              className="border border-[#D6D6D6] mt-2 p-3 rounded-lg"
            />
          </View>
          <View className="flex flex-col w-[100%] mt-6">
            <Text className="text-[14px] text-[#344054] font-semibold">
              Last Name
            </Text>
            <TextInput
              placeholder="Doe"
              placeholderTextColor="#9ca3af"
              className="border border-[#D6D6D6] mt-2 p-3 rounded-lg"
            />
          </View>
          <View className="flex flex-col w-[100%] mt-6">
            <Text className="text-[14px] text-[#344054] font-semibold">
              Mobile signature
            </Text>
            <TextInput
              placeholder="John Doe"
              placeholderTextColor="#9ca3af"
              className="border border-[#D6D6D6] mt-2 p-3 rounded-lg"
            />
          </View>

          <View className="mt-10">
            <Text className="text-[16px] font-semibold mb-4">Security</Text>
            <Pressable
              onPress={() => router.push("/settings/changePassword")}
              className="border-y border-[#E4E4E7] py-3 flex items-center flex-row justify-between"
            >
              <Text className="text-[14px] text-[#333333]">
                Change password
              </Text>
              <ArrowRight />
            </Pressable>
            <Pressable
              onPress={() => router.push("/settings/updateRecoveryEmail")}
              className="border-b border-[#E4E4E7] py-3 flex items-center flex-row justify-between"
            >
              <Text className="text-[14px] text-[#333333]">Recovery email</Text>
              <ArrowRight />
            </Pressable>
            <Pressable
              onPress={() => router.push("/settings/update2FAStatus")}
              className="border-b border-[#E4E4E7] py-3 flex items-center flex-row justify-between"
            >
              <Text className="text-[14px] text-[#333333]">
                Enable Two-factor authentication
              </Text>
              <ArrowRight />
            </Pressable>
            <View className="border-b border-[#E4E4E7] py-3 flex items-center flex-row justify-between">
              <Text className="text-[14px] text-[#333333]">Sign out</Text>
              <ArrowRight />
            </View>
            <View className="border-b border-[#E4E4E7] py-3 flex items-center flex-row justify-between">
              <Text className="text-[14px] text-[#333333]">Delete account</Text>
              <ArrowRight />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UpdateAccountInformation;
