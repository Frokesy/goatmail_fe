import { SafeAreaView, ScrollView, Text, View } from "react-native";
import Header from "@/components/defaults/Header";
import { useAuth } from "./context/authContext";
import ArrowRight from "@/components/icons/ArrowRight";

const AccountSettings = () => {
  const { user } = useAuth();
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView>
        <Header title="Settings" />
        <View className="py-10 px-6">
          <Text className="text-[16px] font-semibold mb-4">
            Account Settings
          </Text>
          <View className="border-y border-[#E4E4E7] py-3 flex items-center flex-row justify-between">
            <View className="flex flex-row items-center ">
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
                <Text className="text-[12px] mt-1 text-[#737373]">
                  {user?.email}
                </Text>
              </View>
            </View>

            <ArrowRight />
          </View>
          <View className="border-b border-[#E4E4E7] py-3 flex items-center flex-row justify-between">
            <Text className="text-[14px] text-[#333333]">Link devices</Text>
            <ArrowRight />
          </View>

          <View className="mt-10">
            <Text className="text-[16px] font-semibold mb-4">
              Email settings
            </Text>
            <View className="border-y border-[#E4E4E7] py-3 flex items-center flex-row justify-between">
              <Text className="text-[14px] text-[#333333]">Swipe actions</Text>
              <ArrowRight />
            </View>
            <View className="border-b border-[#E4E4E7] py-3 flex items-center flex-row justify-between">
              <Text className="text-[14px] text-[#333333]">
                Swipe to next message
              </Text>
              <ArrowRight />
            </View>
            <View className="border-b border-[#E4E4E7] py-3 flex items-center flex-row justify-between">
              <Text className="text-[14px] text-[#333333]">
                Conversation mode
              </Text>
              <ArrowRight />
            </View>
          </View>

          <View className="mt-10">
            <Text className="text-[16px] font-semibold mb-4">
              Notification settings
            </Text>
            <View className="border-y border-[#E4E4E7] py-3 flex items-center flex-row justify-between">
              <Text className="text-[14px] text-[#333333]">
                Enable push notifications
              </Text>
              <ArrowRight />
            </View>
          </View>

          <View className="mt-10">
            <Text className="text-[16px] font-semibold mb-4">
              General settings
            </Text>
            <View className="border-y border-[#E4E4E7] py-3 flex items-center flex-row justify-between">
              <Text className="text-[14px] text-[#333333]">
                App preferences
              </Text>
              <ArrowRight />
            </View>
            <View className="border-b border-[#E4E4E7] py-3 flex items-center flex-row justify-between">
              <Text className="text-[14px] text-[#333333]">Help & support</Text>
              <ArrowRight />
            </View>
          </View>

          <Text className="text-[14px] text-[#737373] text-center mt-10">
            Goatmail v1.0
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AccountSettings;
