import { useAuth } from "../../app/context/authContext";
import { useRef, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";

interface DrawerProps {
  drawerVisible: boolean;
  setDrawerVisible: (drawerVisible: boolean) => void;
}

const Drawer = ({ drawerVisible, setDrawerVisible }: DrawerProps) => {
  const slideAnim = useRef(new Animated.Value(-300)).current;
  const { user } = useAuth();

  useEffect(() => {
    if (drawerVisible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -300,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [drawerVisible, slideAnim]);

  return (
    <Modal
      animationType="none"
      transparent
      visible={drawerVisible}
      onRequestClose={() => setDrawerVisible(false)}
    >
      <TouchableWithoutFeedback onPress={() => setDrawerVisible(false)}>
        <View className="flex-1 bg-black/40" />
      </TouchableWithoutFeedback>

      <Animated.View
        style={{
          transform: [{ translateX: slideAnim }],
        }}
        className="absolute left-0 top-0 h-full w-[70%] bg-white p-5 pt-[12vh]"
      >
        <View>
          <View className="flex flex-row items-center">
            <View className="bg-[#EEF0F4] text-[#333333] mr-4 h-[40px] w-[40px] rounded-full flex items-center justify-center">
              <Text>AA</Text>
            </View>
            <View>
              <Text className="text-[16px] font-semibold">
                Ayanfeoluwa Akindele
              </Text>
              <Text className="text-[12px] text-[#737373]">{user?.email}</Text>
            </View>
          </View>
        </View>
      </Animated.View>
    </Modal>
  );
};

export default Drawer;
