import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "@/components/defaults/Header";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import SearchIcon from "@/components/icons/SearchIcon";
import UserIcon from "@/components/icons/UserIcon";
import GroupActionsModal from "@/components/modals/GroupActionsModal";
import { useContacts } from "./context/contactContext";

const CreateGroup = () => {
  const { contacts } = useContacts();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showActions, setShowActions] = useState<boolean>(false);
  const [filtered, setFiltered] = useState<typeof contacts>([]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFiltered(contacts);
      return;
    }

    const results = contacts.filter((c) =>
      `${c.firstName} ${c.lastName} ${c.email}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );

    setFiltered(results);
  }, [searchQuery, contacts]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header
        title="Create group"
        triggerGroupModal={() => setShowActions(true)}
      />

      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        enableOnAndroid
        extraScrollHeight={10}
      >
        <View className="py-10 px-6 flex-1">
          <Text className="text-[16px] font-semibold">Contacts</Text>
          <Text className="mt-1 text-[#333]">
            Group your contacts to send bulk messages
          </Text>

          <View className="mt-10">
            <Text>Search contacts</Text>
            <View className="border border-[#ccc] p-2 mt-3 rounded-lg flex flex-row items-center">
              <SearchIcon />
              <TextInput
                placeholder="Search"
                placeholderTextColor="#9ca3af"
                value={searchQuery}
                onChangeText={setSearchQuery}
                className="border-none ml-3 w-[90%]"
              />
            </View>
          </View>

          {filtered.length > 0 ? (
            <FlatList
              data={filtered}
              keyExtractor={(item, index) => `${item.email}-${index}`}
              style={{ marginTop: 30 }}
              renderItem={({ item }) => (
                <View className="flex flex-row items-center justify-between py-4 border-b border-gray-200">
                  <View>
                    <Text className="text-[16px] font-medium">
                      {item.firstName} {item.lastName}
                    </Text>
                    <Text className="text-[14px] text-gray-500">
                      {item.email}
                    </Text>
                  </View>
                </View>
              )}
            />
          ) : (
            <View className="mt-[20vh] flex flex-col items-center justify-center">
              <UserIcon />
              <Text className="text-[14px] mt-3 text-[#333]">
                You do not have any contact saved.
              </Text>
            </View>
          )}

          <TouchableOpacity className="mt-auto w-full py-4 bg-[#3D4294] rounded-full">
            <Text className="text-white text-center font-medium text-[16px]">
              Create Group
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>

      <GroupActionsModal
        modalVisible={showActions}
        setModalVisible={setShowActions}
      />
    </SafeAreaView>
  );
};

export default CreateGroup;
