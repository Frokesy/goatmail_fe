import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  Pressable,
} from "react-native";
import React, { useRef, useState } from "react";
import CaretRight from "../components/icons/CaretRight";
import CopyIcon from "../components/icons/CopyIcon";
import { Link } from "expo-router";
import SuccessModal from "../components/modals/SuccessModal";
import CircledTick from "../../assets/images/circledtick.png";

const TwoFA = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [modalVisible, setModalVisible] = useState(false);
  const inputs = useRef<(TextInput | null)[]>([]);

  const handleChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < inputs.current.length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && code[index] === "") {
      if (index > 0) {
        inputs.current[index - 1]?.focus();

        const newCode = [...code];
        newCode[index - 1] = "";
        setCode(newCode);
      }
    }
  };
  return (
    <SafeAreaView className="mt-[10vh] mx-6">
      <Pressable className="flex flex-row justify-end">
        <Link href="/addRecoveryEmail">
          <View className="flex flex-row justify-end items-center">
            <Text className="mr-3">Skip</Text>
            <CaretRight />
          </View>
        </Link>
      </Pressable>
      <View className="flex flex-col mt-[3vh] items-center justify-center">
        <Text className="text-[24px] font-bold">Secure your account</Text>
        <Text className="text-[#A3A3A3] text-[14px] mt-2 mb-10 mx-4 text-center">
          Set up two-factor authentication for enhanced security.
        </Text>
        <Image
          source={require("../../assets/images/sample-qr.png")}
          className="w-[164px] h-[164px]"
        />
        <Text className="text-[#A3A3A3] text-[14px] mt-6 mx-4 text-center">
          Scan this QR code with your authenticator app (Google Authenticator,
          Authy, etc.)
        </Text>
        <Text className="text-[#A3A3A3] text-[14px] mt-4 text-center">OR</Text>
        <Text className="text-[#A3A3A3] text-[14px] mt-6 mx-4 text-center">
          Add this secret key to your authenticator app:
        </Text>

        <View className="w-[100%] mt-10 flex flex-row justify-between items-center">
          <Text className="text-[#333333] font-semibold text-[16px]">
            RRGH TTER 8T7SD OYW9
          </Text>
          <View className="flex flex-row items-center py-3 px-6 rounded-full bg-[#3D4294] text-[#fff]">
            <Text className="text-white mr-2">Copy</Text>
            <CopyIcon />
          </View>
        </View>

        <View className="flex flex-col w-[100%] mt-3">
          <Text className="text-[14px] text-[#344054] font-medium mt-6">
            Enter verification code from your app
          </Text>
          <View className="flex flex-row mt-3 justify-between items-center">
            {code.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => {
                  inputs.current[index] = ref;
                }}
                className="border border-[#D6D6D6] p-3 w-[13%] rounded-lg text-center text-[18px]"
                keyboardType="number-pad"
                maxLength={1}
                value={digit}
                onChangeText={(text) => handleChange(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
              />
            ))}
          </View>

          <Pressable
            onPress={() => setModalVisible(true)}
            className="text-white text-center font-medium text-[16px] bg-[#3D4294] p-5 w-[100%] mt-20 rounded-full items-center"
          >
            <Text className="text-white font-medium text-[16px]">
              Enable 2FA
            </Text>
          </Pressable>
        </View>
      </View>

      <SuccessModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        title="Success!"
        message="Your server details has been verified and saved successfully."
        buttonText="Continue"
        buttonLink="/addRecoveryEmail"
        image={CircledTick}
      />
    </SafeAreaView>
  );
};

export default TwoFA;
