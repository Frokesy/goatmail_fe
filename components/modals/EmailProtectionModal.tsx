import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Modal,
  Animated,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TextInput,
  Platform,
} from "react-native";
import EyeOffIcon from "../icons/EyeOff";
import EyeIcon from "../icons/EyesIcon";
import CautionIcon from "../icons/CautionIcon";
import EmailLockIcon from "../icons/EmailLockIcon";
import CustomSelect from "../CustomSelect";
import DateTimePicker from "@react-native-community/datetimepicker";

const formatDateTime = (date: Date) => {
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

const isToday = (date: Date) => {
  const now = new Date();
  return (
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
  );
};

const EmailProtectionModal = ({
  modalVisible,
  setModalVisible,
}: {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
}) => {
  const [showPassword, toggleShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [dateType, setDateType] = useState<string | number | null>(null);
  const [showDatePopup, setShowDatePopup] = useState<boolean>(false);
  const [tempDate, setTempDate] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const [dateOptions, setDateOptions] = useState([
    { label: "1 hour", value: "1 hour" },
    { label: "1 day", value: "1 day" },
    { label: "3 days", value: "3 days" },
    { label: "1 week", value: "1 week" },
    { label: "1 month", value: "1 month" },
    { label: "3 months", value: "3 months" },
    { label: "Set custom date", value: "custom" },
  ]);

  const onChange = (_event: any, selectedDate?: Date) => {
    if (selectedDate) {
      setTempDate(selectedDate);
    }
  };

  const handleConfirm = () => {
    setDate(tempDate);
    setShowDatePopup(false);
    setLoading(false);

    setDateOptions((prev) =>
      prev.map((opt) =>
        opt.value === "custom"
          ? { ...opt, label: `Custom (${formatDateTime(tempDate)})` }
          : opt
      )
    );
  };

  const handleCancel = () => {
    setTempDate(date);
    setShowDatePopup(false);
    setLoading(false);

    if (!date) {
      setDateOptions((prev) =>
        prev.map((opt) =>
          opt.value === "custom" ? { ...opt, label: "Set custom date" } : opt
        )
      );
    }
  };

  useEffect(() => {
    if (dateType === "custom") {
      setShowDatePopup(true);
    }
  }, [dateType]);

  return (
    <Modal
      animationType="slide"
      transparent
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
        <View className="flex-1 bg-black/40" />
      </TouchableWithoutFeedback>

      <Animated.View className="absolute bottom-0 min-h-[70%] w-full bg-white rounded-t-3xl p-5">
        <Text className="text-[20px] font-semibold mb-2">
          Email Protection Settings
        </Text>
        <Text className="text-gray-600 mb-4">
          Turn on encryption and set messages to expire after a set time
        </Text>
        <View className="flex flex-col w-[100%] mt-3">
          <Text className="text-[14px] text-[#344054] font-medium mt-6">
            Expiration date
          </Text>
          <CustomSelect
            options={dateOptions}
            value={dateType}
            onChange={(v) => setDateType(v)}
            placeholder="Enter expiry date"
            searchable
          />
          {dateType === "custom" && (
            <View className="mt-2 px-3 py-1 rounded-full bg-[#F1F1F1] self-start">
              <Text className="text-[#344054] font-medium">
                {formatDateTime(date)}
              </Text>
            </View>
          )}
        </View>
        <View className="flex flex-col w-[100%] mt-3">
          <Text className="text-[14px] text-[#344054] font-medium mt-6">
            Password
          </Text>
          <View className="border border-[#D6D6D6] mt-3 rounded-lg p-3 flex flex-row justify-between items-center">
            <TextInput
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              textContentType="password"
              className="w-[90%]"
              editable={!loading}
            />
            <TouchableOpacity
              onPress={() => toggleShowPassword(!showPassword)}
              disabled={loading}
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </TouchableOpacity>
          </View>
          <Text className="text-[#667085] text-[14px] mt-2">
            Password must contain at least 8 characters
          </Text>
        </View>
        <View className="flex flex-col w-[100%] mt-3">
          <Text className="text-[14px] text-[#344054] font-medium mt-6">
            Confirm Password
          </Text>
          <View className="border border-[#D6D6D6] mt-3 rounded-lg p-3 flex flex-row justify-between items-center">
            <TextInput
              secureTextEntry={!showPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              textContentType="password"
              className="w-[90%]"
              editable={!loading}
            />
            <TouchableOpacity
              onPress={() => toggleShowPassword(!showPassword)}
              disabled={loading}
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </TouchableOpacity>
          </View>
          <Text className="text-[#667085] text-[14px] mt-2">
            Password must match
          </Text>
        </View>
        <View className="mt-10 flex flex-row items-center border border-[#FEDF89] p-3 rounded-xl">
          <CautionIcon />
          <View>
            <Text className="text-[16px] font-semibold ml-3 text-[#792E0D]">
              Share Password
            </Text>
            <Text className="text-[14px] mt-3 ml-3 text-[#792E0D]">
              Do not forget to share the password with the recipient
            </Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => setModalVisible(false)}
          className="bg-[#3D4294] py-4 flex flex-row justify-center items-center rounded-full mt-10"
          activeOpacity={0.7}
        >
          <EmailLockIcon color="#fff" />
          <Text className="text-white font-bold text-[16px] ml-3">
            Encrypt email
          </Text>
        </TouchableOpacity>
      </Animated.View>
      {showDatePopup && (
        <Modal
          transparent
          animationType="fade"
          visible={true}
          onRequestClose={handleCancel}
        >
          <View className="flex-1 bg-black/40 justify-center items-center">
            <View className="bg-white rounded-xl p-4 w-[85%]">
              <DateTimePicker
                value={tempDate}
                mode="datetime"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={onChange}
                themeVariant={Platform.OS === "ios" ? "light" : "light"}
                style={{ width: "100%" }}
                minimumDate={isToday(tempDate) ? new Date() : undefined}
              />

              <View className="flex flex-row justify-end mt-4">
                <TouchableOpacity onPress={handleCancel}>
                  <Text className="text-red-400 font-medium">Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleConfirm}>
                  <Text className="text-[#75a829] ml-4 font-semibold">
                    Done
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </Modal>
  );
};

export default EmailProtectionModal;
