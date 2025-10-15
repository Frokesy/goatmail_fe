import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import Header from "@/components/defaults/Header";
import ColorPicker from "react-native-wheel-color-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const presetColors = [
  "#FF3B30", // red
  "#FF9500", // orange
  "#FFCC00", // yellow
  "#34C759", // green
  "#007AFF", // blue
  "#AF52DE", // purple
  "#5AC8FA", // cyan
  "#8E8E93", // gray
];

const NewLabel = () => {
  const [labelName, setLabelName] = useState("");
  const [color, setColor] = useState("#007AFF");
  const [hexInput, setHexInput] = useState("#007AFF");
  const [showPicker, setShowPicker] = useState(false);

  const handleSaveLabel = async () => {
    if (!labelName.trim()) {
      Alert.alert("Missing name", "Please enter a label name.");
      return;
    }

    try {
      const existingLabels = await AsyncStorage.getItem("labels");
      const parsed = existingLabels ? JSON.parse(existingLabels) : [];

      const newLabel = { name: labelName, color };
      const updatedLabels = [...parsed, newLabel];

      await AsyncStorage.setItem("labels", JSON.stringify(updatedLabels));

      Alert.alert("Saved ✅", `Label "${labelName}" added successfully.`);
      setLabelName("");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to save label. Please try again.");
    }
  };

  const handleHexInput = (value: string) => {
    setHexInput(value);

    const cleaned = value.trim();

    if (/^#[0-9A-Fa-f]{6}$/.test(cleaned)) {
      setColor(cleaned);
    }
  };

  const handleWheelChange = (newColor: string) => {
    setColor(newColor);
    setHexInput(newColor);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header title="New Label" />
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        enableOnAndroid
        extraScrollHeight={10}
      >
        <View className="py-10 px-6">
          <View className="flex flex-col w-[100%] mt-3">
            <Text className="text-[14px] text-[#344054] font-semibold">
              Label name
            </Text>
            <TextInput
              placeholder="Enter label name"
              placeholderTextColor="#9ca3af"
              value={labelName}
              onChangeText={setLabelName}
              className="border border-[#D6D6D6] mt-2 p-3 rounded-lg"
            />
          </View>

          <View className="flex flex-col w-[100%] mt-6">
            <Text className="text-[14px] text-[#344054] font-semibold mb-3">
              Choose a color
            </Text>

            <View className="flex flex-row flex-wrap gap-3">
              {presetColors.map((preset) => (
                <TouchableOpacity
                  key={preset}
                  onPress={() => {
                    setColor(preset);
                    setHexInput(preset);
                  }}
                  className="w-10 h-10 rounded-full border border-[#E4E4E7]"
                  style={{
                    backgroundColor: preset,
                    borderWidth: color === preset ? 3 : 1,
                    borderColor: color === preset ? "#0D6EFD" : "#E4E4E7",
                  }}
                />
              ))}

              <TouchableOpacity
                onPress={() => setShowPicker(!showPicker)}
                className="w-10 h-10 rounded-full border border-[#E4E4E7] flex items-center justify-center"
              >
                <Text className="text-[#344054] text-lg">+</Text>
              </TouchableOpacity>
            </View>

            {showPicker && (
              <View className="mt-8">
                <ColorPicker
                  color={color}
                  onColorChange={handleWheelChange}
                  thumbSize={30}
                  sliderSize={30}
                  noSnap
                  row={false}
                />

                <View
                  className="w-full h-12 rounded-lg mt-5 border border-[#E4E4E7]"
                  style={{ backgroundColor: color }}
                />

                <TextInput
                  placeholder="#RRGGBB"
                  placeholderTextColor="#9ca3af"
                  value={hexInput}
                  onChangeText={handleHexInput}
                  autoCapitalize="none"
                  autoCorrect={false}
                  maxLength={7}
                  className="border border-[#D6D6D6] mt-4 p-3 rounded-lg text-center"
                />
              </View>
            )}
          </View>

          <TouchableOpacity
            onPress={handleSaveLabel}
            className="mt-20 w-full py-4 bg-[#3D4294] rounded-full"
          >
            <Text className="text-white text-center font-medium text-[16px]">
              Add Label
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default NewLabel;
