import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Modal,
  Animated,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import AddPhotoFromLibraryIcon from "../icons/AddPhotoFromLibraryIcon";
import UploadFromFileManagerIcon from "../icons/UploadFromFileManagerIcon";
import CautionIcon from "../icons/CautionIcon";

const AttachFilesModal = ({
  modalVisible,
  setModalVisible,
}: {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
}) => {
  const slideAnim = useRef(new Animated.Value(1000)).current;

  useEffect(() => {
    if (modalVisible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [modalVisible]);

  return (
    <Modal
      animationType="none"
      transparent
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
        <View className="flex-1 bg-black/40" />
      </TouchableWithoutFeedback>

      <Animated.View
        style={{ transform: [{ translateY: slideAnim }] }}
        className="absolute bottom-0 h-[40%] w-full bg-white rounded-t-3xl p-5"
      >
        <Text className="text-[20px] font-semibold mb-2">Attach files</Text>
        <Text>Choose files to attach to your email</Text>
        <View className="border-t-2 border-[#f1f1f1] mt-2 pt-4">
          <View className="mt-4 flex flex-row items-center border border-[#D0D5DD] p-3 rounded-xl">
            <AddPhotoFromLibraryIcon />
            <Text className="text-[14px] ml-3">Choose from photo library</Text>
          </View>
          <View className="mt-4 flex flex-row items-center border border-[#D0D5DD] p-3 rounded-xl">
            <UploadFromFileManagerIcon />
            <Text className="text-[14px] ml-3">Upload from file manager</Text>
          </View>
          <View className="mt-10 flex flex-row items-center border border-[#FEDF89] p-3 rounded-xl">
            <CautionIcon />
            <View>
              <Text className="text-[16px] font-semibold ml-3 text-[#792E0D]">
                File size limit
              </Text>
              <Text className="text-[14px] mt-3 ml-3 text-[#792E0D]">
                Maximum file size is 25 MB per attachment
              </Text>
            </View>
          </View>
        </View>
      </Animated.View>
    </Modal>
  );
};

export default AttachFilesModal;
