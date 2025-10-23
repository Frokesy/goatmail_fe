import {
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
  Animated,
  TouchableOpacity,
  TextInput,
  Keyboard,
  Alert,
} from "react-native";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContacts } from "@/app/context/contactContext";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

const STORAGE_KEY = "@contacts";

const CreateContactModal = ({
  modalVisible,
  setModalVisible,
}: {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
}) => {
  const { contacts, setContacts } = useContacts();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const clearFields = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
  };

  const handleDone = async () => {
    if (!firstName || !lastName || !email) {
      Alert.alert("Validation", "Please fill all fields.");
      return;
    }

    const newContact: Contact = {
      id: Date.now().toString(),
      firstName,
      lastName,
      email,
    };

    setContacts((prev: any) => [...prev, newContact]);

    try {
      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify([...contacts, newContact])
      );

      clearFields();
      setModalVisible(false);

      Alert.alert("✅ Success", "Contact saved successfully!");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to save contact.");
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        enableOnAndroid
        extraScrollHeight={10}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View className="flex-1 bg-black/40" />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <Animated.View className="absolute bottom-0 min-h-[60%] w-full bg-white rounded-t-3xl p-5">
            <View className="flex flex-row items-center justify-between my-4 border-b border-[#E4E4E7] pb-3">
              <Text className="text-[20px] font-semibold">Create contact</Text>

              <TouchableOpacity onPress={handleDone}>
                <Text className="text-[#1A2E6C] text-[14px] font-medium">
                  Save
                </Text>
              </TouchableOpacity>
            </View>

            <View className="flex flex-col w-[100%] mt-3">
              <Text className="text-[14px] text-[#344054] font-semibold">
                First Name
              </Text>
              <TextInput
                placeholder="John"
                value={firstName}
                onChangeText={setFirstName}
                placeholderTextColor="#9ca3af"
                className="border border-[#D6D6D6] mt-2 p-3 rounded-lg"
              />
            </View>

            <View className="flex flex-col w-[100%] mt-6">
              <Text className="text-[14px] text-[#344054] font-semibold">
                Last Name
              </Text>
              <TextInput
                placeholder="Doe"
                value={lastName}
                onChangeText={setLastName}
                placeholderTextColor="#9ca3af"
                className="border border-[#D6D6D6] mt-2 p-3 rounded-lg"
              />
            </View>

            <View className="flex flex-col w-[100%] mt-3">
              <Text className="text-[14px] text-[#344054] font-medium mt-3">
                Email address
              </Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                className="border border-[#D6D6D6] mt-3 p-3 rounded-lg"
                inputMode="email"
                placeholder="Enter email address"
                placeholderTextColor="#9ca3af"
              />
            </View>
          </Animated.View>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
    </Modal>
  );
};

export default CreateContactModal;
