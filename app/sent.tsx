import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/app/context/authContext";
import Header from "@/components/defaults/Header";

interface SentEmail {
  uid: string;
  subject: string;
  from: string;
  to: string[];
  date: string;
  excerpt: string;
}

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

const SentEmailsScreen = () => {
  const router = useRouter();
  const { token } = useAuth();

  const [emails, setEmails] = useState<SentEmail[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchSentEmails = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(`${apiUrl}/sent-emails`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to fetch sent emails");

      const data = await res.json();

      if (Array.isArray(data.emails)) {
        const normalized = data.emails.map((msg: any): SentEmail => {
          const dateObj = msg.sentAt ? new Date(msg.sentAt) : null;
          const formattedDate = dateObj
            ? dateObj.toLocaleString("en-US", {
                month: "short",
                day: "numeric",
              })
            : "";

          const plainBody = msg.body?.replace(/<[^>]+>/g, "") || "";

          return {
            uid: msg._id.toString(),
            subject: msg.subject || "No subject",
            from: msg.senderName || msg.from || "Me",
            to: msg.to || [],
            date: formattedDate,
            excerpt: plainBody.slice(0, 80),
          };
        });

        setEmails(normalized);
      } else {
        setEmails([]);
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchSentEmails();
  }, [fetchSentEmails]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header title="Sent" />
      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#000" />
        </View>
      ) : error && emails.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-red-500">{error}</Text>
        </View>
      ) : emails.length === 0 ? (
        <ScrollView>
          <View className="min-h-[70vh] flex flex-col items-center justify-center">
            <Image
              source={require("../assets/images/empty-inbox.png")}
              className="w-[114px] h-[100px]"
            />
            <Text className="text-[18px] font-semibold mt-3">
              No sent emails
            </Text>
            <Text className="text-[#737373] text-[12px] mt-3">
              Send an email to have it saved here
            </Text>
          </View>
        </ScrollView>
      ) : (
        <FlatList
          data={emails}
          keyExtractor={(item) => item.uid}
          renderItem={({ item: mail }) => (
            <View
              key={mail.uid}
              className="flex-row items-start border-b border-gray-200 px-4 py-3"
            >
              <Pressable
                onPress={() =>
                  router.push({
                    pathname: "/sentViewMail",
                    params: { uid: mail.uid },
                  })
                }
                className="flex-1"
              >
                <View className="flex-row justify-between">
                  <Text className="font-semibold text-[15px] flex-1">
                    {mail.from}
                  </Text>
                  <Text className="text-gray-400 text-xs ml-2">
                    {mail.date}
                  </Text>
                </View>
                <Text
                  className="text-[14px] text-gray-800 mt-0.5"
                  numberOfLines={1}
                >
                  {mail.subject}
                </Text>
                <Text
                  className="text-gray-500 text-xs mt-0.5"
                  numberOfLines={2}
                >
                  {mail.excerpt}
                </Text>
              </Pressable>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default SentEmailsScreen;
