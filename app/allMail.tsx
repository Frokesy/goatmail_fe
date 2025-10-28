import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Image,
  SafeAreaView,
  Pressable,
} from 'react-native';
import { useAuth } from './context/authContext';
import Header from '@/components/defaults/Header';
import PenIcon from '@/components/icons/PenIcon';
import ComposeEmailModal from '@/components/modals/ComposeEmailModal';
import UpdateIncomingServerModal from '@/components/modals/UpdateIncomingServerModal';
import { useRouter } from 'expo-router';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';

interface Mail {
  uid: string;
  subject: string;
  from: string;
  date: string;
  excerpt: string;
  starred: boolean;
  mailbox: string;
}

const AllMail = () => {
  const { user, token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [mails, setMails] = useState<Mail[]>([]);
  const [error, setError] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const router = useRouter();

  const apiUrl =
    'http://ec2-51-20-249-56.eu-north-1.compute.amazonaws.com:3000/api';

  const getTagColor = (mailbox: string) => {
    if (/inbox/i.test(mailbox)) return 'bg-blue-100 text-blue-600';
    if (/sent/i.test(mailbox)) return 'bg-green-100 text-green-600';
    if (/draft/i.test(mailbox)) return 'bg-yellow-100 text-yellow-600';
    if (/spam|junk/i.test(mailbox)) return 'bg-red-100 text-red-600';
    if (/trash|bin/i.test(mailbox)) return 'bg-gray-200 text-gray-600';
    if (/archive/i.test(mailbox)) return 'bg-purple-100 text-purple-600';
    return 'bg-gray-100 text-gray-500';
  };

  const fetchAllMail = async () => {
    try {
      setLoading(true);
      setError('');

      const res = await fetch(`${apiUrl}/all-mail`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error('Failed to fetch all mail');

      const data = await res.json();

      if (data && Array.isArray(data.messages)) {
        const normalized = data.messages.map((msg: any) => {
          const dateObj = msg.date ? new Date(msg.date) : null;
          const formattedDate = dateObj
            ? dateObj.toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
              })
            : '';

          return {
            uid: msg.id.toString(),
            subject: msg.subject || 'No subject',
            from: msg.from || 'Unknown sender',
            date: formattedDate,
            excerpt: msg.excerpt || '',
            starred: Boolean(msg.starred),
            mailbox: msg.mailbox || 'Unknown',
          };
        });

        setMails(normalized);
      } else setMails([]);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const toggleStar = async (mailId: string, isStarred: boolean) => {
    try {
      setMails((prev) =>
        prev.map((m) => (m.uid === mailId ? { ...m, starred: !isStarred } : m))
      );

      const res = await fetch(
        `${apiUrl}/${isStarred ? 'unstar-mail/' + mailId : 'star-mail'}`,
        {
          method: isStarred ? 'DELETE' : 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: isStarred ? undefined : JSON.stringify({ mailId }),
        }
      );

      if (!res.ok) throw new Error('Failed to update star status');
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (user && token) fetchAllMail();
  }, [user, token]);

  const renderLeftActions = () => (
    <View className="bg-green-500 justify-center flex-1">
      <Text className="text-white pl-5 font-semibold">Archive</Text>
    </View>
  );

  const renderRightActions = () => (
    <View className="bg-red-500 justify-center items-end flex-1 pr-5">
      <Text className="text-white font-semibold">Delete</Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header title="All Mail" />

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
              source={require('../assets/images/empty-inbox.png')}
              className="w-[114px] h-[100px]"
            />
            <Text className="text-[18px] font-semibold mt-3">
              Nothing to see yet!
            </Text>
            <Text className="text-[#737373] text-[12px] mt-3">
              No messages in All Mail. Check back later.
            </Text>
          </View>
        </ScrollView>
      ) : (
        <ScrollView>
          {mails.map((mail) => (
            <Swipeable
              key={mail.uid}
              renderLeftActions={renderLeftActions}
              renderRightActions={renderRightActions}
            >
              <View className="flex-row items-start border-b border-gray-200 bg-[#fff] px-4 py-3">
                <Pressable onPress={() => toggleStar(mail.uid, mail.starred)}>
                  <Text className="text-xl mr-3">
                    {mail.starred ? '⭐' : '☆'}
                  </Text>
                </Pressable>

                <Pressable
                  onPress={() =>
                    router.push({
                      pathname: '/viewMail',
                      params: { uid: mail.uid, mailbox: 'ALL' },
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

                  {/* 🏷️ Tag */}
                  <View className="flex-row items-center mt-1">
                    <Text
                      className={`text-xs px-2 py-0.5 rounded-full ${getTagColor(
                        mail.mailbox
                      )}`}
                    >
                      {mail.mailbox}
                    </Text>
                  </View>

                  <Text
                    className="text-gray-500 text-xs mt-0.5"
                    numberOfLines={2}
                  >
                    {mail.excerpt}
                  </Text>
                </Pressable>
              </View>
            </Swipeable>
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
      />
    </SafeAreaView>
  );
};

export default AllMail;
