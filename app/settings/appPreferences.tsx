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

const AppPreferences = () => {
  const router = useRouter();
  const [isEnabled, setIsEnabled] = useState(false);
  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem("appPreferences");
      if (saved !== null) {
        const parsed = JSON.parse(saved);
        setIsEnabled(parsed);
        translateX.setValue(parsed ? 24 : 0);
      }
    })();
  }, [translateX]);

  const toggleSwitch = async () => {
    const newValue = !isEnabled;
    setIsEnabled(newValue);
    await AsyncStorage.setItem("appPreferences", JSON.stringify(newValue));

    Animated.timing(translateX, {
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
            App preferences
          </Text>
        </Pressable>

        <View className="px-6 pt-10 pb-4 flex-row items-center justify-between border-b border-[#E4E4E7]">
          <Text className="text-[16px] font-semibold">Dark mode</Text>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={toggleSwitch}
            className="w-12 h-6 rounded-full"
            style={{
              backgroundColor: isEnabled ? "#1A2E6C" : "#D4D4D8",
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
                transform: [{ translateX }],
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

export default AppPreferences;
