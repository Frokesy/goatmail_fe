import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Link } from "expo-router";

const Signup = () => {
  return (
    <SafeAreaView className="mt-[10vh] mx-6 flex flex-col items-center justify-center">
      <Image source={require("../../assets/images/icon.png")} />
      <Text className="text-[24px] font-bold">Setup your Goatmail account</Text>
      <Text className="text-[#A3A3A3] text-[14px] mt-2">
        Open an account with us using an existing email address.
      </Text>
      <View className="flex flex-col w-[100%] mt-3">
        <Text className="text-[14px] text-[#344054] font-medium mt-6">
          Email address
        </Text>
        <TextInput
          className="border border-[#D6D6D6] mt-3 p-3 rounded-lg"
          inputMode="email"
        />
      </View>
      <View className="w-[100%] mt-10">
        <TouchableOpacity className="bg-[#3D4294] p-5 rounded-full items-center">
          <Text className="text-white font-medium text-[16px]">
            Proceed to setup Server
          </Text>
        </TouchableOpacity>
      </View>
      <View className="mt-6 flex flex-row items-center justify-center border border-[#D6D6D6] p-5 w-[100%] rounded-full">
        <Text className="text-[#1A2E6C] text-[14px]">
          Already have an account?
        </Text>
        <TouchableOpacity>
          <Link href="/" className="text-[#1A2E6C] text-[14px] ml-1">
            Sign In
          </Link>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Signup;
