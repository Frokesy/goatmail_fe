import { Path, Svg } from "react-native-svg";

type CaretDownProps = {
  color?: string;
};
const CaretDown = ({ color }: CaretDownProps) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M6 9L12 15L18 9"
        stroke={color || "#141414"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default CaretDown;
