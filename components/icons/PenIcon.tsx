import { G, Svg, Path, Defs, ClipPath, Rect } from "react-native-svg";

const PenIcon = () => {
  return (
    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <G clipPath="url(#clip0_380_57387)">
        <Path
          d="M14.166 2.49999C14.3849 2.28112 14.6447 2.1075 14.9307 1.98905C15.2167 1.8706 15.5232 1.80963 15.8327 1.80963C16.1422 1.80963 16.4487 1.8706 16.7347 1.98905C17.0206 2.1075 17.2805 2.28112 17.4993 2.49999C17.7182 2.71886 17.8918 2.97869 18.0103 3.26466C18.1287 3.55063 18.1897 3.85713 18.1897 4.16665C18.1897 4.47618 18.1287 4.78268 18.0103 5.06865C17.8918 5.35461 17.7182 5.61445 17.4993 5.83332L6.24935 17.0833L1.66602 18.3333L2.91602 13.75L14.166 2.49999Z"
          stroke="#182A62"
          strokeWidth="1.67"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_380_57387">
          <Rect width="20" height="20" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default PenIcon;
