import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Pressable,
  Image,
} from "react-native";
import CaretLeft from "@/components/icons/CaretLeft";
import { useRouter } from "expo-router";
import { useState } from "react";
import SwipeActionsModal from "@/components/modals/SwipeActionsModal";

const SwipeActions = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [swipeAction, setSwipeAction] = useState<"left" | "right">("right");
  const router = useRouter();

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
              Swipe actions
            </Text>
          </Pressable>
          <Text className="text-[#1A2E6C] text-[14px]">Save</Text>
        </View>
        <View className="py-10 px-3">
          <Pressable
            onPress={() => {
              setSwipeAction("right");
              setModalVisible(true);
            }}
          >
            <Image
              source={require("../../assets/images/swipeToRightHolder.png")}
              className="w-[100%]"
              resizeMode="contain"
            />
          </Pressable>
          <Pressable
            onPress={() => {
              setSwipeAction("left");
              setModalVisible(true);
            }}
          >
            <Image
              source={require("../../assets/images/swipeToLeftHolder.png")}
              className="mt-10 w-[100%]"
              resizeMode="contain"
            />
          </Pressable>
        </View>
      </ScrollView>

      {swipeAction === "left" ? (
        <SwipeActionsModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          swipeAction="left"
        />
      ) : (
        <SwipeActionsModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          swipeAction="right"
        />
      )}
    </SafeAreaView>
  );
};

export default SwipeActions;
