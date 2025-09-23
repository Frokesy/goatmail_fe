import { Svg, Path } from "react-native-svg";

const Hamburger = () => {
  return (
    <Svg width="24" height="25" viewBox="0 0 24 25" fill="none">
      <Path
        d="M3 12.5H17M3 6.5H21M3 18.5H21"
        stroke="#475467"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default Hamburger;
