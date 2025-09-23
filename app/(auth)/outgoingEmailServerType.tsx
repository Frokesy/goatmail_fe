import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useState } from "react";
import CustomSelect from "../../components/CustomSelect";
import EyeOffIcon from "../../components/icons/EyeOff";
import EyeIcon from "../../components/icons/EyesIcon";
import SuccessModal from "../../components/modals/SuccessModal";
import SuccessImage from "../../assets/images/success.png";
import { useSearchParams } from "expo-router/build/hooks";

const securityTypeOptions = [
  { label: "SSL/TLS", value: "SSL/TLS" },
  { label: "STARTTLS", value: "STARTTLS" },
  { label: "None", value: "None" },
];

const API_URL = "http://192.168.1.117:3000/api/auth";

const OutgoingEmailServerType = () => {
  const [showPassword, toggleShowPassword] = useState(false);
  const [securityType, setSecurityType] = useState<string | number | null>(
    null
  );
  const [smtpServer, setSmtpServer] = useState("");
  const [password, setPassword] = useState("");
  const [port, setPort] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const handleProceed = async () => {
    try {
      const res = await fetch(`${API_URL}/set-outgoing-server`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          smtpServer,
          password,
          port,
          securityType,
        }),
      });

      const data = await res.json();
      if (!res.ok)
        throw new Error(data.error || "Failed to save server details");

      setModalVisible(true);
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView className="mt-[5vh] mx-6 flex flex-col items-center justify-center">
        <Text className="text-[24px] font-bold">
          Select outgoing email server type
        </Text>
        <Text className="text-[#A3A3A3] text-[14px] mt-2 mx-4 text-center">
          Enter your email credentials to connect your account.
        </Text>

        <View className="flex flex-col w-[100%] mt-3">
          <Text className="text-[14px] text-[#344054] font-medium mt-6">
            SMTP Server
          </Text>
          <TextInput
            className="border border-[#D6D6D6] mt-3 p-3 rounded-lg"
            placeholder="Enter server name e.g smtp.mail.com"
            placeholderTextColor="#9ca3af"
            value={smtpServer}
            onChangeText={setSmtpServer}
          />
        </View>

        <View className="flex flex-col w-[100%] mt-3">
          <Text className="text-[14px] text-[#344054] font-medium mt-6">
            Password
          </Text>
          <View className="border border-[#D6D6D6] mt-3 rounded-lg p-3 flex flex-row justify-between items-center">
            <TextInput
              secureTextEntry={!showPassword}
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
            placeholder="Enter port number e.g 465"
            placeholderTextColor="#9ca3af"
            keyboardType="numeric"
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
            onChange={setSecurityType}
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
          buttonText="Enable Two-Factor Authentication"
          buttonLink={`/twoFA?email=${encodeURIComponent(email)}`}
          image={SuccessImage}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default OutgoingEmailServerType;
