import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  Animated,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import AddPhotoFromLibraryIcon from "../icons/AddPhotoFromLibraryIcon";
import UploadFromFileManagerIcon from "../icons/UploadFromFileManagerIcon";

const isToday = (date: Date) => {
  const now = new Date();
  return (
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
  );
};

const ScheduleEmailModal = ({
  modalVisible,
  setModalVisible,
}: {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
}) => {
  const [date, setDate] = useState(new Date());
  const [tempDate, setTempDate] = useState(new Date());
  const [pickerMode, setPickerMode] = useState<"date" | "time" | null>(null);

  const onChange = (_event: any, selectedDate?: Date) => {
    if (selectedDate) {
      setTempDate(selectedDate);
    }
  };

  const handleConfirm = () => {
    setDate(tempDate);
    setPickerMode(null);
  };

  const handleCancel = () => {
    setTempDate(date);
    setPickerMode(null);
  };

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

      <Animated.View className="absolute bottom-0 h-[45%] w-full bg-white rounded-t-3xl p-5">
        <Text className="text-[20px] font-semibold mb-2">Schedule mail</Text>
        <Text className="text-gray-600 mb-4">
          Choose when to send this email
        </Text>

        <View className="border-t-2 border-[#f1f1f1] mt-2 pt-4 space-y-6">
          <TouchableOpacity
            onPress={() => setPickerMode("date")}
            className="flex flex-row justify-between items-center border border-[#E5E5E5] rounded-lg px-4 py-3"
          >
            <Text className="text-[16px]">{date.toLocaleDateString()}</Text>
            <AddPhotoFromLibraryIcon />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setPickerMode("time")}
            className="flex flex-row justify-between items-center border border-[#E5E5E5] rounded-lg px-4 py-3 mt-4"
          >
            <Text className="text-[16px]">
              {date.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
            <UploadFromFileManagerIcon />
          </TouchableOpacity>
        </View>
      </Animated.View>

      {pickerMode && (
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
                mode={pickerMode}
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={onChange}
                themeVariant={Platform.OS === "ios" ? "light" : "light"}
                style={{ width: "100%" }}
                minimumDate={
                  pickerMode === "date"
                    ? new Date()
                    : isToday(tempDate)
                    ? new Date()
                    : undefined
                }
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

export default ScheduleEmailModal;
