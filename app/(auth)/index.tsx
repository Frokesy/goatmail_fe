import {
  ActivityIndicator,
  Image,
  Keyboard,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Alert,
} from "react-native";
import EyeIcon from "../components/icons/EyesIcon";
import EyeOffIcon from "../components/icons/EyeOff";
import { useState } from "react";
import { Link, useRouter } from "expo-router";
import { useAuth } from "../context/authContext";

const API_URL = "http://192.168.1.117:3000/api/auth";

export default function Login() {
  const [showPassword, toggleShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Missing fields", "Please enter email and password");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        Alert.alert("Login Failed", data.error || "Invalid credentials");
        setLoading(false);
        return;
      }

      login({ email: data.email, userId: data.userId }, data.token);
      router.push("/dashboard");
    } catch (err) {
      Alert.alert("Error", "Something went wrong. Try again.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

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
            value={email}
            onChangeText={setEmail}
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
              value={password}
              onChangeText={setPassword}
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
          <TouchableOpacity
            disabled={loading}
            className={`p-5 rounded-full items-center ${
              loading ? "bg-gray-400" : "bg-[#3D4294]"
            }`}
            onPress={handleLogin}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text className="text-white font-medium text-[16px]">Login</Text>
            )}
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
