import React from "react";
import { Svg, Rect, Circle, Defs, ClipPath } from "react-native-svg";

const GreyDot = ({ color }: { color?: string }) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Defs>
        <ClipPath id="clip0_857_22790">
          <Rect width="24" height="24" rx="12" fill="white" />
        </ClipPath>
      </Defs>

      <Rect
        width="24"
        height="24"
        rx="12"
        fill="white"
        clipPath="url(#clip0_857_22790)"
      />
      <Rect
        x="0.75"
        y="0.75"
        width="22.5"
        height="22.5"
        rx="11.25"
        stroke={color ? color : "#D1D5DB"}
        strokeWidth="1.5"
        fill="none"
      />
      <Circle cx="12" cy="12" r="4" fill={color ? color : "#D1D5DB"} />
    </Svg>
  );
};

export default GreyDot;
