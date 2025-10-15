import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Pressable,
  Animated,
  Easing,
  TouchableOpacity,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import CaretLeft from "@/components/icons/CaretLeft";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PushNotifications = () => {
  const router = useRouter();
  const [isPushNotificationsEnabled, togglePushNotifications] = useState(false);
  const [isTrackerNotificationsEnabled, toggleTrackerNotifications] =
    useState(false);
  const translatePushX = useRef(new Animated.Value(0)).current;
  const translateTrackerX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem("pushNotificationsEnabled");
      if (saved !== null) {
        const parsed = JSON.parse(saved);
        togglePushNotifications(parsed);
        translatePushX.setValue(parsed ? 24 : 0);
      }
    })();
  }, [translatePushX, isPushNotificationsEnabled]);

  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem("trackerNotificationsEnabled");
      if (saved !== null) {
        const parsed = JSON.parse(saved);
        toggleTrackerNotifications(parsed);
        translateTrackerX.setValue(parsed ? 24 : 0);
      }
    })();
  }, [translateTrackerX, isTrackerNotificationsEnabled]);

  const toggleSwitch = async () => {
    const newValue = !isPushNotificationsEnabled;
    togglePushNotifications(newValue);
    await AsyncStorage.setItem(
      "pushNotificationsEnabled",
      JSON.stringify(newValue)
    );

    Animated.timing(translatePushX, {
      toValue: newValue ? 24 : 0,
      duration: 180,
      easing: Easing.out(Easing.circle),
      useNativeDriver: false,
    }).start();
  };

  const toggleTrackerSwitch = async () => {
    const newValue = !isTrackerNotificationsEnabled;
    toggleTrackerNotifications(newValue);
    await AsyncStorage.setItem(
      "trackerNotificationsEnabled",
      JSON.stringify(newValue)
    );

    Animated.timing(translateTrackerX, {
      toValue: newValue ? 24 : 0,
      duration: 180,
      easing: Easing.out(Easing.circle),
      useNativeDriver: false,
    }).start();
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView>
        <Pressable
          onPress={() => router.back()}
          className="pt-10 pb-6 px-4 border-b flex flex-row items-center border-[#E4E4E7]"
        >
          <CaretLeft />
          <Text className="text-[18px] font-semibold ml-4">
            Push Notifications
          </Text>
        </Pressable>

        <View className="px-6 pt-10 pb-4 flex-row items-center justify-between border-b border-[#E4E4E7]">
          <View className="flex-1 pr-4">
            <Text className="text-[16px] font-semibold">
              Push notifications.
            </Text>
            <Text className="text-[14px] text-[#737373] mt-2">
              Get notified of received mails.
            </Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={toggleSwitch}
            className="w-12 h-6 rounded-full"
            style={{
              backgroundColor: isPushNotificationsEnabled
                ? "#1A2E6C"
                : "#D4D4D8",
              justifyContent: "center",
              padding: 2,
            }}
          >
            <Animated.View
              style={{
                width: 20,
                height: 20,
                borderRadius: 10,
                backgroundColor: "white",
                transform: [{ translateX: translatePushX }],
                shadowColor: "#000",
                shadowOpacity: 0.2,
                shadowRadius: 2,
              }}
            />
          </TouchableOpacity>
        </View>

        <View className="px-6 pt-10 pb-4 flex-row items-center justify-between border-b border-[#E4E4E7]">
          <View className="flex-1 pr-4">
            <Text className="text-[16px] font-semibold">
              Tracker notifications.
            </Text>
            <Text className="text-[14px] text-[#737373] mt-2">
              Get notified of tracked mails.
            </Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={toggleTrackerSwitch}
            className="w-12 h-6 rounded-full"
            style={{
              backgroundColor: isTrackerNotificationsEnabled
                ? "#1A2E6C"
                : "#D4D4D8",
              justifyContent: "center",
              padding: 2,
            }}
          >
            <Animated.View
              style={{
                width: 20,
                height: 20,
                borderRadius: 10,
                backgroundColor: "white",
                transform: [{ translateX: translateTrackerX }],
                shadowColor: "#000",
                shadowOpacity: 0.2,
                shadowRadius: 2,
              }}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PushNotifications;
