import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  LayoutAnimation,
  Platform,
  UIManager,
  ActivityIndicator,
} from "react-native";
import CaretDown from "../icons/CaretDown";

type PricingCardProps = {
  cost: string;
  title: string;
  subtext: string;
  buttonText: string;
  features?: string[];
  bgColor?: string;
  onPress?: () => void;
  textColor?: string;
  loading?: boolean;
};

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const PricingCard: React.FC<PricingCardProps> = ({
  cost,
  title,
  subtext,
  buttonText,
  features = [],
  bgColor = "white",
  textColor,
  onPress,
  loading,
}) => {
  const [expanded, setExpanded] = useState(false);

  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(rotateAnim, {
      toValue: expanded ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [expanded]);

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <View
      className={` p-6 rounded-2xl mb-6`}
      style={{ backgroundColor: bgColor }}
    >
      <View className="flex flex-row justify-between items-center">
        <Text
          className={`${
            textColor === "#FFFFFF" ? "text-white" : "text-black"
          } text-[20px] font-semibold`}
        >
          {cost}
        </Text>
        <TouchableOpacity onPress={toggleExpand}>
          <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
            <CaretDown color={textColor} />
          </Animated.View>
        </TouchableOpacity>
      </View>

      <View className="mt-6">
        <Text
          className={`${
            textColor === "#FFFFFF" ? "text-white" : "text-black"
          } text-[16px] font-semibold`}
        >
          {title}
        </Text>
        <Text
          className={`${
            textColor === "#FFFFFF" ? "text-white" : "text-black"
          } text-[14px] mt-2`}
        >
          {subtext}
        </Text>
      </View>

      {expanded && features.length > 0 && (
        <View className="mt-4">
          {features.map((feature, index) => (
            <Text
              key={index}
              className={`${
                textColor === "#FFFFFF" ? "text-white" : "text-black"
              } text-[14px] mb-2`}
            >
              • {feature}
            </Text>
          ))}
        </View>
      )}

      <View className="w-full mt-10">
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <TouchableOpacity
            onPress={onPress}
            className={`${
              textColor === "#FFFFFF" ? "bg-[#ffffff]" : "bg-[#3D4294]"
            } p-5 rounded-full items-center`}
          >
            <Text
              className={`${
                textColor === "#FFFFFF" ? "text-[#344054]" : "text-white"
              } text-[16px] font-medium`}
            >
              {buttonText}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default PricingCard;
