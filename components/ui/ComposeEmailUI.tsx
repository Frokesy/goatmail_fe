import {
  View,
  Text,
  Pressable,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Checkbox } from "expo-checkbox";
import SendEmailIcon from "../icons/SendEmailIcon";
import { useAuth } from "@/app/context/authContext";
import { sendEmail } from "@/helpers/api";

interface ComposeEmailUIProps {
  setModalVisible: (visible: boolean) => void;
  subject: string;
  setSubject: (subject: string) => void;
  recipients: any[];
  setRecipients: (recipients: any[]) => void;
  ccrecipients: any[];
  setCCRecipients: (recipients: any[]) => void;
  bccrecipients: any[];
  setBCCRecipients: (recipients: any[]) => void;
  mail: string;
  setMail: (mail: string) => void;
  draftId: string | null;
  setDraftId: (draft: string | null) => void;
}

const API_URL = "https://goatmailbe-production.up.railway.app/api";

const ComposeEmailUI = ({
  setModalVisible,
  subject,
  setSubject,
  recipients,
  setRecipients,
  ccrecipients,
  setCCRecipients,
  bccrecipients,
  setBCCRecipients,
  mail,
  setMail,
  draftId,
  setDraftId,
}: ComposeEmailUIProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { user, token } = useAuth();
  const [showCC, setShowCC] = useState<boolean>(false);
  const [showBCC, setShowBCC] = useState<boolean>(false);
  const [currentRecipientInput, setCurrentRecipientInput] =
    useState<string>("");
  const [currentCCRecipientInput, setCurrentCCRecipientInput] =
    useState<string>("");
  const [currentBCCRecipientInput, setCurrentBCCRecipientInput] =
    useState<string>("");
  const [isChecked, setChecked] = useState(false);

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

  const handleSend = async () => {
    try {
      setLoading(true);

      await sendEmail({
        token: token as string,
        name: user?.name as string,
        to: recipients,
        cc: ccrecipients,
        bcc: bccrecipients,
        subject,
        body: mail,
        track: isChecked,
      });

      if (draftId) {
        await fetch(`${API_URL}/drafts/${draftId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Draft deleted after sending");
        setDraftId(null);
      }

      Alert.alert("Success", "Email sent successfully!");
      setModalVisible(false);
    } catch (err: any) {
      Alert.alert("Error", err.message || "Failed to send email");
    } finally {
      setMail("");
      setSubject("");
      setRecipients([]);
      setCCRecipients([]);
      setBCCRecipients([]);
      setChecked(false);
      setLoading(false);
    }
  };

  const canEnableTracking =
    recipients.length > 0 && subject.trim() !== "" && mail.trim() !== "";
  return (
    <View>
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
      <View className="flex flex-row flex-wrap mt-2">
        {recipients.map((email, i) => (
          <View
            key={i}
            className="flex flex-row items-center bg-[#EEF0F4] px-2 py-2 rounded-full mr-2 mb-2"
          >
            <View className="bg-white flex items-center justify-center rounded-full w-[20px] h-[20px] mr-2">
              <Text className="text-[12px]">
                {email.charAt(0).toUpperCase()}
              </Text>
            </View>
            <Text className="text-[12px]">{email}</Text>
            <TouchableOpacity
              className="ml-2"
              onPress={() => removeRecipient(email, "recipient")}
            >
              <Text>✕</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

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
          <View className="flex flex-row flex-wrap mt-3">
            {ccrecipients.map((email, i) => (
              <View
                key={i}
                className="flex flex-row items-center bg-[#EEF0F4] px-2 py-2 rounded-full mr-2 mb-2"
              >
                <View className="bg-white flex items-center justify-center rounded-full w-[20px] h-[20px] mr-2">
                  <Text className="text-[12px]">
                    {email.charAt(0).toUpperCase()}
                  </Text>
                </View>
                <Text className="text-[12px]">{email}</Text>
                <TouchableOpacity
                  className="ml-2"
                  onPress={() => removeRecipient(email, "ccrecipient")}
                >
                  <Text>✕</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
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
          <View className="flex flex-row flex-wrap mt-3">
            {bccrecipients.map((email, i) => (
              <View
                key={i}
                className="flex flex-row items-center bg-[#EEF0F4] px-2 py-2 rounded-full mr-2 mb-2"
              >
                <View className="bg-white flex items-center justify-center rounded-full w-[20px] h-[20px] mr-2">
                  <Text className="text-[12px]">
                    {email.charAt(0).toUpperCase()}
                  </Text>
                </View>
                <Text className="text-[12px]">{email}</Text>
                <TouchableOpacity
                  className="ml-2"
                  onPress={() => removeRecipient(email, "bccrecipient")}
                >
                  <Text>✕</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
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

      {canEnableTracking && (
        <View className="flex items-center border border-[#ccc] p-3 rounded-xl flex-row mt-4">
          <Checkbox value={isChecked} onValueChange={setChecked} />
          <Text className="ml-3">Enable mail tracking</Text>
        </View>
      )}

      <TouchableOpacity
        onPress={handleSend}
        disabled={
          recipients.length === 0 || subject === "" || mail === "" || loading
        }
        className={`mt-20 w-full py-4 flex items-center flex-row justify-center rounded-full ${
          recipients.length === 0 || subject === "" || mail === "" || loading
            ? "bg-gray-400 opacity-50"
            : "bg-[#3D4294]"
        }`}
        activeOpacity={0.7}
      >
        <SendEmailIcon />
        <Text className="text-white font-bold text-[16px] ml-3">
          {loading ? "Sending..." : "Send"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ComposeEmailUI;
