import { Text, ScrollView, View, Image, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/defaults/Header";
import PenIcon from "@/components/icons/PenIcon";
import { useAuth } from "./context/authContext";
import ComposeEmailModal from "@/components/modals/ComposeEmailModal";

const Inbox = () => {
  const { user, token } = useAuth();
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  useEffect(() => {
    console.log("✅ Context user:", user);
    console.log("✅ Context token:", token);
  }, [user, token]);

  return (
    <SafeAreaView className="flex-1 px-4 pt-10 bg-white">
      <Header title="Inbox" />
      <ScrollView className="">
        <View className="min-h-[70vh] flex flex-col items-center justify-center">
          <Image
            source={require("../assets/images/empty-inbox.png")}
            className="w-[114px] h-[100px]"
          />
          <Text className="text-[18px] font-semibold mt-3">
            Nothing to see yet!
          </Text>
          <Text className="text-[#737373] text-[12px] mt-3">
            No new messages in your inbox. Check back later.
          </Text>
        </View>
      </ScrollView>
      <Pressable
        onPress={() => setModalVisible(true)}
        className="absolute bottom-20 right-10 bg-[#EEF0F4] rounded-full h-[64px] w-[64px] flex items-center justify-center"
      >
        <PenIcon />
      </Pressable>

      <ComposeEmailModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </SafeAreaView>
  );
};

export default Inbox;
