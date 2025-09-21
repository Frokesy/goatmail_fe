import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { Link } from "expo-router";
import CaretRight from "../components/icons/CaretRight";
import CaretLeft from "../components/icons/CaretLeft";
import EmailAccountCreationStatusModal from "../components/modals/EmailAccountCreationStatusModal";
import { useSearchParams } from "expo-router/build/hooks";

const API_URL = "http://192.168.1.117:3000/api/auth";

const AddRecoveryEmail = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const handleSaveRecoveryEmail = async () => {
    setError("");
    if (!recoveryEmail.includes("@") || !recoveryEmail.includes(".")) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/recovery-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, recoveryEmail }),
      });

      const data = await res.json();
      if (!res.ok)
        throw new Error(data.error || "Failed to save recovery email");

      setModalVisible(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const handleSkip = () => {
    setModalVisible(true);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView className="mt-[10vh] mx-6">
        <View className="flex flex-row justify-between items-center">
          <Link href={`/twoFA?email=${email}`}>
            <CaretLeft />
          </Link>

          <Pressable onPress={handleSkip}>
            <View className="flex flex-row justify-end items-center">
              <Text className="mr-3">Skip</Text>
              <CaretRight />
            </View>
          </Pressable>
        </View>

        <View className="flex flex-col mt-[3vh] items-center justify-center">
          <Text className="text-[24px] font-bold">Add recovery mail</Text>
          <Text className="text-[#A3A3A3] text-[14px] mt-2 text-center">
            Use an email address we can contact you to send recovery
            instructions if you get locked out of your account.
          </Text>

          <View className="flex flex-col w-[100%] mt-3">
            <Text className="text-[14px] text-[#344054] font-medium mt-6">
              Recovery email
            </Text>
            <TextInput
              className="border border-[#D6D6D6] mt-3 p-3 rounded-lg"
              inputMode="email"
              value={recoveryEmail}
              onChangeText={setRecoveryEmail}
              placeholder="you@example.com"
              autoCapitalize="none"
            />
            {error ? (
              <Text className="text-red-500 text-[14px] mt-2">{error}</Text>
            ) : null}
          </View>

          <Pressable
            onPress={handleSaveRecoveryEmail}
            className="text-white text-center font-medium text-[16px] bg-[#3D4294] p-5 w-[100%] mt-20 rounded-full items-center"
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="text-white font-medium text-[16px]">
                Proceed to server Setup
              </Text>
            )}
          </Pressable>
        </View>

        <EmailAccountCreationStatusModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          email={email}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default AddRecoveryEmail;
