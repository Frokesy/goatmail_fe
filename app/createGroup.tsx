import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Header from "@/components/defaults/Header";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import SearchIcon from "@/components/icons/SearchIcon";
import UserIcon from "@/components/icons/UserIcon";

const CreateGroup = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
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

          <View className="mt-[20vh] flex flex-col items-center justify-center">
            <UserIcon />
            <Text className="text-[14px] mt-3 text-[#333]">
              You do not have any contact saved.
            </Text>
          </View>

          <TouchableOpacity className="mt-auto w-full py-4 bg-[#3D4294] rounded-full">
            <Text className="text-white text-center font-medium text-[16px]">
              Create Group
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default CreateGroup;
