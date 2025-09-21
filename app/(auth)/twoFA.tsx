import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  Pressable,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import CaretRight from "../components/icons/CaretRight";
import CopyIcon from "../components/icons/CopyIcon";
import { Link } from "expo-router";
import SuccessModal from "../components/modals/SuccessModal";
import CircledTick from "../../assets/images/circledtick.png";
import { useSearchParams } from "expo-router/build/hooks";
import * as Clipboard from "expo-clipboard";

const API_URL = "http://192.168.1.117:3000/api/auth";

const TwoFA = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [modalVisible, setModalVisible] = useState(false);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [secretKey, setSecretKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState("");

  const inputs = useRef<(TextInput | null)[]>([]);
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  useEffect(() => {
    const fetch2FASetup = async () => {
      try {
        const res = await fetch(`${API_URL}/2fa/setup?email=${email}`);
        const data = await res.json();
        if (res.ok) {
          setQrCode(data.qrCode);
          setSecretKey(data.secret);
        } else {
          setError(data.error || "Failed to load 2FA setup");
        }
      } catch (err) {
        setError("Network error");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetch2FASetup();
  }, [email]);

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
    setVerifying(true);
    setError("");
    try {
      const token = code.join("");
      const res = await fetch(`${API_URL}/2fa/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, token }),
      });
      const data = await res.json();

      if (!res.ok) setError(data.error || "Invalid code");
      else setModalVisible(true);
    } catch (err) {
      setError("Network error");
      console.log(err);
    } finally {
      setVerifying(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#3D4294" />
      </SafeAreaView>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView className="mt-[10vh] mx-6">
        <Pressable className="flex flex-row justify-end">
          <Link href="/addRecoveryEmail">
            <View className="flex flex-row justify-end items-center">
              <Text className="mr-3">Skip</Text>
              <CaretRight />
            </View>
          </Link>
        </Pressable>

        <View className="flex flex-col mt-[3vh] items-center justify-center">
          <Text className="text-[24px] font-bold">Secure your account</Text>
          <Text className="text-[#A3A3A3] text-[14px] mt-2 mb-6 mx-4 text-center">
            Set up two-factor authentication for enhanced security.
          </Text>

          {qrCode && (
            <Image
              source={{ uri: qrCode }}
              style={{ width: 164, height: 164 }}
              className="mb-4"
            />
          )}

          <Text className="text-[#A3A3A3] text-[14px] mt-2 mx-4 text-center">
            Scan this QR code with your authenticator app (Google Authenticator,
            Authy, etc.)
          </Text>

          <Text className="text-[#A3A3A3] text-[14px] mt-4 text-center">
            OR
          </Text>

          <Text className="text-[#A3A3A3] text-[14px] mt-4 mx-4 text-center">
            Add this secret key to your authenticator app:
          </Text>

          {secretKey && (
            <View className="w-[100%] mt-4 flex flex-row justify-between items-center">
              <Text className="text-[#333333] font-semibold text-[16px] mr-4">
                {secretKey}
              </Text>
              <Pressable
                className="flex flex-row items-center py-3 px-6 rounded-full bg-[#3D4294]"
                onPress={async () => {
                  await Clipboard.setStringAsync(secretKey);
                  alert("Copied to clipboard!");
                }}
              >
                <Text className="text-white mr-2">Copy</Text>
                <CopyIcon />
              </Pressable>
            </View>
          )}

          <View className="flex flex-col w-[100%] mt-6">
            <Text className="text-[14px] text-[#344054] font-medium mt-2">
              Enter verification code from your app
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
                />
              ))}
            </View>

            {error ? (
              <Text className="text-red-500 text-[14px] mt-2">{error}</Text>
            ) : null}

            <Pressable
              onPress={handleVerify}
              className="text-white text-center font-medium text-[16px] bg-[#3D4294] p-5 w-[100%] mt-6 rounded-full items-center"
              disabled={verifying}
            >
              {verifying ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text className="text-white font-medium text-[16px]">
                  Enable 2FA
                </Text>
              )}
            </Pressable>
          </View>
        </View>

        <SuccessModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          title="Success!"
          message="Two-Factor Authentication is now enabled."
          buttonText="Continue"
          buttonLink={`/addRecoveryEmail?email=${email}`}
          image={CircledTick}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default TwoFA;
