import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Animated,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CustomSelect from "../../components/CustomSelect";
import EyeOffIcon from "../../components/icons/EyeOff";
import EyeIcon from "../../components/icons/EyesIcon";

interface UpdateIncomingServerModalProps {
  visible: boolean;
  onClose: () => void;
  onUpdate: (fields: {
    serverType: string;
    serverName: string;
    port: string;
    security: string;
    password: string;
  }) => void;
  initialValues: {
    serverType: string;
    serverName: string;
    port: string;
    security: string;
  };
  loading: boolean;
  error?: string;
}

const serverOptions = [
  { label: "IMAP (Sync across devices)", value: "IMAP" },
  { label: "POP3 (Download locally)", value: "POP3" },
];

const securityTypeOptions = [
  { label: "SSL/TLS", value: "SSL/TLS" },
  { label: "STARTTLS", value: "STARTTLS" },
  { label: "None", value: "None" },
];

const UpdateIncomingServerModal: React.FC<UpdateIncomingServerModalProps> = ({
  visible,
  onClose,
  onUpdate,
  initialValues,
  loading,
  error,
}) => {
  const [serverType, setServerType] = useState<string | number | null>(
    initialValues.serverType || null
  );
  const [serverName, setServerName] = useState(initialValues.serverName || "");
  const [port, setPort] = useState(initialValues.port || "");
  const [security, setSecurity] = useState<string | number | null>(
    initialValues.security || null
  );
  const [password, setPassword] = useState("");
  const [showPassword, toggleShowPassword] = useState(false);

  useEffect(() => {
    if (visible) {
      setServerType(initialValues.serverType || null);
      setServerName(initialValues.serverName || "");
      setPort(initialValues.port || "");
      setSecurity(initialValues.security || null);
      setPassword("");
    }
  }, [visible, initialValues]);

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/40" />

      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <Animated.View className="absolute bottom-0 h-[75%] w-full bg-white rounded-t-3xl p-5">
          <KeyboardAwareScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            enableOnAndroid
            extraScrollHeight={10}
          >
            {error ? (
              <Text className="text-red-500 text-lg font-bold mb-4">
                {error}, please update your server details
              </Text>
            ) : null}

            {/* Server Type */}
            <Text className="text-sm text-gray-700 font-medium mb-2">
              Server Type
            </Text>
            <CustomSelect
              options={serverOptions}
              value={serverType}
              onChange={setServerType}
              placeholder="Select server type"
              searchable
            />

            {/* Server Name */}
            <Text className="text-sm text-gray-700 font-medium mt-4 mb-2">
              Server Name
            </Text>
            <TextInput
              placeholder="e.g., imap.gmail.com"
              value={serverName}
              onChangeText={setServerName}
              className="border border-gray-300 rounded-md px-3 py-2"
              placeholderTextColor="#666"
            />

            {/* Port */}
            <Text className="text-sm text-gray-700 font-medium mt-4 mb-2">
              Port
            </Text>
            <TextInput
              placeholder="e.g., 993"
              value={port}
              onChangeText={setPort}
              keyboardType="numeric"
              className="border border-gray-300 rounded-md px-3 py-2"
              placeholderTextColor="#666"
            />

            {/* Security */}
            <Text className="text-sm text-gray-700 font-medium mt-4 mb-2">
              Security
            </Text>
            <CustomSelect
              options={securityTypeOptions}
              value={security}
              onChange={setSecurity}
              placeholder="Select security type"
              searchable
            />

            {/* Password */}
            <Text className="text-sm text-gray-700 font-medium mt-4 mb-2">
              Password
            </Text>
            <View className="border border-gray-300 rounded-md px-3 py-2 flex-row items-center justify-between">
              <TextInput
                placeholder="Enter app password"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
                className="flex-1"
                placeholderTextColor="#666"
              />
              <TouchableOpacity
                onPress={() => toggleShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </TouchableOpacity>
            </View>

            {/* Submit */}
            <TouchableOpacity
              disabled={loading}
              onPress={() =>
                onUpdate({
                  serverType: String(serverType),
                  serverName,
                  port,
                  security: String(security),
                  password,
                })
              }
              className="bg-blue-500 rounded-md py-3 mt-6"
            >
              <Text className="text-white text-center font-semibold">
                {loading ? "Updating..." : "Update"}
              </Text>
            </TouchableOpacity>

            {/* Cancel */}
            <TouchableOpacity onPress={onClose} className="mt-3">
              <Text className="text-gray-500 text-center">Cancel</Text>
            </TouchableOpacity>
          </KeyboardAwareScrollView>
        </Animated.View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default UpdateIncomingServerModal;
