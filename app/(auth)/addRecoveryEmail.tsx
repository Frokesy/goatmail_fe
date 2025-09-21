import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import { Link } from "expo-router";
import CaretRight from "../components/icons/CaretRight";
import CaretLeft from "../components/icons/CaretLeft";
import EmailAccountCreationStatusModal from "../components/modals/EmailAccountCreationStatusModal";

const AddRecoveryEmail = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView className="mt-[10vh] mx-6">
        <View className="flex flex-row justify-between items-center">
          <Link href="/twoFA">
            <CaretLeft />
          </Link>
          <Link href="/addRecoveryEmail">
            <View className="flex flex-row justify-end items-center">
              <Text className="mr-3">Skip</Text>
              <CaretRight />
            </View>
          </Link>
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
            />
          </View>
          <Pressable
            onPress={() => setModalVisible(true)}
            className="text-white text-center font-medium text-[16px] bg-[#3D4294] p-5 w-[100%] mt-20 rounded-full items-center"
          >
            <Text className="text-white font-medium text-[16px]">
              Proceed to server Setup
            </Text>
          </Pressable>
        </View>

        <EmailAccountCreationStatusModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default AddRecoveryEmail;
