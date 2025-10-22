import {
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
  Animated,
  TouchableOpacity,
  TextInput,
  Keyboard,
} from "react-native";
import React from "react";

const CreateContactModal = ({
  modalVisible,
  setModalVisible,
}: {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
}) => {
  const handleDone = () => {
    setModalVisible(false);
  };
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
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <Animated.View className="absolute bottom-0 min-h-[60%] w-full bg-white rounded-t-3xl p-5">
          <View className="flex flex-row items-center justify-between my-4 border-b border-[#E4E4E7] pb-3">
            <Text className="text-[20px] font-semibold">Create contact</Text>
            <TouchableOpacity onPress={handleDone}>
              <Text className="text-[#1A2E6C] text-[14px] font-medium">
                Save
              </Text>
            </TouchableOpacity>
          </View>

          <View className="flex flex-col w-[100%] mt-3">
            <Text className="text-[14px] text-[#344054] font-semibold">
              First Name
            </Text>
            <TextInput
              placeholder="John"
              placeholderTextColor="#9ca3af"
              className="border border-[#D6D6D6] mt-2 p-3 rounded-lg"
            />
          </View>
          <View className="flex flex-col w-[100%] mt-6">
            <Text className="text-[14px] text-[#344054] font-semibold">
              Last Name
            </Text>
            <TextInput
              placeholder="Doe"
              placeholderTextColor="#9ca3af"
              className="border border-[#D6D6D6] mt-2 p-3 rounded-lg"
            />
          </View>
          <View className="flex flex-col w-[100%] mt-3">
            <Text className="text-[14px] text-[#344054] font-medium mt-3">
              Email address
            </Text>
            <TextInput
              className="border border-[#D6D6D6] mt-3 p-3 rounded-lg"
              inputMode="email"
              placeholder="Enter email address"
              placeholderTextColor="#9ca3af"
            />
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CreateContactModal;
