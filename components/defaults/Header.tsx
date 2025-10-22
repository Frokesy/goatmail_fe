import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import SearchIcon from "../icons/SearchIcon";
import Hamburger from "../icons/Hamburger";
import Drawer from "../modals/Drawer";
import LabelIcon from "../icons/LabelIcon";

interface HeaderProps {
  title: string;
  triggerGroupModal?: (value: React.SetStateAction<boolean>) => void;
}

const Header = ({ title, triggerGroupModal }: HeaderProps) => {
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
  return (
    <View className="flex flex-row items-center justify-between border-b-2 border-[#f1f1f1] px-6 pt-10 pb-6">
      <View className="flex flex-row items-center">
        <Pressable onPress={() => setDrawerVisible(true)}>
          <Hamburger />
        </Pressable>
        <Text className="text-[20px] font-semibold ml-4">{title}</Text>
      </View>
      {title === "Create group" ? (
        <Pressable onPress={() => triggerGroupModal?.(true)}>
          <LabelIcon />
        </Pressable>
      ) : (
        <SearchIcon />
      )}

      <Drawer
        title={title}
        drawerVisible={drawerVisible}
        setDrawerVisible={setDrawerVisible}
      />
    </View>
  );
};

export default Header;
