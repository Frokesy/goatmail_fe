import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import EyeOffIcon from "../components/icons/EyeOff";
import EyeIcon from "../components/icons/EyesIcon";
import { Link } from "expo-router";
import { Checkbox } from "expo-checkbox";

const CreatePassword = () => {
  const [showPassword, toggleShowPassword] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isChecked, setChecked] = useState(false);

  return (
    <SafeAreaView className="mt-[5vh] mx-6 flex flex-col items-center justify-center">
      <Text className="text-[24px] font-bold">Create Password</Text>
      <Text className="text-[#A3A3A3] text-[14px] mt-2 mx-4 text-center">
        Use a strong password with letters, numbers and symbols.
      </Text>

      <View className="flex flex-col w-[100%] mt-3">
        <Text className="text-[14px] text-[#344054] font-medium mt-6">
          Password
        </Text>
        <View className="border border-[#D6D6D6] mt-3 rounded-lg p-3 flex flex-row justify-between items-center">
          <TextInput
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
            textContentType="password"
            className="w-[90%]"
          />
          <TouchableOpacity onPress={() => toggleShowPassword(!showPassword)}>
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </TouchableOpacity>
        </View>

        <TouchableOpacity className="mt-2">
          <Text className="text-[#667085] text-[14px]">
            Password must contain at least 8 characters?
          </Text>
        </TouchableOpacity>
      </View>
      <View className="flex flex-col w-[100%] mt-3">
        <Text className="text-[14px] text-[#344054] font-medium mt-6">
          Confirm Password
        </Text>
        <View className="border border-[#D6D6D6] mt-3 rounded-lg p-3 flex flex-row justify-between items-center">
          <TextInput
            secureTextEntry={!showPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            textContentType="password"
            className="w-[90%]"
          />
          <TouchableOpacity onPress={() => toggleShowPassword(!showPassword)}>
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </TouchableOpacity>
        </View>
      </View>

      <View className="w-[100%] mt-10">
        <TouchableOpacity className="bg-[#3D4294] p-5 rounded-full items-center">
          <Link
            href="/incomingEmailServerType"
            className="text-white font-medium text-[16px]"
          >
            Proceed to setup Server
          </Link>
        </TouchableOpacity>
      </View>
      <View className="mt-6 flex flex-row items-center w-[100%]">
        <Checkbox value={isChecked} onValueChange={setChecked} />
        <View className="ml-3 mr-24">
          <Text className="text-[16px] text-[#404040] font-semibold">
            Terms of use & Privacy Policy
          </Text>
          <Text className="text-[14px] mt-1">
            I have read and agreed to the{" "}
            <Text className="text-[#1A2E6C] font-semibold">User agreement</Text>{" "}
            and{" "}
            <Text className="text-[#1A2E6C] font-semibold">Privacy Policy</Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CreatePassword;
