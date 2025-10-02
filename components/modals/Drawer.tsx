import { useAuth } from "../../app/context/authContext";
import { useRef, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  Animated,
  TouchableWithoutFeedback,
  Pressable,
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
import { Route, useRouter } from "expo-router";

interface DrawerProps {
  drawerVisible: boolean;
  setDrawerVisible: (drawerVisible: boolean) => void;
  title: string;
}

const Drawer = ({ drawerVisible, setDrawerVisible, title }: DrawerProps) => {
  const { user, logout } = useAuth();
  const router = useRouter();

  const navItems = [
    { id: 1, name: "Inbox", href: "/inbox", icon: <InboxIcon /> },
    { id: 2, name: "Sent", href: "/sent", icon: <SentIcon /> },
    { id: 3, name: "Scheduled", icon: <ScheduledIcon /> },
    { id: 4, name: "Starred", href: "/starred", icon: <StarIcon /> },
    { id: 5, name: "Drafts", href: "/drafts", icon: <DraftsIcon /> },
    { id: 6, name: "Archive", href: "/archived", icon: <ArchiveIcon /> },
    { id: 7, name: "Spam", icon: <SpamIcon /> },
    { id: 8, name: "Trash", href: "/trash", icon: <TrashIcon /> },
    { id: 9, name: "All mail", icon: <EmailIcon /> },
    {
      id: 11,
      name: "New Label",
      icon: <LabelIcon />,
      subgroup: "label",
    },
    {
      id: 12,
      name: "Create group",
      icon: <PeopleIcon />,
      subgroup: "group",
    },
    {
      id: 13,
      name: "Subscription",
      icon: <SubscriptionIcon />,
      subgroup: "extras",
    },
    {
      id: 14,
      name: "Settings",
      icon: <SettingsIcon />,
      subgroup: "extras",
    },
    {
      id: 15,
      name: "Sign out",
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

  const handlePress = (href: Route | undefined) => {
    router.replace(href ? href : "/+not-found");
    setDrawerVisible(false);
  };

  const handleLogout = async () => {
    await logout();
    setDrawerVisible(false);
    router.replace("/");
  };

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
        style={{ transform: [{ translateX: slideAnim }] }}
        className="absolute left-0 top-0 h-full w-[70%] bg-white p-5 pt-[10vh]"
      >
        <View>
          <View className="flex flex-row items-center">
            <View className="bg-[#EEF0F4] text-[#333333] mr-4 h-[40px] w-[40px] rounded-full flex items-center justify-center">
              <Text className="font-semibold text-[#333333]">
                {(() => {
                  if (!user?.name) return "";
                  const parts = user.name.trim().split(" ");
                  if (parts.length === 1) {
                    return parts[0].substring(0, 2).toUpperCase();
                  }
                  return (parts[0][0] + parts[1][0]).toUpperCase();
                })()}
              </Text>
            </View>
            <View>
              <Text className="text-[16px] font-semibold">{user?.name}</Text>
              <Text className="text-[12px] text-[#737373]">{user?.email}</Text>
            </View>
          </View>

          <View className="mt-4 flex flex-col">
            {navItems.map((item) => (
              <View key={item.id}>
                {!item.subgroup && (
                  <Pressable onPress={() => handlePress(item.href as Route)}>
                    <View
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
                  </Pressable>
                )}

                {item.subgroup === "label" && (
                  <View className="mt-10">
                    <Text className="text-[12px] uppercase">Labels</Text>
                    <View className="flex flex-row items-center mt-3">
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
                    <View className="flex flex-row items-center mt-3">
                      <View>{item.icon}</View>
                      <Text className="text-[14px] text-[#101828] ml-3">
                        {item.name}
                      </Text>
                    </View>
                  </View>
                )}

                {item.subgroup === "extras" && (
                  <>
                    {item.name === "Sign out" ? (
                      <Pressable onPress={handleLogout}>
                        <View className="flex flex-row items-center mt-3">
                          <View>{item.icon}</View>
                          <Text className="text-[14px] text-[#101828] ml-3">
                            {item.name}
                          </Text>
                        </View>
                      </Pressable>
                    ) : (
                      <View className="flex flex-row items-center mt-3">
                        <View>{item.icon}</View>
                        <Text className="text-[14px] text-[#101828] ml-3">
                          {item.name}
                        </Text>
                      </View>
                    )}
                  </>
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
