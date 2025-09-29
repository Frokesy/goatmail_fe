import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  Modal,
  Animated,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import Svg, { Circle } from "react-native-svg";
import MiniTick from "../icons/MiniTick";
import GreyDot from "../icons/GreyDot";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "@/app/context/authContext";

const CIRCLE_SIZE = 36;
const STROKE_WIDTH = 3;
const RADIUS = (CIRCLE_SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const API_URL = "http://192.168.1.117:3000/api/auth";

const EmailAccountCreationStatusModal = ({
  modalVisible,
  setModalVisible,
  email,
  screen,
}: {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  email?: string;
  screen?: string;
}) => {
  const [countdown, setCountdown] = useState(screen === "pricing" ? 3 : 5);
  const [completed, setCompleted] = useState(false);
  const progressAnim = useRef(new Animated.Value(0)).current;
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { login } = useAuth();

  const handlePress = async () => {
    const storedPass = await AsyncStorage.getItem("password");
    try {
      if (!storedPass) {
        alert("No saved password found, please log in again.");
        return;
      }

      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password: storedPass }),
      });

      console.log(email, storedPass);

      const data = await res.json();

      console.log(data.error);

      if (!res.ok) {
        Alert.alert(
          "Error Occured in Account Creation",
          data.error || "Invalid credentials"
        );
        setLoading(false);
        return;
      }

      await login({ email: data.email }, data.token);
      router.replace("/inbox");
      setModalVisible(false);
    } catch (err) {
      console.error("Error going to inbox:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
    if (modalVisible) {
      setCountdown(5);
      setCompleted(false);
      progressAnim.setValue(0);

      Animated.timing(progressAnim, {
        toValue: 1,
        duration: screen === "pricing" ? 3000 : 5000,
        useNativeDriver: false,
      }).start();
    }
  }, [modalVisible, screen]);

  useEffect(() => {
    if (modalVisible && countdown > 0) {
      const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }

    if (countdown === 0) {
      if (screen === "pricing") {
        setCompleted(true);
      } else {
        setModalVisible(false);
        router.push({ pathname: "/pricing", params: { email } });
      }
    }
  }, [countdown, modalVisible, screen]);

  return (
    <Modal
      animationType="slide"
      transparent
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
        <View className="flex-1 bg-black/40" />
      </TouchableWithoutFeedback>

      <Animated.View className="absolute bottom-0 h-[90%] w-full bg-white rounded-t-3xl p-5">
        <SafeAreaView className="flex-1 items-center">
          {!completed && (
            <View className="absolute top-5 right-5">
              <Svg width={CIRCLE_SIZE} height={CIRCLE_SIZE}>
                <Circle
                  stroke="#E5E5E5"
                  fill="none"
                  cx={CIRCLE_SIZE / 2}
                  cy={CIRCLE_SIZE / 2}
                  r={RADIUS}
                  strokeWidth={STROKE_WIDTH}
                />
                <Circle
                  stroke="#3D4294"
                  fill="none"
                  cx={CIRCLE_SIZE / 2}
                  cy={CIRCLE_SIZE / 2}
                  r={RADIUS}
                  strokeWidth={STROKE_WIDTH}
                  strokeDasharray={CIRCUMFERENCE}
                  strokeLinecap="round"
                />
              </Svg>
              <View className="absolute inset-0 items-center justify-center">
                <Text className="text-[#3D4294] font-bold">{countdown}</Text>
              </View>
            </View>
          )}

          <Text className="text-[24px] font-bold mt-20 text-center">
            {screen === "pricing" && completed
              ? "Your account is ready for use"
              : "Email account creation in Progress"}
          </Text>
          <Text className="text-[#A3A3A3] text-[14px] mt-2 text-center">
            {screen === "pricing" && completed
              ? "Let’s take you straight in 🚀"
              : "Give it a minute..."}
          </Text>

          {!completed ? (
            <Image
              source={require("../../assets/images/double-envelope.gif")}
              className="w-[180px] h-[180px]"
            />
          ) : (
            <View className="w-[180px] h-[180px] items-center justify-center"></View>
          )}

          <View className="flex flex-col mt-10 w-[100%]">
            <View className="flex flex-row items-center">
              <MiniTick />
              <Text className="ml-2 text-[14px]">Setting up profile</Text>
            </View>
            <View className="border-l-4 ml-3 border-[#d6d6d6] h-4"></View>
            <View className="flex flex-row items-center">
              {screen === "pricing" && completed ? (
                <MiniTick />
              ) : screen === "pricing" ? (
                <GreyDot color="#3D4294" />
              ) : (
                <GreyDot />
              )}
              <Text
                className={`ml-2 text-[14px] ${
                  screen === "pricing" && !completed
                    ? "text-[#3D4294]"
                    : completed
                    ? "text-black"
                    : "text-[#A3A3A3]"
                }`}
              >
                Choosing pricing plans
              </Text>
            </View>
          </View>

          {screen === "pricing" && completed && (
            <TouchableOpacity
              onPress={handlePress}
              className="mt-auto w-full py-4 bg-[#3D4294] rounded-full"
            >
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text className="text-white font-medium text-[16px]">
                  Go to inbox
                </Text>
              )}
            </TouchableOpacity>
          )}
        </SafeAreaView>
      </Animated.View>
    </Modal>
  );
};

export default EmailAccountCreationStatusModal;
