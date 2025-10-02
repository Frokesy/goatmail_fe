import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import { Link, useRouter } from "expo-router";
const API_URL = "https://goatmailbe-production.up.railway.app/api/auth/signup";

const Signup = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSignup = async () => {
    if (!email || !name) {
      setError("All fields are required");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to signup. Try again.");
      } else {
        setSuccess(true);
        router.push({
          pathname: "/confirmEmailAddress",
          params: { email },
        });
      }
    } catch (err) {
      console.log(err);
      setError("Network error. Please try again.");
    } finally {
      setTimeout(() => {
        setError("");
      }, 3000);
      setLoading(false);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView className="mt-[10vh] mx-6 flex flex-col items-center justify-center">
        <Image source={require("../../assets/images/icon.png")} />
        <Text className="text-[24px] font-bold">
          Setup your Goatmail account
        </Text>
        <Text className="text-[#A3A3A3] text-[14px] mt-2">
          Open an account with us using an existing email address.
        </Text>
        <View className="flex flex-col w-[100%] mt-3">
          <Text className="text-[14px] text-[#344054] font-medium mt-6">
            Full Name
          </Text>
          <TextInput
            value={name}
            onChangeText={(text) => setName(text)}
            className="border border-[#D6D6D6] mt-3 p-3 rounded-lg"
          />
        </View>
        <View className="flex flex-col w-[100%] mt-3">
          <Text className="text-[14px] text-[#344054] font-medium mt-3">
            Email address
          </Text>
          <TextInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            className="border border-[#D6D6D6] mt-3 p-3 rounded-lg"
            inputMode="email"
          />
          {error ? <Text className="text-red-500 mt-2">{error}</Text> : null}
          {success ? (
            <Text className="text-green-500 mt-2">
              OTP sent! Check your email.
            </Text>
          ) : null}
        </View>
        <View className="w-[100%] mt-10">
          <TouchableOpacity
            onPress={handleSignup}
            disabled={loading}
            className="bg-[#3D4294] p-5 rounded-full items-center"
          >
            <Text className="text-white font-medium text-[16px]">
              {loading ? "Sending OTP..." : "Proceed to setup Server"}
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
    </TouchableWithoutFeedback>
  );
};

export default Signup;
