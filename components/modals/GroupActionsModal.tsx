import {
  View,
  Text,
  Modal,
  Animated,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import UserPlusIcon from "../icons/UserPlusIcon";
import UploadIcon from "../icons/UploadIcon";

const GroupActionsModal = ({
  modalVisible,
  setModalVisible,
}: {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
}) => {
  const actions = [
    { label: "Create Contact", value: "createContact", icon: <UserPlusIcon /> },
    { label: "Upload Contacts", value: "uploadContacts", icon: <UploadIcon /> },
  ];

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

      <Animated.View className="absolute bottom-0 min-h-[30%] w-full bg-white rounded-t-3xl p-5">
        <View className="flex flex-row items-center justify-between my-4 border-b border-[#E4E4E7] pb-3">
          <Text className="text-[20px] font-semibold">Actions</Text>
        </View>

        <View className="">
          {actions.map((action) => (
            <TouchableOpacity key={action.value} activeOpacity={0.8}>
              <View className="flex flex-row items-center p-3 rounded-lg mt-3 border border-[#E4E4E7]">
                {action.icon}
                <Text className="text-[14px] ml-4">{action.label}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </Animated.View>
    </Modal>
  );
};

export default GroupActionsModal;
