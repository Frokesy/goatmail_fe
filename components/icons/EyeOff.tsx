import Svg, { Path } from "react-native-svg";

const EyeOffIcon = ({ size = 20, color = "#737373" }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M17.94 17.94C16.2304 19.0122 14.1648 19.6163 12.05 19.6667C6.66667 19.6667 2 12 2 12C3.24394 9.92564 4.98431 8.20723 7.06 7.06M10.59 10.59C10.2107 10.9701 9.9997 11.4699 10 12C10 13.1046 10.8954 14 12 14C12.5301 14.0003 13.0299 13.7893 13.41 13.41M14.12 14.12L19 19M4 4L20 20"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default EyeOffIcon;
