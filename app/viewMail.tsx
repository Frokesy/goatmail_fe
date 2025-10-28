import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Pressable,
  ActivityIndicator,
  useWindowDimensions,
} from 'react-native';
import Header from '@/components/defaults/Header';
import { useSearchParams } from 'expo-router/build/hooks';
import { useAuth } from './context/authContext';
import RenderHtml from 'react-native-render-html';
import { cleanMailHtml } from '@/helpers/email';

interface MailDetail {
  uid: string;
  subject: string;
  from: string;
  to: string;
  date: string;
  starred: boolean;
  body: string;
}

const apiUrl =
  'http://ec2-51-20-249-56.eu-north-1.compute.amazonaws.com:3000/api';
const ViewMail = () => {
  const { width } = useWindowDimensions();
  const searchParams = useSearchParams();
  const { token } = useAuth();
  const uid = searchParams.get('uid') || '';
  const mailbox = searchParams.get('mailbox') || 'INBOX';
  const [mail, setMail] = useState<MailDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  console.log(mailbox);

  useEffect(() => {
    const fetchMail = async () => {
      try {
        if (!uid) throw new Error('Mail UID is missing');
        setLoading(true);
        const res = await fetch(`${apiUrl}/mail/${mailbox}/${uid}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error('Failed to fetch email');

        const data = await res.json();
        if (!data.mail) throw new Error('Email not found');
        console.log(data.mail.body, 'main res');
        setMail({
          uid: data.mail.id.toString(),
          subject: data.mail.subject || '(no subject)',
          from: data.mail.from || '(unknown sender)',
          to: data.mail.to || 'you@example.com',
          date: data.mail.date
            ? new Date(data.mail.date).toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
              })
            : '',
          starred: Boolean(data.mail.starred),
          body: cleanMailHtml(data.mail.body || ''),
        });
      } catch (err: any) {
        console.error(err);
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchMail();
  }, [uid, token]);

  const toggleStar = async () => {
    if (!mail) return;
    const isStarred = mail.starred;

    setMail((prev) => prev && { ...prev, starred: !isStarred });

    try {
      const url = `${apiUrl}/${isStarred ? 'unstar-mail' : 'star-mail'}`;
      const res = await fetch(isStarred ? `${url}/${mail.uid}` : url, {
        method: isStarred ? 'DELETE' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: isStarred ? null : JSON.stringify({ mailId: mail.uid }),
      });

      if (!res.ok) throw new Error('Failed to update star status');
    } catch (err) {
      console.error(err);
      setMail((prev) => prev && { ...prev, starred: isStarred });
    }
  };

  const actionButton = (label: string) => (
    <Pressable
      className="px-3 py-1 rounded mr-2"
      style={{ backgroundColor: '#f1f3f4' }}
    >
      <Text className="text-gray-700 font-medium">{label}</Text>
    </Pressable>
  );

  console.log(mail?.body, 'mail');

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header title="Mail" />

      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#000" />
        </View>
      ) : error ? (
        <View className="flex-1 items-center justify-center p-4">
          <Text className="text-red-500">{error}</Text>
        </View>
      ) : mail ? (
        <ScrollView className="flex-1">
          <View className="flex-row justify-end items-center p-2">
            {actionButton('Reply')}
            {actionButton('Forward')}
            {actionButton('Archive')}
          </View>

          <View className="px-4 py-3 flex-row justify-between items-center">
            <Text className="text-xl font-semibold flex-1 pr-3">
              {mail.subject}
            </Text>
            <Pressable onPress={toggleStar}>
              <Text className="text-2xl">{mail.starred ? '⭐' : '☆'}</Text>
            </Pressable>
          </View>

          <View className="px-4 py-3 flex-row items-center">
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
              baseStyle={{
                fontSize: 15,
                lineHeight: 22,
                color: '#202124',
              }}
              enableExperimentalMarginCollapsing={true}
              defaultTextProps={{ selectable: true }}
              ignoredDomTags={[
                'meta',
                'link',
                'style',
                'script',
                'head',
                'title',
              ]}
              renderersProps={{
                img: { enableExperimentalPercentWidth: true },
              }}
              systemFonts={['Arial', 'Helvetica', 'sans-serif']}
              classesStyles={{
                // Example: handle Gmail or Outlook specific classes
                MsoNormal: { marginVertical: 8 },
              }}
            />
          </View>

          <View className="px-4 py-3 flex-row justify-start">
            {actionButton('Reply')}
            {actionButton('Forward')}
          </View>
        </ScrollView>
      ) : null}
    </SafeAreaView>
  );
};

export default ViewMail;
