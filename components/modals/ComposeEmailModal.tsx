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
import { useAuth } from "@/app/context/authContext";

const API_URL = "http://192.168.1.117:3000/api";

const ComposeEmailModal = ({
  modalVisible,
  setModalVisible,
}: {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
}) => {
  const [recipients, setRecipients] = useState<any[]>([]);

  const [subject, setSubject] = useState<string>("");

  const { token } = useAuth();

  const [showAttachFilesModal, setShowAttachFilesModal] =
    useState<boolean>(false);
  const [showScheduleMailModal, setShowScheduleMailModal] =
    useState<boolean>(false);
  const [showEmailProtectionModal, setShowEmailProtectionModal] =
    useState<boolean>(false);
  const [showAiModal, setShowAiModal] = useState<boolean>(false);
  const [ccrecipients, setCcrecipients] = useState<any[]>([]);
  const [bccrecipients, setBccrecipients] = useState<any[]>([]);
  const [mail, setMail] = useState<string>("");
  const [draftId, setDraftId] = useState<string | null>(null);

  const handleClose = async () => {
    if (
      subject.trim() ||
      mail.trim() ||
      recipients.length > 0 ||
      ccrecipients.length > 0 ||
      bccrecipients.length > 0
    ) {
      try {
        const res = await fetch(`${API_URL}/save-draft`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            draftId,
            to: recipients,
            cc: ccrecipients,
            bcc: bccrecipients,
            subject,
            body: mail,
          }),
        });

        const data = await res.json();
        if (data.draftId) {
          setDraftId(data.draftId);
          console.log("Draft saved:", data.draftId);
        }
      } catch (err) {
        console.error("Failed to save draft:", err);
      }
    }

    setModalVisible(false);
  };

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
                <Pressable onPress={handleClose}>
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
              ccrecipients={ccrecipients}
              setCCRecipients={setCcrecipients}
              bccrecipients={bccrecipients}
              setBCCRecipients={setBccrecipients}
              mail={mail}
              setMail={setMail}
              draftId={draftId}
              setDraftId={setDraftId}
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
