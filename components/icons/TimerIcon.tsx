import { Svg, Path } from "react-native-svg";

const TimerIcon = () => {
  return (
    <Svg width="20" height="21" viewBox="0 0 20 21" fill="none">
      <Path
        d="M4.58268 7.41939L2.11422 7.41939C3.61361 3.4619 7.91851 1.20785 12.1157 2.32855C16.586 3.52218 19.2413 8.09215 18.0465 12.5359C16.8516 16.9796 12.259 19.6143 7.78868 18.4206C4.46951 17.5344 2.15095 14.7868 1.66602 11.6116"
        stroke="#01110D"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <Path
        d="M10 6.20789V10.3746L12.0833 12.4579"
        stroke="#01110D"
        strokeWidth="1.5"
      />
    </Svg>
  );
};

export default TimerIcon;
