import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { useState } from "react";
import CustomSelect from "../components/CustomSelect";
import EyeOffIcon from "../components/icons/EyeOff";
import EyeIcon from "../components/icons/EyesIcon";
import SuccessModal from "../components/modals/SuccessModal";
import SuccessImage from "../../assets/images/success.png";
import { useSearchParams } from "expo-router/build/hooks";

const serverOptions = [
  { label: "IMAP (Sync across devices)", value: "IMAP" },
  { label: "POP3 (Download locally)", value: "POP3" },
];

const securityTypeOptions = [
  { label: "SSL/TLS", value: "SSL/TLS" },
  { label: "STARTTLS", value: "STARTTLS" },
  { label: "None", value: "None" },
];

const API_URL = "http://192.168.1.117:3000/api/auth";

const IncomingEmailServerType = () => {
  const [server, setServer] = useState<string | number | null>(null);
  const [serverName, setServerName] = useState("");
  const [password, setPassword] = useState("");
  const [port, setPort] = useState("");
  const [securityType, setSecurityType] = useState<string | number | null>(
    null
  );
  const [showPassword, toggleShowPassword] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState(false);

  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const handleProceed = async () => {
    if (!server || !serverName || !password || !port || !securityType) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/set-incoming-server`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          serverType: server,
          serverName,
          password,
          port,
          security: securityType,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Failed to save server details");
      } else {
        setModalVisible(true);
      }
    } catch (err) {
      alert("Network error");
      console.log(err);
    }
  };

  return (
    <SafeAreaView className="mt-[5vh] mx-6 flex flex-col items-center justify-center">
      <Text className="text-[24px] font-bold">
        Select incoming email server type
      </Text>
      <Text className="text-[#A3A3A3] text-[14px] mt-2 mx-4 text-center">
        Enter your email credentials to connect your account.
      </Text>

      <View className="flex flex-col w-[100%] mt-3">
        <Text className="text-[14px] text-[#344054] font-medium mt-6">
          Select server
        </Text>
        <CustomSelect
          options={serverOptions}
          value={server}
          onChange={(v) => setServer(v)}
          placeholder="Select server"
          searchable
        />
      </View>

      <View className="flex flex-col w-[100%] mt-3">
        <Text className="text-[14px] text-[#344054] font-medium mt-6">
          Server name
        </Text>
        <TextInput
          className="border border-[#D6D6D6] mt-3 p-3 rounded-lg"
          inputMode="text"
          placeholder="Enter server name e.g imap.mail.com"
          placeholderTextColor="#9ca3af"
          value={serverName}
          onChangeText={setServerName}
        />
      </View>

      <View className="flex flex-col w-[100%] mt-3">
        <Text className="text-[14px] text-[#344054] font-medium mt-6">
          Password
        </Text>
        <View className="border border-[#D6D6D6] mt-3 rounded-lg p-3 flex flex-row justify-between items-center">
          <TextInput
            secureTextEntry={!showPassword}
            textContentType="password"
            placeholder="Enter password"
            className="w-[90%]"
            placeholderTextColor="#9ca3af"
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => toggleShowPassword(!showPassword)}>
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </TouchableOpacity>
        </View>
      </View>

      <View className="flex flex-col w-[100%] mt-3">
        <Text className="text-[14px] text-[#344054] font-medium mt-6">
          Port
        </Text>
        <TextInput
          className="border border-[#D6D6D6] mt-3 p-3 rounded-lg"
          inputMode="numeric"
          placeholder="Enter port number e.g 993"
          placeholderTextColor="#9ca3af"
          value={port}
          onChangeText={setPort}
        />
      </View>

      <View className="flex flex-col w-[100%] mt-3">
        <Text className="text-[14px] text-[#344054] font-medium mt-6">
          Security
        </Text>
        <CustomSelect
          options={securityTypeOptions}
          value={securityType}
          onChange={(v) => setSecurityType(v)}
          placeholder="Select security type"
          searchable
        />
      </View>

      <View className="w-[100%] mt-10">
        <Pressable
          onPress={handleProceed}
          className="bg-[#3D4294] p-5 rounded-full items-center"
        >
          <Text className="text-white font-medium text-[16px]">
            Proceed to setup Server
          </Text>
        </Pressable>
      </View>

      <SuccessModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        title="Success!"
        message="Your server details have been verified and saved successfully."
        buttonText="Setup outgoing server"
        buttonLink={`/outgoingEmailServerType?email=${encodeURIComponent(
          email
        )}`}
        image={SuccessImage}
      />
    </SafeAreaView>
  );
};

export default IncomingEmailServerType;
