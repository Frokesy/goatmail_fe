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
import { useAuth } from "@/app/context/authContext";
import Header from "@/components/defaults/Header";
import ComposeEmailModal from "@/components/modals/ComposeEmailModal";

export interface Draft {
  _id: string;
  to: string[];
  cc: string[];
  bcc: string[];
  subject: string;
  body: string;
  createdAt: string;
  updatedAt: string;
}

const API_URL = "https://goatmailbe-production.up.railway.app/api";

const DraftsScreen = () => {
  const { token } = useAuth();

  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showComposeModal, setShowComposeModal] = useState(false);
  const [selectedDraft, setSelectedDraft] = useState<Draft | null>(null);

  const fetchDrafts = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(`${API_URL}/drafts`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to fetch drafts");

      const data = await res.json();

      if (Array.isArray(data.drafts)) {
        const normalized = data.drafts.map((d: any): Draft => {
          const dateObj = d.updatedAt ? new Date(d.updatedAt) : null;
          const formattedDate = dateObj
            ? dateObj.toLocaleString("en-US", {
                month: "short",
                day: "numeric",
              })
            : "";

          const plainBody = d.body?.replace(/<[^>]+>/g, "") || "";

          return {
            _id: d._id.toString(),
            to: d.to || [],
            cc: d.cc || [],
            bcc: d.bcc || [],
            subject: d.subject || "No subject",
            body: plainBody,
            createdAt: d.createdAt,
            updatedAt: formattedDate,
          };
        });

        setDrafts(normalized);
      } else {
        setDrafts([]);
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchDrafts();
  }, [fetchDrafts]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header title="Drafts" />
      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#000" />
        </View>
      ) : error && drafts.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-red-500">{error}</Text>
        </View>
      ) : drafts.length === 0 ? (
        <ScrollView>
          <View className="min-h-[70vh] flex flex-col items-center justify-center">
            <Image
              source={require("../assets/images/empty-inbox.png")}
              className="w-[114px] h-[100px]"
            />
            <Text className="text-[18px] font-semibold mt-3">No drafts</Text>
            <Text className="text-[#737373] text-[12px] mt-3">
              Compose an email and close to save a draft
            </Text>
          </View>
        </ScrollView>
      ) : (
        <FlatList
          data={drafts}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View
              key={item._id}
              className="flex-row items-start border-b border-gray-200 px-4 py-3"
            >
              <Pressable
                onPress={() => {
                  setSelectedDraft(item);
                  setShowComposeModal(true);
                }}
                className="flex-1"
              >
                <View className="flex-row justify-between">
                  <Text className="font-semibold text-[15px] flex-1">
                    {item.to?.length > 0
                      ? item.to.join(", ")
                      : "(No recipient)"}
                  </Text>
                  <Text className="text-gray-400 text-xs ml-2">
                    {item.updatedAt}
                  </Text>
                </View>
                <Text
                  className="text-[14px] text-gray-800 mt-0.5"
                  numberOfLines={1}
                >
                  {item.subject}
                </Text>
                <Text
                  className="text-gray-500 text-xs mt-0.5"
                  numberOfLines={2}
                >
                  {item.body}
                </Text>
              </Pressable>
            </View>
          )}
        />
      )}

      {showComposeModal && (
        <ComposeEmailModal
          modalVisible={showComposeModal}
          setModalVisible={setShowComposeModal}
          initialDraft={selectedDraft} // custom prop we’ll add
        />
      )}
    </SafeAreaView>
  );
};

export default DraftsScreen;
