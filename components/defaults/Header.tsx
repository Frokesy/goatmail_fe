import { View, Text } from "react-native";
import React from "react";
import SearchIcon from "../icons/SearchIcon";
import Hamburger from "../icons/Hamburger";

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  return (
    <View className="flex flex-row items-center justify-between border-b-2 border-[#f1f1f1] pb-6">
      <View className="flex flex-row items-center">
        <Hamburger />
        <Text className="text-[20px] font-semibold ml-4">{title}</Text>
      </View>
      <SearchIcon />
    </View>
  );
};

export default Header;
