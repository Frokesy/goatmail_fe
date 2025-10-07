import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState, useMemo } from "react";
import EyeOffIcon from "../../components/icons/EyeOff";
import EyeIcon from "../../components/icons/EyesIcon";
import { useRouter } from "expo-router";
import { Checkbox } from "expo-checkbox";
import { useSearchParams } from "expo-router/build/hooks";
import AsyncStorage from "@react-native-async-storage/async-storage";

const apiUrl =
  "http://ec2-13-60-67-114.eu-north-1.compute.amazonaws.com:3000/api";

const CreatePassword = () => {
  const [showPassword, toggleShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChecked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email") || "";

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

  const handleSetPassword = async () => {
    setError("");

    if (!password || !confirmPassword) {
      setError("Both password fields are required");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (!isChecked) {
      setError("You must accept the Terms and Privacy Policy");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/auth/set-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) setError(data.error || "Failed to set password");
      else {
        await AsyncStorage.setItem("password", password);
        Alert.alert("Success", "Password set successfully!");
        router.push({
          pathname: "/incomingEmailServerType",
          params: { email },
        });
      }
    } catch (err) {
      setError("Network error");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
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
              editable={!loading}
            />
            <TouchableOpacity
              onPress={() => toggleShowPassword(!showPassword)}
              disabled={loading}
            >
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
              editable={!loading}
            />
            <TouchableOpacity
              onPress={() => toggleShowPassword(!showPassword)}
              disabled={loading}
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </TouchableOpacity>
          </View>
        </View>

        {error ? <Text className="text-red-500 mt-3">{error}</Text> : null}

        <View className="mt-6 flex flex-row items-center w-[100%]">
          <Checkbox
            value={isChecked}
            onValueChange={setChecked}
            disabled={loading}
          />
          <View className="ml-3 mr-24">
            <Text className="text-[16px] text-[#404040] font-semibold">
              Terms of use & Privacy Policy
            </Text>
            <Text className="text-[14px] mt-1">
              I have read and agreed to the{" "}
              <Text className="text-[#1A2E6C] font-semibold">
                User agreement
              </Text>{" "}
              and{" "}
              <Text className="text-[#1A2E6C] font-semibold">
                Privacy Policy
              </Text>
            </Text>
          </View>
        </View>

        <View className="w-[100%] mt-10">
          <TouchableOpacity
            className={`p-5 rounded-full items-center ${
              loading ? "bg-gray-400" : "bg-[#3D4294]"
            }`}
            onPress={handleSetPassword}
            disabled={loading}
          >
            <Text className="text-white font-medium text-[16px]">
              {loading ? "Setting Password..." : "Proceed to setup Server"}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default CreatePassword;
