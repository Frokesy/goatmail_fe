import {
  Image,
  Keyboard,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import EyeIcon from "../components/icons/EyesIcon";
import { useState } from "react";
import EyeOffIcon from "../components/icons/EyeOff";
import { Link } from "expo-router";

export default function Login() {
  const [showPassword, toggleShowPassword] = useState<boolean>(false);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView className="mt-[10vh] mx-6 flex flex-col items-center justify-center">
        <Image source={require("../../assets/images/icon.png")} />
        <Text className="text-[24px] font-bold">Login to your account</Text>
        <Text className="text-[#A3A3A3] text-[14px] mt-2">
          Pickup where you left off and login to your account
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
        <View className="flex flex-col w-[100%] mt-3">
          <Text className="text-[14px] text-[#344054] font-medium mt-6">
            Password
          </Text>
          <View className="border border-[#D6D6D6] mt-3 rounded-lg p-3 flex flex-row justify-between items-center">
            <TextInput
              secureTextEntry={!showPassword}
              textContentType="password"
              className="w-[90%]"
            />
            <TouchableOpacity onPress={() => toggleShowPassword(!showPassword)}>
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </TouchableOpacity>
          </View>

          <TouchableOpacity className="mt-2">
            <Text className="text-[#6941C6] text-[14px]">Forgot password?</Text>
          </TouchableOpacity>
        </View>
        <View className="w-[100%] mt-10">
          <TouchableOpacity className="bg-[#3D4294] p-5 rounded-full items-center">
            <Text className="text-white font-medium text-[16px]">Login</Text>
          </TouchableOpacity>
        </View>
        <View className="mt-6 flex flex-row items-center justify-center border border-[#D6D6D6] p-5 w-[100%] rounded-full">
          <Text className="text-[#1A2E6C] text-[14px]">
            Don&apos;t have an account?
          </Text>
          <TouchableOpacity>
            <Link href="/signup" className="text-[#1A2E6C] text-[14px] ml-1">
              Sign Up
            </Link>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
