import {
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
  Animated,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DoubleStarIcon from "../icons/DoubleStarIcon";

const AiWritingAssistantModal = ({
  modalVisible,
  setModalVisible,
}: {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
}) => {
  return (
    <Modal
      animationType="slide"
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
      transparent
    >
      <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
        <View className="flex-1 bg-black/40" />
      </TouchableWithoutFeedback>
      <Animated.View className="absolute bottom-0 min-h-[80%] w-full bg-white rounded-t-3xl p-5">
        <KeyboardAwareScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          enableOnAndroid
          extraScrollHeight={10}
        >
          <Text className="text-[20px] font-semibold mb-2">
            AI writing assistant
          </Text>

          <View className="mt-3 border-t-2 border-[#f1f1f1] pt-4">
            <View className="bg-[#FCFCFC] border border-[#E5E5E5] p-3 rounded-lg">
              <View className="flex flex-row">
                <Text className="text-[14px] font-semibold text-[#182A62]">
                  To:
                </Text>
                <Text className="text-[14px] ml-3 text-[#182A62]">
                  Not Specified
                </Text>
              </View>
              <View className="flex flex-row mt-4">
                <Text className="text-[14px] font-semibold text-[#182A62]">
                  Subject:
                </Text>
                <Text className="text-[14px] ml-3 text-[#182A62]">
                  Not Specified
                </Text>
              </View>
            </View>
          </View>

          <View className="h-[30vh] w-full mt-10"></View>

          <View className="mt-6">
            <Text>What would you like to write about?</Text>
            <View className="w-full border border-[#D6D6D6] mt-3 p-3 flex flex-row justify-between rounded-lg">
              <TextInput
                multiline
                placeholder="e.g a professional follow up email"
                placeholderTextColor="#9ca3af"
                className="w-[85%]"
              />
              <Text className="text-[#1e3fa5]">gpt-4o</Text>
            </View>

            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              className="bg-[#3D4294] py-4 flex flex-row justify-center items-center rounded-full mt-10"
              activeOpacity={0.7}
            >
              <DoubleStarIcon />
              <Text className="text-white font-bold text-[16px] ml-3">
                Generate
              </Text>
            </TouchableOpacity>
            <Text className="text-[14px] text-[#333333] text-center mt-10">
              AI suggestions are generated to help you write better emails.
              Review before sending.
            </Text>
          </View>
        </KeyboardAwareScrollView>
      </Animated.View>
    </Modal>
  );
};

export default AiWritingAssistantModal;
