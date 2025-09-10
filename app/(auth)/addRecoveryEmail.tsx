import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Link } from "expo-router";
import CaretRight from "../components/icons/CaretRight";
import CaretLeft from "../components/icons/CaretLeft";

const AddRecoveryEmail = () => {
  return (
    <SafeAreaView className="mt-[10vh] mx-6">
      <View className="flex flex-row justify-between items-center">
        <View>
          <CaretLeft />
        </View>
        <Link href="/addRecoveryEmail">
          <View className="flex flex-row justify-end items-center">
            <Text className="mr-3">Skip</Text>
            <CaretRight />
          </View>
        </Link>
      </View>
      <View className="flex flex-col mt-[3vh] items-center justify-center">
        <Text className="text-[24px] font-bold">Add recovery mail</Text>
        <Text className="text-[#A3A3A3] text-[14px] mt-2 text-center">
          Use an email address we can contact you to send recovery instructions
          if you get locked out of your account.
        </Text>
        <View className="flex flex-col w-[100%] mt-3">
          <Text className="text-[14px] text-[#344054] font-medium mt-6">
            Recovery email
          </Text>
          <TextInput
            className="border border-[#D6D6D6] mt-3 p-3 rounded-lg"
            inputMode="email"
          />
        </View>
        <View className="w-[100%] mt-10">
          <TouchableOpacity className="bg-[#3D4294] p-5 rounded-full items-center">
            <Link
              href="/confirmEmailAddress"
              className="text-white font-medium text-[16px]"
            >
              Proceed to setup Server
            </Link>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddRecoveryEmail;
