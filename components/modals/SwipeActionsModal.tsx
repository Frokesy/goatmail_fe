import {
  View,
  Text,
  Modal,
  Animated,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import ArchiveIcon from "../icons/ArchiveIcon";
import TrashIcon from "../icons/TrashIcon";
import InboxIcon from "../icons/InboxIcon";
import SpamIcon from "../icons/SpamIcon";
import XIcon from "../icons/XIcon";
import { Checkbox } from "expo-checkbox";
import { useState } from "react";

const SwipeActionsModal = ({
  modalVisible,
  setModalVisible,
  swipeAction,
}: {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  swipeAction: "left" | "right";
}) => {
  const [selectedAction, setSelectedAction] = useState<string | null>(null);

  const actions = [
    { label: "Archive", value: "archive", icon: <ArchiveIcon /> },
    { label: "Move to trash", value: "trash", icon: <TrashIcon /> },
    { label: "Mark as read/unread", value: "readStatus", icon: <InboxIcon /> },
    { label: "Move to spam", value: "spam", icon: <SpamIcon /> },
    { label: "None", value: "none", icon: <XIcon /> },
  ];

  const handleSelect = (value: string) => {
    setSelectedAction((prev) => (prev === value ? null : value));
  };

  const handleDone = () => {
    setModalVisible(false);
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

      <Animated.View className="absolute bottom-0 min-h-[50%] w-full bg-white rounded-t-3xl p-5">
        <View className="flex flex-row items-center justify-between my-4 border-b border-[#E4E4E7] pb-3">
          <Text className="text-[20px] font-semibold">
            Swipe to {swipeAction}
          </Text>
          <TouchableOpacity onPress={handleDone}>
            <Text className="text-[#1A2E6C] text-[14px] font-medium">Done</Text>
          </TouchableOpacity>
        </View>

        <View className="mt-4">
          {actions.map((action) => (
            <TouchableOpacity
              key={action.value}
              activeOpacity={0.8}
              onPress={() => handleSelect(action.value)}
            >
              <View className="flex flex-row justify-between items-center p-3 rounded-lg mt-3 border border-[#E4E4E7]">
                <View className="flex flex-row items-center">
                  {action.icon}
                  <Text className="text-[14px] ml-4">{action.label}</Text>
                </View>
                <Checkbox
                  value={selectedAction === action.value}
                  onValueChange={() => handleSelect(action.value)}
                  style={{
                    width: 14,
                    height: 14,
                    borderRadius: 4,
                    borderColor: "#999",
                  }}
                  color={
                    selectedAction === action.value ? "#1A2E6C" : undefined
                  }
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </Animated.View>
    </Modal>
  );
};

export default SwipeActionsModal;
