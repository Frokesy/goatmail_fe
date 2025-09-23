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
  Image,
} from "react-native";
import CaretDown from "../icons/CaretDown";
import WhiteTick from "../icons/WhiteTick";

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
  const [selected, setSelected] = useState<string>("");

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
      className={` p-6 rounded-2xl mb-10`}
      style={{ backgroundColor: bgColor }}
    >
      <View className="flex flex-row justify-between items-center">
        <Text
          className={`${
            textColor === "#FFFFFF" ? "text-white" : "text-black"
          } text-[20px] font-semibold pt-4`}
        >
          ${cost}
        </Text>
        <TouchableOpacity onPress={toggleExpand}>
          <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
            <CaretDown color={textColor} />
          </Animated.View>
        </TouchableOpacity>

        {title.toLowerCase().includes("premium") && (
          <View className="absolute -top-12 right-0">
            <Image source={require("../../assets/images/trial-img.png")} />
          </View>
        )}
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
            <View key={index} className="flex flex-row items-center mb-3">
              <WhiteTick />
              <Text
                key={index}
                className={`${
                  textColor === "#FFFFFF" ? "text-white" : "text-black"
                } text-[14px] ml-3`}
              >
                {feature}
              </Text>
            </View>
          ))}
        </View>
      )}

      <View className="w-full mt-10">
        {loading ? (
          <ActivityIndicator
            color={textColor === "#FFFFFF" ? "#fff" : "#3D4294"}
          />
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
