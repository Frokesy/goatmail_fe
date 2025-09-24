import { useEffect, useRef } from "react";
import {
  Animated,
  Image,
  Keyboard,
  Modal,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import XIcon from "../icons/XIcon";
import ShareIcon from "../icons/ShareIcon";
import ScheduledIcon from "../icons/ScheduledIcon";
import EmailLockIcon from "../icons/EmailLockIcon";

const ComposeEmailModal = ({
  modalVisible,
  setModalVisible,
}: {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
}) => {
  const slideAnim = useRef(new Animated.Value(1000)).current;
  useEffect(() => {
    if (modalVisible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [modalVisible]);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Modal
        animationType="none"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 bg-black/40" />

        <Animated.View
          style={{ transform: [{ translateY: slideAnim }] }}
          className="absolute bottom-0 h-[95%] w-full bg-white rounded-t-3xl p-5"
        >
          <View className="flex flex-row justify-between items-center mt-6 border-b-2 border-[#f1f1f1] pb-3">
            <View className="flex items-center flex-row">
              <Pressable onPress={() => setModalVisible(false)}>
                <XIcon />
              </Pressable>
              <Text className="ml-4 text-[20px] font-semibold">
                Compose mail
              </Text>
            </View>
            <View className="flex flex-row items-center justify-between w-[40%]">
              <ShareIcon />
              <ScheduledIcon />
              <EmailLockIcon />
              <Image
                source={require("../../assets/images/ai-generate.png")}
                className="w-[44px] h-[44px] mt-3"
              />
            </View>
          </View>

          <View className="flex flex-row items-center mt-10">
            <Text>To:</Text>
            <TextInput
              className="border-b-2 border-[#D0D5DD] ml-3 w-[93%] pb-2"
              placeholder="Enter recipients"
              placeholderTextColor="#9ca3af"
            />
          </View>
          <View className="flex flex-row mt-6">
            <Pressable>
              <Text>Add CC</Text>
            </Pressable>
            <Pressable className="ml-4">
              <Text>Add BCC</Text>
            </Pressable>
          </View>
          <View className="flex flex-row items-center mt-6">
            <Text>Subject:</Text>
            <TextInput
              className="border-b-2 border-[#D0D5DD] ml-3 w-[85%] pb-2"
              placeholder="Enter subject"
              placeholderTextColor="#9ca3af"
            />
          </View>

          <TextInput
            multiline
            numberOfLines={10}
            style={{ textAlignVertical: "top" }}
            className="border border-[#D0D5DD] w-[100%] h-[40vh] mt-6 p-3 rounded-lg"
            placeholder="Compose your mail..."
            placeholderTextColor="#9ca3af"
          />

          <TouchableOpacity
            onPress={() => {
              setModalVisible(false);
            }}
            className="m-auto w-full py-4 bg-[#3D4294] rounded-full"
          >
            <Text className="text-white text-center font-bold text-[16px]">
              Send
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </Modal>
    </TouchableWithoutFeedback>
  );
};

export default ComposeEmailModal;
