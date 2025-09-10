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

const securityTypeOptions = [
  { label: "SSL/TLS", value: "SSL/TLS" },
  { label: "STARTTLS", value: "STARTTLS" },
  { label: "None", value: "None" },
];

const OutgoingEmailServerType = () => {
  const [showPassword, toggleShowPassword] = useState<boolean>(false);
  const [securityType, setSecurityType] = useState<string | number | null>(
    null
  );

  const [modalVisible, setModalVisible] = useState(false);

  return (
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
          inputMode="text"
          placeholder="Enter server name e.g imap.mail.com"
          placeholderTextColor="#9ca3af"
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
          onPress={() => setModalVisible(true)}
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
        message="Your server details has been verified and saved successfully."
        buttonText="Enable Two-Factor Authentication"
        buttonLink="/twoFA"
        image={SuccessImage}
      />
    </SafeAreaView>
  );
};

export default OutgoingEmailServerType;
