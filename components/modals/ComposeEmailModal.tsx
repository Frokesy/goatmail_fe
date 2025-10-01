import { useState } from "react";
import {
  Animated,
  Image,
  Keyboard,
  Modal,
  Pressable,
  Text,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import AttachFilesModal from "./AttachFilesModal";
import ScheduleEmailModal from "./ScheduleEmailModal";
import EmailProtectionModal from "./EmailProtectionModal";
import AiWritingAssistantModal from "./AiWritingAssistantModal";
import ComposeEmailUI from "../ui/ComposeEmailUI";
import EmailLockIcon from "../icons/EmailLockIcon";
import ScheduledIcon from "../icons/ScheduledIcon";
import ShareIcon from "../icons/ShareIcon";
import XIcon from "../icons/XIcon";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const ComposeEmailModal = ({
  modalVisible,
  setModalVisible,
}: {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
}) => {
  const [recipients, setRecipients] = useState<any[]>([]);

  const [subject, setSubject] = useState<string>("");

  const [showAttachFilesModal, setShowAttachFilesModal] =
    useState<boolean>(false);
  const [showScheduleMailModal, setShowScheduleMailModal] =
    useState<boolean>(false);
  const [showEmailProtectionModal, setShowEmailProtectionModal] =
    useState<boolean>(false);
  const [showAiModal, setShowAiModal] = useState<boolean>(false);

  return (
    <Modal
      animationType="slide"
      transparent
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View className="flex-1 bg-black/40" />

      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <Animated.View className="absolute bottom-0 h-[95%] w-full bg-white rounded-t-3xl p-5">
          <KeyboardAwareScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            enableOnAndroid
            extraScrollHeight={10}
          >
            <View className="flex flex-row justify-between items-center mt-10 border-b-2 border-[#f1f1f1] pb-3">
              <View className="flex items-center flex-row">
                <Pressable onPress={() => setModalVisible(false)}>
                  <XIcon />
                </Pressable>
                <Text className="ml-4 text-[20px] font-semibold">
                  Compose mail
                </Text>
              </View>
              <View className="flex flex-row items-center justify-between w-[40%]">
                <Pressable onPress={() => setShowAttachFilesModal(true)}>
                  <ShareIcon />
                </Pressable>
                <Pressable onPress={() => setShowScheduleMailModal(true)}>
                  <ScheduledIcon />
                </Pressable>
                <Pressable onPress={() => setShowEmailProtectionModal(true)}>
                  <EmailLockIcon />
                </Pressable>
                <Pressable onPress={() => setShowAiModal(true)}>
                  <Image
                    source={require("../../assets/images/ai-generate.png")}
                    className="w-[44px] h-[44px] mt-3"
                  />
                </Pressable>
              </View>
            </View>

            <ComposeEmailUI
              setModalVisible={setModalVisible}
              subject={subject}
              setSubject={setSubject}
              recipients={recipients}
              setRecipients={setRecipients}
            />
          </KeyboardAwareScrollView>
        </Animated.View>
      </TouchableWithoutFeedback>

      <AttachFilesModal
        modalVisible={showAttachFilesModal}
        setModalVisible={setShowAttachFilesModal}
      />
      <ScheduleEmailModal
        modalVisible={showScheduleMailModal}
        setModalVisible={setShowScheduleMailModal}
      />
      <EmailProtectionModal
        modalVisible={showEmailProtectionModal}
        setModalVisible={setShowEmailProtectionModal}
      />
      <AiWritingAssistantModal
        modalVisible={showAiModal}
        setModalVisible={setShowAiModal}
        subject={subject}
        recipients={recipients}
      />
    </Modal>
  );
};

export default ComposeEmailModal;
