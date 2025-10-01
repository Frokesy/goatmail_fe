import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Image,
  SafeAreaView,
  Pressable,
} from "react-native";
import { useAuth } from "./context/authContext";
import Header from "@/components/defaults/Header";
import PenIcon from "@/components/icons/PenIcon";
import ComposeEmailModal from "@/components/modals/ComposeEmailModal";
import UpdateIncomingServerModal from "@/components/modals/UpdateIncomingServerModal";
import { useRouter } from "expo-router";

interface Mail {
  uid: string;
  subject: string;
  from: string;
  date: string;
  excerpt: string;
  starred: boolean;
}

interface IncomingServer {
  serverType: string;
  serverName: string;
  port: string;
  security: string;
  password?: string;
}

const Inbox = () => {
  const { user, token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [mails, setMails] = useState<Mail[]>([]);
  const [error, setError] = useState("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  const router = useRouter();

  // incoming server fields
  const [serverType, setServerType] = useState("");
  const [serverName, setServerName] = useState("");
  const [port, setPort] = useState("");
  const [security, setSecurity] = useState("");
  const [password, setPassword] = useState("");
  const [updating, setUpdating] = useState(false);

  const API_URL = "http://192.168.1.117:3000/api";

  const fetchInbox = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch(`${API_URL}/inbox`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch inbox");
      }

      const data = await res.json();

      if (data && Array.isArray(data.messages)) {
        const normalized = data.messages.map((msg: any) => {
          const dateObj = msg.date ? new Date(msg.date) : null;
          const formattedDate = dateObj
            ? dateObj.toLocaleString("en-US", {
                month: "short",
                day: "numeric",
              })
            : "";

          return {
            uid: msg.id.toString(),
            subject: msg.subject || "No subject",
            from: msg.from || "Unknown sender",
            date: formattedDate,
            excerpt: msg.excerpt || "",
            starred: Boolean(msg.starred),
          };
        });

        setMails(normalized);
      } else {
        setMails([]);
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong");
      console.log(password);
      setUpdateModalVisible(true);
      fetchIncomingServer();
    } finally {
      setLoading(false);
    }
  };

  const fetchIncomingServer = async () => {
    try {
      const res = await fetch(`${API_URL}/incoming-server`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) return;

      const data: IncomingServer = await res.json();
      if (data) {
        setServerType(data.serverType || "");
        setServerName(data.serverName || "");
        setPort(data.port?.toString() || "");
        setSecurity(data.security || "");
      }
      console.log("incoming", data);
    } catch (err) {
      console.log("Failed to fetch incoming server settings:", err);
    }
  };

  const handleUpdateIncomingServer = async ({
    serverType,
    serverName,
    port,
    security,
    password,
  }: {
    serverType: string;
    serverName: string;
    port: string;
    security: string;
    password: string;
  }) => {
    if (!serverType || !serverName || !port || !security || !password) {
      setError("All fields are required");
      return;
    }

    try {
      setUpdating(true);
      const res = await fetch(`${API_URL}/update-incoming-password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: user?.email,
          serverType,
          serverName,
          port,
          security,
          password,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update server settings");
      }

      setUpdateModalVisible(false);
      setPassword("");
      fetchInbox();
    } catch (err: any) {
      setError(err.message || "Error updating server settings");
    } finally {
      setUpdating(false);
    }
  };

  const toggleStar = async (mailId: string, isStarred: boolean) => {
    try {
      setMails((prev) =>
        prev.map((m) => (m.uid === mailId ? { ...m, starred: !isStarred } : m))
      );

      let res;
      if (isStarred) {
        res = await fetch(`${API_URL}/unstar-mail/${mailId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        res = await fetch(`${API_URL}/star-mail`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ mailId }),
        });
      }

      if (!res.ok) {
        throw new Error("Failed to update star status");
      }
    } catch (err) {
      console.error(err);
      setMails((prev) =>
        prev.map((m) => (m.uid === mailId ? { ...m, starred: isStarred } : m))
      );
    }
  };

  useEffect(() => {
    if (user && token) {
      fetchInbox();
    }
  }, [user, token]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header title="Inbox" />
      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#000" />
        </View>
      ) : error && mails.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-red-500">{error}</Text>
        </View>
      ) : mails.length === 0 ? (
        <ScrollView>
          <View className="min-h-[70vh] flex flex-col items-center justify-center">
            <Image
              source={require("../assets/images/empty-inbox.png")}
              className="w-[114px] h-[100px]"
            />
            <Text className="text-[18px] font-semibold mt-3">
              Nothing to see yet!
            </Text>
            <Text className="text-[#737373] text-[12px] mt-3">
              No new messages in your inbox. Check back later.
            </Text>
          </View>
        </ScrollView>
      ) : (
        <ScrollView>
          {Array.isArray(mails) &&
            mails.map((mail) => (
              <View
                key={mail.uid}
                className="flex-row items-start border-b border-gray-200 px-4 py-3"
              >
                <Pressable onPress={() => toggleStar(mail.uid, mail.starred)}>
                  <Text className="text-xl mr-3">
                    {mail.starred ? "⭐" : "☆"}
                  </Text>
                </Pressable>

                <Pressable
                  onPress={() =>
                    router.push({
                      pathname: "/viewMail",
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
            ))}
        </ScrollView>
      )}
      <Pressable
        onPress={() => setModalVisible(true)}
        className="absolute bottom-20 right-10 bg-[#EEF0F4] rounded-full h-[64px] w-[64px] flex items-center justify-center"
      >
        <PenIcon />
      </Pressable>
      <ComposeEmailModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <UpdateIncomingServerModal
        visible={updateModalVisible}
        onClose={() => setUpdateModalVisible(false)}
        initialValues={{ serverType, serverName, port, security }}
        loading={updating}
        error={error}
        onUpdate={async (values) => {
          await handleUpdateIncomingServer(values);
        }}
      />
    </SafeAreaView>
  );
};

export default Inbox;
