import {
  View,
  Text,
  Pressable,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useMemo, useState } from "react";
import CaretLeft from "@/components/icons/CaretLeft";
import { useRouter } from "expo-router";
import { TextInput } from "react-native-gesture-handler";
import EyeOffIcon from "@/components/icons/EyeOff";
import EyeIcon from "@/components/icons/EyesIcon";

const ChangePassword = () => {
  const router = useRouter();
  const [showPassword, toggleShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const getPasswordStrength = (pwd: string) => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    if (score <= 1) return { label: "Weak", color: "text-red-500" };
    if (score === 2) return { label: "Medium", color: "text-orange-500" };
    if (score >= 3) return { label: "Strong", color: "text-green-600" };
    return { label: "", color: "" };
  };

  const passwordStrength = useMemo(
    () => getPasswordStrength(password),
    [password]
  );

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
              Change password
            </Text>
          </Pressable>
          <Text className="text-[#1A2E6C] text-[14px]">Save changes</Text>
        </View>
        <View className="flex flex-col w-[100%] mt-3 px-6">
          <Text className="text-[14px] text-[#344054] font-medium mt-6">
            Current Password
          </Text>
          <View className="border border-[#D6D6D6] mt-3 rounded-lg p-3 flex flex-row justify-between items-center">
            <TextInput
              secureTextEntry={!showPassword}
              value={currentPassword}
              onChangeText={setCurrentPassword}
              textContentType="password"
              placeholder="Enter password"
              placeholderTextColor="#9ca3af"
              className="w-[90%]"
            />
            <TouchableOpacity onPress={() => toggleShowPassword(!showPassword)}>
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex flex-col w-[100%] mt-3 px-6">
          <Text className="text-[14px] text-[#344054] font-medium mt-6">
            New Password
          </Text>
          <View className="border border-[#D6D6D6] mt-3 rounded-lg p-3 flex flex-row justify-between items-center">
            <TextInput
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              textContentType="password"
              placeholder="Enter password"
              placeholderTextColor="#9ca3af"
              className="w-[90%]"
            />
            <TouchableOpacity onPress={() => toggleShowPassword(!showPassword)}>
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </TouchableOpacity>
          </View>
          {password ? (
            <Text
              className={`mt-2 text-[14px] font-semibold ${passwordStrength.color}`}
            >
              Strength: {passwordStrength.label}
            </Text>
          ) : (
            <Text className="text-[#667085] text-[14px] mt-2">
              Password must contain at least 8 characters
            </Text>
          )}
        </View>
        <View className="flex flex-col w-[100%] mt-3 px-6">
          <Text className="text-[14px] text-[#344054] font-medium mt-6">
            Confirm Password
          </Text>
          <View className="border border-[#D6D6D6] mt-3 rounded-lg p-3 flex flex-row justify-between items-center">
            <TextInput
              secureTextEntry={!showPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              textContentType="password"
              placeholder="Enter password again"
              placeholderTextColor="#9ca3af"
              className="w-[90%]"
            />
            <TouchableOpacity onPress={() => toggleShowPassword(!showPassword)}>
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChangePassword;
