import { useState } from "react";
import {
  Animated,
  Image,
  Keyboard,
  Modal,
  Pressable,
  ScrollView,
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
import { Checkbox } from "expo-checkbox";
import SendEmailIcon from "../icons/SendEmailIcon";
import AttachFilesModal from "./AttachFilesModal";
import ScheduleEmailModal from "./ScheduleEmailModal";
import EmailProtectionModal from "./EmailProtectionModal";

const ComposeEmailModal = ({
  modalVisible,
  setModalVisible,
}: {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
}) => {
  const [showCC, setShowCC] = useState<boolean>(false);
  const [showBCC, setShowBCC] = useState<boolean>(false);
  const [recipients, setRecipients] = useState<any[]>([]);
  const [ccrecipients, setCCRecipients] = useState<any[]>([]);
  const [bccrecipients, setBCCRecipients] = useState<any[]>([]);
  const [currentRecipientInput, setCurrentRecipientInput] =
    useState<string>("");
  const [currentCCRecipientInput, setCurrentCCRecipientInput] =
    useState<string>("");
  const [currentBCCRecipientInput, setCurrentBCCRecipientInput] =
    useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [mail, setMail] = useState<string>("");
  const [isChecked, setChecked] = useState(false);
  const [showAttachFilesModal, setShowAttachFilesModal] =
    useState<boolean>(false);
  const [showScheduleMailModal, setShowScheduleMailModal] =
    useState<boolean>(false);
  const [showEmailProtectionModal, setShowEmailProtectionModal] =
    useState<boolean>(false);

  const addRecipient = (cat: string) => {
    if (cat === "recipient") {
      const email = currentRecipientInput.trim();

      if (email.length > 0 && !recipients.includes(email)) {
        setRecipients([...recipients, email]);
      }
      setCurrentRecipientInput("");
    } else if (cat === "ccrecipient") {
      const email = currentCCRecipientInput.trim();

      if (email.length > 0 && !ccrecipients.includes(email)) {
        setCCRecipients([...ccrecipients, email]);
      }
      setCurrentCCRecipientInput("");
    } else if (cat === "bccrecipient") {
      const email = currentBCCRecipientInput.trim();

      if (email.length > 0 && !bccrecipients.includes(email)) {
        setBCCRecipients([...bccrecipients, email]);
      }
      setCurrentBCCRecipientInput("");
    }
  };

  const removeRecipient = (email: string, cat: string) => {
    if (cat === "recipient") {
      setRecipients(recipients.filter((e) => e !== email));
    } else if (cat === "ccrecipient") {
      setCCRecipients(ccrecipients.filter((e) => e !== email));
    } else if (cat === "bccrecipient") {
      setBCCRecipients(bccrecipients.filter((e) => e !== email));
    }
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
          <ScrollView>
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
                <Image
                  source={require("../../assets/images/ai-generate.png")}
                  className="w-[44px] h-[44px] mt-3"
                />
              </View>
            </View>

            <View className="flex flex-row items-center mt-10">
              <Text>To:</Text>
              <TextInput
                value={currentRecipientInput}
                onChangeText={setCurrentRecipientInput}
                onSubmitEditing={() => addRecipient("recipient")}
                submitBehavior={"submit"}
                returnKeyType="done"
                className="border-b-2 border-[#D0D5DD] w-[90vw] ml-3 pb-2"
                placeholder="Enter recipients"
                placeholderTextColor="#9ca3af"
              />
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mt-3"
            >
              {recipients.map((email, i) => (
                <View
                  key={i}
                  className="flex flex-row items-center bg-[#EEF0F4] px-2 py-2 rounded-full ml-2"
                >
                  <View className="bg-[#fff] flex items-center justify-center flex-row mr-2 rounded-full w-[20px] h-[20px]">
                    <Text className="text-[12px]">
                      {email.charAt(0).toUpperCase()}
                    </Text>
                  </View>
                  <Text className="text-[12px]">{email}</Text>
                  <TouchableOpacity
                    className="ml-3"
                    onPress={() => removeRecipient(email, "recipient")}
                  >
                    <Text>✕</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
            <View className="flex flex-row mt-10">
              <Pressable onPress={() => setShowCC(!showCC)}>
                <Text>{showCC ? "Remove CC" : "Add CC"}</Text>
              </Pressable>
              <Pressable className="ml-4" onPress={() => setShowBCC(!showBCC)}>
                <Text>{showBCC ? "Remove BCC" : "Add BCC"}</Text>
              </Pressable>
            </View>
            {showCC && (
              <View>
                <View className="flex flex-row items-center mt-10">
                  <Text>CC:</Text>
                  <TextInput
                    value={currentCCRecipientInput}
                    onChangeText={setCurrentCCRecipientInput}
                    onSubmitEditing={() => addRecipient("ccrecipient")}
                    submitBehavior={"submit"}
                    returnKeyType="done"
                    className="border-b-2 border-[#D0D5DD] ml-3 w-[90vw] pb-2"
                    placeholder="Enter CC recipients"
                    placeholderTextColor="#9ca3af"
                  />
                </View>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  className="mt-3"
                >
                  {ccrecipients.map((email, i) => (
                    <View
                      key={i}
                      className="flex flex-row items-center bg-[#EEF0F4] px-2 py-2 rounded-full ml-2"
                    >
                      <View className="bg-[#fff] flex items-center justify-center flex-row mr-2 rounded-full w-[20px] h-[20px]">
                        <Text className="text-[12px]">
                          {email.charAt(0).toUpperCase()}
                        </Text>
                      </View>
                      <Text className="text-[12px]">{email}</Text>
                      <TouchableOpacity
                        className="ml-3"
                        onPress={() => removeRecipient(email, "ccrecipient")}
                      >
                        <Text>✕</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </ScrollView>
              </View>
            )}
            {showBCC && (
              <View>
                <View className="flex flex-row items-center mt-10">
                  <Text>BCC:</Text>
                  <TextInput
                    value={currentBCCRecipientInput}
                    onChangeText={setCurrentBCCRecipientInput}
                    onSubmitEditing={() => addRecipient("bccrecipient")}
                    submitBehavior={"submit"}
                    returnKeyType="done"
                    className="border-b-2 border-[#D0D5DD] ml-3 w-[90vw] pb-2"
                    placeholder="Enter BCC recipients"
                    placeholderTextColor="#9ca3af"
                  />
                </View>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  className="mt-3"
                >
                  {bccrecipients.map((email, i) => (
                    <View
                      key={i}
                      className="flex flex-row items-center bg-[#EEF0F4] px-2 py-2 rounded-full ml-2"
                    >
                      <View className="bg-[#fff] flex items-center justify-center flex-row mr-2 rounded-full w-[20px] h-[20px]">
                        <Text className="text-[12px]">
                          {email.charAt(0).toUpperCase()}
                        </Text>
                      </View>
                      <Text className="text-[12px]">{email}</Text>
                      <TouchableOpacity
                        className="ml-3"
                        onPress={() => removeRecipient(email, "bccrecipient")}
                      >
                        <Text>✕</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </ScrollView>
              </View>
            )}
            <View className="flex flex-row items-center mt-10">
              <Text>Subject:</Text>
              <TextInput
                value={subject}
                onChangeText={setSubject}
                className="border-b-2 border-[#D0D5DD] ml-3 w-[85%] pb-2"
                placeholder="Enter subject"
                placeholderTextColor="#9ca3af"
              />
            </View>
            <TextInput
              multiline
              numberOfLines={10}
              value={mail}
              onChangeText={setMail}
              style={{ textAlignVertical: "top" }}
              className="border border-[#D0D5DD] w-[100%] min-h-[30vh] mt-10 p-3 rounded-lg"
              placeholder="Compose your mail..."
              placeholderTextColor="#9ca3af"
            />

            {recipients.length === 0 ||
              subject === "" ||
              (mail === "" && (
                <View className="flex items-center border border-[#ccc] p-3 rounded-xl flex-row mt-4">
                  <Checkbox value={isChecked} onValueChange={setChecked} />
                  <Text className="ml-3">Enable mail tracking</Text>
                </View>
              ))}

            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              disabled={
                recipients.length === 0 || subject === "" || mail === ""
              }
              className={`mt-20 w-full py-4 flex items-center flex-row justify-center rounded-full ${
                recipients.length === 0 || subject === "" || mail === ""
                  ? "bg-gray-400 opacity-50"
                  : "bg-[#3D4294]"
              }`}
              activeOpacity={0.7}
            >
              <SendEmailIcon />
              <Text className="text-white font-bold text-[16px] ml-3">
                Send
              </Text>
            </TouchableOpacity>
          </ScrollView>
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
    </Modal>
  );
};

export default ComposeEmailModal;
