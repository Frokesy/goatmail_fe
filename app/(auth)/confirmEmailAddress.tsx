import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { useSearchParams } from "expo-router/build/hooks";

const API_URL = "http://192.168.1.117:3000/api/auth";

const ConfirmEmailAddress = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const router = useRouter();

  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [counter, setCounter] = useState(59);
  const [resending, setResending] = useState(false);

  const inputs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    if (counter > 0) {
      const timer = setTimeout(() => setCounter(counter - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [counter]);

  const handleChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < inputs.current.length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && code[index] === "") {
      if (index > 0) {
        inputs.current[index - 1]?.focus();

        const newCode = [...code];
        newCode[index - 1] = "";
        setCode(newCode);
      }
    }
  };

  const handleVerify = async () => {
    const otp = code.join("");
    if (otp.length < 6) {
      setError("Please enter all 6 digits");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_URL}/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (!res.ok) setError(data.error || "OTP verification failed");
      else {
        Alert.alert("Success", "Email verified successfully!");
        router.push({
          pathname: "/createPassword",
          params: { email },
        });
      }
    } catch (err) {
      setError(`Network error. Please try again. ${err}`);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  const handleResend = async () => {
    setResending(true);
    try {
      const res = await fetch(`${API_URL}/resend-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) setError(data.error || "Failed to resend OTP");
      else {
        Alert.alert("Success", "A new OTP has been sent to your email.");
        setCounter(59);
      }
    } catch (err) {
      setError(`Network error. Please try again. ${err}`);
      console.log(err);
    } finally {
      setResending(false);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView className="mt-[5vh] mx-6 flex flex-col items-center justify-center">
        <Text className="text-[24px] font-bold">Confirm email address</Text>
        <Text className="text-[#A3A3A3] text-[14px] mt-2 mx-4 text-center">
          Your provided email needs to be verified to complete your profile. A
          6-digit code has been sent to your provided email address.
        </Text>

        <View className="flex flex-col w-[100%] mt-3">
          <Text className="text-[14px] text-[#344054] font-medium mt-6">
            Secure code
          </Text>
          <View className="flex flex-row mt-3 justify-between items-center">
            {code.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => {
                  inputs.current[index] = ref;
                }}
                className="border border-[#D6D6D6] p-3 w-[13%] rounded-lg text-center text-[18px]"
                keyboardType="number-pad"
                maxLength={1}
                value={digit}
                onChangeText={(text) => handleChange(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                editable={!loading}
              />
            ))}
          </View>

          {error ? (
            <Text className="text-red-500 text-[14px] mt-2">{error}</Text>
          ) : null}

          <TouchableOpacity
            className="mt-2"
            disabled={counter > 0 || resending}
            onPress={handleResend}
          >
            <Text
              className={`text-[14px] ${
                counter > 0 ? "text-gray-400" : "text-[#6941C6]"
              }`}
            >
              {counter > 0
                ? `Didn't receive code? Try again in 00:${
                    counter < 10 ? `0${counter}` : counter
                  }`
                : resending
                ? "Resending..."
                : "Didn't receive code? Resend OTP"}
            </Text>
          </TouchableOpacity>

          <View className="w-[100%] mt-10">
            <TouchableOpacity
              className={`p-5 rounded-full items-center ${
                loading ? "bg-gray-400" : "bg-[#3D4294]"
              }`}
              onPress={handleVerify}
              disabled={loading}
            >
              <Text className="text-white font-medium text-[16px]">
                {loading ? "Verifying..." : "Proceed to setup Password"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default ConfirmEmailAddress;
