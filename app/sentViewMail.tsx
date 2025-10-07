import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  useWindowDimensions,
} from "react-native";
import { useSearchParams } from "expo-router/build/hooks";
import { useAuth } from "@/app/context/authContext";
import RenderHtml from "react-native-render-html";
import Header from "@/components/defaults/Header";

interface SentMailDetail {
  uid: string;
  subject: string;
  from: string;
  to: string[];
  date: string;
  body: string;
}

const apiUrl =
  "http://ec2-13-60-67-114.eu-north-1.compute.amazonaws.com:3000/api";
const SentViewMail = () => {
  const { width } = useWindowDimensions();
  const { token } = useAuth();
  const searchParams = useSearchParams();
  const uid = searchParams.get("uid") || "";

  const [mail, setMail] = useState<SentMailDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMail = async () => {
      try {
        if (!uid) throw new Error("Mail ID missing");

        const res = await fetch(`${apiUrl}/sent-emails/${uid}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to fetch sent email");

        const data = await res.json();
        if (!data.email) throw new Error("Email not found");

        const msg = data.email;

        setMail({
          uid: msg._id,
          subject: msg.subject || "(no subject)",
          from: msg.from || "Me",
          to: msg.to || [],
          date: msg.sentAt
            ? new Date(msg.sentAt).toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
              })
            : "",
          body: msg.body || "",
        });
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchMail();
  }, [uid, token]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header title="Mail" />
      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" />
        </View>
      ) : error ? (
        <View className="flex-1 items-center justify-center p-4">
          <Text className="text-red-500">{error}</Text>
        </View>
      ) : mail ? (
        <ScrollView className="flex-1 p-4">
          <Text className="text-xl font-semibold flex-1 pr-3">
            {mail.subject}
          </Text>
          <View className="py-3 flex-row items-center border-b-2 border-[#f1f1f1]">
            <View className="w-10 h-10 bg-blue-500 rounded-full items-center justify-center mr-3">
              <Text className="text-white font-bold text-lg">
                {mail.from[0].toUpperCase()}
              </Text>
            </View>
            <View>
              <Text className="text-gray-800 font-medium">{mail.from}</Text>
              <Text className="text-gray-500 text-sm">To: {mail.to}</Text>
              <Text className="text-gray-400 text-xs mt-1">{mail.date}</Text>
            </View>
          </View>

          <View className="px-4 py-4">
            <RenderHtml
              contentWidth={width - 32}
              source={{ html: mail.body }}
              baseStyle={{ fontSize: 15, lineHeight: 24, color: "#202124" }}
              tagsStyles={{
                a: { color: "#1a73e8", textDecorationLine: "underline" },
                p: { marginVertical: 6 },
                img: {
                  borderRadius: 8,
                  marginVertical: 8,
                },
                blockquote: {
                  paddingLeft: 12,
                  color: "#5f6368",
                  fontStyle: "italic",
                  marginVertical: 8,
                  backgroundColor: "#f8f9fa",
                  borderLeftWidth: 0,
                },
                ul: { marginVertical: 6, paddingLeft: 20 },
                li: { marginVertical: 2 },
                table: { borderWidth: 0, marginVertical: 8 },
                td: { padding: 8, borderWidth: 0 },
              }}
              ignoredDomTags={["meta", "link", "style"]}
            />
          </View>
        </ScrollView>
      ) : null}
    </SafeAreaView>
  );
};

export default SentViewMail;
