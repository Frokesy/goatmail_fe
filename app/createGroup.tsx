import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  FlatList,
  Pressable,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "@/components/defaults/Header";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import SearchIcon from "@/components/icons/SearchIcon";
import UserIcon from "@/components/icons/UserIcon";
import { useContacts } from "./context/contactContext";
import { Checkbox } from "expo-checkbox";
import PeopleIcon from "@/components/icons/PeopleIcon";
import { useGroups } from "./context/groupsContext";

const CreateGroup = () => {
  const { contacts } = useContacts();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filtered, setFiltered] = useState<typeof contacts>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [groupModalVisible, setGroupModalVisible] = useState(false);
  const [groupName, setGroupName] = useState("");
  const { addGroup } = useGroups();

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

  const toggleSelect = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleCreateGroup = () => {
    if (selected.length === 0) return alert("Select at least one contact");
    setGroupModalVisible(true);
  };

  const handleSaveGroup = async () => {
    if (!groupName.trim()) return alert("Enter a group name");
    if (selected.length === 0) return alert("Select at least one contact");

    try {
      await addGroup({
        name: groupName.trim(),
        memberIds: selected,
      });

      console.log("✅ Group saved:", groupName, selected);

      setGroupModalVisible(false);
      setGroupName("");
      setSelected([]);
    } catch (error) {
      console.error("Failed to save group:", error);
    }
  };
  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header title="Create group" />

      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        enableOnAndroid
        extraScrollHeight={10}
      >
        <View className="py-10 px-6 flex-1">
          <Text className="text-[16px] font-semibold">Contacts</Text>
          <Text className="mt-1 text-[#333]">
            Select contacts to include in a new group
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
              scrollEnabled={false}
              keyExtractor={(item) => item.id}
              style={{ marginTop: 30 }}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => toggleSelect(item.id)}
                  className="flex flex-row items-center justify-between py-4 border-b border-gray-200"
                >
                  <View>
                    <Text className="text-[16px] font-medium">
                      {item.firstName} {item.lastName}
                    </Text>
                    <Text className="text-[14px] text-gray-500">
                      {item.email}
                    </Text>
                  </View>

                  <Checkbox
                    value={selected.includes(item.id)}
                    onValueChange={() => toggleSelect(item.id)}
                    color={selected.includes(item.id) ? "#3D4294" : undefined}
                    style={{
                      width: 14,
                      height: 14,
                      borderRadius: 6,
                      borderColor: "#ccc",
                    }}
                  />
                </Pressable>
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

          {/* Create Group button */}
          <TouchableOpacity
            onPress={handleCreateGroup}
            className="mt-auto w-full py-4 bg-[#3D4294] rounded-full"
          >
            <Text className="text-white text-center font-medium text-[16px]">
              Create Group
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>

      {/* Group Name Modal */}
      <Modal
        animationType="slide"
        transparent
        visible={groupModalVisible}
        onRequestClose={() => setGroupModalVisible(false)}
      >
        <Pressable
          onPress={() => setGroupModalVisible(false)}
          className="flex-1 justify-center items-center bg-black/30"
        >
          <Pressable
            onPress={() => {}}
            className="w-[85%] bg-white rounded-2xl p-6"
          >
            <View className="flex w-auto flex-row items-center justify-center mb-2">
              <View className="bg-[#E8EAF0] p-4 rounded-full">
                <PeopleIcon />
              </View>
            </View>
            <Text className="text-[20px] font-bold text-center">
              Create Group
            </Text>
            <Text className="text-[#6B7280] text-[14px] mt-2 text-center">
              Enter a name for your new contact group
            </Text>

            <TextInput
              placeholder="Group name"
              value={groupName}
              onChangeText={setGroupName}
              className="border border-[#D6D6D6] mt-4 p-3 rounded-lg"
            />

            <View className="flex flex-row justify-between mt-5">
              <Pressable
                onPress={() => setGroupModalVisible(false)}
                className="border border-[#3D4294] rounded-full w-[45%] py-3 items-center"
              >
                <Text className="text-[#3D4294] font-medium">Cancel</Text>
              </Pressable>

              <Pressable
                onPress={handleSaveGroup}
                className="bg-[#3D4294] rounded-full w-[45%] py-3 items-center"
              >
                <Text className="text-white font-medium">Save</Text>
              </Pressable>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
};

export default CreateGroup;
