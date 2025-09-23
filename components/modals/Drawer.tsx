import { useAuth } from "../../app/context/authContext";
import { useRef, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";
import InboxIcon from "../icons/InboxIcon";
import SentIcon from "../icons/SentIcon";
import ScheduledIcon from "../icons/ScheduledIcon";
import StarIcon from "../icons/StarIcon";
import DraftsIcon from "../icons/DraftsIcon";
import ArchiveIcon from "../icons/ArchiveIcon";
import SpamIcon from "../icons/SpamIcon";
import TrashIcon from "../icons/TrashIcon";
import EmailIcon from "../icons/EmailIcon";
import LabelIcon from "../icons/LabelIcon";
import PeopleIcon from "../icons/PeopleIcon";
import SubscriptionIcon from "../icons/SubscriptionIcon";
import SettingsIcon from "../icons/SettingsIcon";
import SignoutIcon from "../icons/SignoutIcon";

interface DrawerProps {
  drawerVisible: boolean;
  setDrawerVisible: (drawerVisible: boolean) => void;
  title: string;
}

const Drawer = ({ drawerVisible, setDrawerVisible, title }: DrawerProps) => {
  const { user } = useAuth();

  const navItems = [
    { id: 1, name: "Inbox", href: "/inbox", icon: <InboxIcon /> },
    { id: 2, name: "Sent", href: "", icon: <SentIcon /> },
    { id: 3, name: "Scheduled", href: "", icon: <ScheduledIcon /> },
    { id: 4, name: "Starred", href: "", icon: <StarIcon /> },
    { id: 5, name: "Drafts", href: "", icon: <DraftsIcon /> },
    { id: 6, name: "Archive", href: "", icon: <ArchiveIcon /> },
    { id: 7, name: "Spam", href: "", icon: <SpamIcon /> },
    { id: 8, name: "Trash", href: "", icon: <TrashIcon /> },
    { id: 9, name: "All mail", href: "", icon: <EmailIcon /> },
    { id: 10, name: "Drafts", href: "", icon: <DraftsIcon /> },
    {
      id: 11,
      name: "New Label",
      href: "",
      icon: <LabelIcon />,
      subgroup: "label",
    },
    {
      id: 12,
      name: "Create group",
      href: "",
      icon: <PeopleIcon />,
      subgroup: "group",
    },
    {
      id: 13,
      name: "Subscription",
      href: "",
      icon: <SubscriptionIcon />,
      subgroup: "extras",
    },
    {
      id: 14,
      name: "Settings",
      href: "",
      icon: <SettingsIcon />,
      subgroup: "extras",
    },
    {
      id: 15,
      name: "Sign out",
      href: "",
      icon: <SignoutIcon />,
      subgroup: "extras",
    },
  ];
  const slideAnim = useRef(new Animated.Value(-900)).current;

  useEffect(() => {
    if (drawerVisible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -900,
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
        className="absolute left-0 top-0 h-full w-[70%] bg-white p-5 pt-[10vh]"
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

          <View className="mt-4 flex flex-col">
            {navItems.map((item) => (
              <View key={item.id}>
                {!item.subgroup && (
                  <View
                    key={item.id}
                    className={`${
                      item.name === title && "bg-[#E8EAF0]"
                    } flex flex-row items-center py-2 px-3 rounded-lg mt-1`}
                  >
                    <View>{item.icon}</View>
                    <Text
                      className={`${
                        item.name === title && "font-semibold"
                      } text-[14px] text-[#101828] ml-3`}
                    >
                      {item.name}
                    </Text>
                  </View>
                )}
                {item.subgroup === "label" && (
                  <View className="mt-10">
                    <Text className="text-[12px] uppercase">Labels</Text>
                    <View
                      key={item.id}
                      className="flex flex-row items-center mt-3"
                    >
                      <View>{item.icon}</View>
                      <Text className="text-[14px] text-[#101828] ml-3">
                        {item.name}
                      </Text>
                    </View>
                  </View>
                )}
                {item.subgroup === "group" && (
                  <View className="my-10">
                    <Text className="text-[12px] uppercase">Groups</Text>
                    <View
                      key={item.id}
                      className="flex flex-row items-center mt-3"
                    >
                      <View>{item.icon}</View>
                      <Text className="text-[14px] text-[#101828] ml-3">
                        {item.name}
                      </Text>
                    </View>
                  </View>
                )}

                {item.subgroup === "extras" && (
                  <View
                    key={item.id}
                    className="flex flex-row items-center mt-3"
                  >
                    <View>{item.icon}</View>
                    <Text className="text-[14px] text-[#101828] ml-3">
                      {item.name}
                    </Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>
      </Animated.View>
    </Modal>
  );
};

export default Drawer;
