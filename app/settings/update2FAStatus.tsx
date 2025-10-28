import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  Image,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import CaretLeft from '@/components/icons/CaretLeft';
import { useRouter } from 'expo-router';
import CopyIcon from '@/components/icons/CopyIcon';
import { useAuth } from '../context/authContext';
import * as Clipboard from 'expo-clipboard';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const apiUrl =
  'http://ec2-51-20-249-56.eu-north-1.compute.amazonaws.com:3000/api';

const Update2FAStatus = () => {
  const { user } = useAuth();
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [secretKey, setSecretKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const inputs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    const fetch2FASetup = async () => {
      try {
        const res = await fetch(
          `${apiUrl}/auth/2fa/setup?email=${user?.email}`
        );
        const data = await res.json();
        if (res.ok) {
          setQrCode(data.qrCode);
          setSecretKey(data.secret);
        } else {
          setError(data.error || 'Failed to load 2FA setup');
        }
      } catch (err) {
        setError('Network error');
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetch2FASetup();
  }, [user?.email]);

  const handleChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < inputs.current.length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && code[index] === '') {
      if (index > 0) {
        inputs.current[index - 1]?.focus();

        const newCode = [...code];
        newCode[index - 1] = '';
        setCode(newCode);
      }
    }
  };

  const handleVerify = async () => {
    setVerifying(true);
    setError('');
    try {
      const token = code.join('');
      const res = await fetch(`${apiUrl}/auth/2fa/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user?.email, token }),
      });
      const data = await res.json();

      if (!res.ok) setError(data.error || 'Invalid code');
    } catch (err) {
      setError('Network error');
      console.log(err);
    } finally {
      setVerifying(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#3D4294" />
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        enableOnAndroid
        extraScrollHeight={10}
      >
        {' '}
        <View className="pt-10 pb-6 px-4 border-b flex flex-row justify-between border-[#E4E4E7]">
          <Pressable
            onPress={() => router.back()}
            className="flex flex-row items-center"
          >
            <CaretLeft />
            <Text className="text-[18px] font-semibold ml-4">Enable 2FA</Text>
          </Pressable>
          <Pressable
            onPress={handleVerify}
            disabled={verifying || code.includes('')}
          >
            <Text
              className={`text-[14px] ${
                verifying || code.includes('')
                  ? 'text-gray-400'
                  : 'text-[#1A2E6C]'
              }`}
            >
              {verifying ? 'Verifying...' : 'Save changes'}
            </Text>
          </Pressable>
        </View>
        <View className="py-10 px-6">
          <View className="flex flex-row items-center">
            <Image source={require('../../assets/images/TwoFA.png')} />
            <View className="flex flex-col pl-3">
              <Text className="text-[16px] pb-2">
                Enable Two-factor authentication (2FA)
              </Text>
              <Text className="text-[14px] text-[#344054]">
                Add an extra layer of security
              </Text>
            </View>
          </View>

          <View className="flex flex-col mt-[3vh] items-center justify-center">
            <Text className="text-[24px] font-bold">Secure your account</Text>
            <Text className="text-[#A3A3A3] text-[14px] mt-2 mb-6 mx-4 text-center">
              Set up two-factor authentication for enhanced security.
            </Text>

            {qrCode && (
              <Image
                source={{ uri: qrCode }}
                style={{ width: 164, height: 164 }}
                className="mb-4"
              />
            )}

            <Text className="text-[#A3A3A3] text-[14px] mt-2 mx-4 text-center">
              Scan this QR code with your authenticator app (Google
              Authenticator, Authy, etc.)
            </Text>

            <Text className="text-[#A3A3A3] text-[14px] mt-4 text-center">
              OR
            </Text>

            <Text className="text-[#A3A3A3] text-[14px] mt-4 mx-4 text-center">
              Add this secret key to your authenticator app:
            </Text>

            {secretKey && (
              <View className="w-[100%] mt-4 flex flex-row justify-between items-center">
                <Text className="text-[#333333] font-semibold text-[14px] mr-4">
                  {secretKey}
                </Text>
                <Pressable
                  className="flex flex-row items-center py-3 px-6 rounded-full bg-[#3D4294]"
                  onPress={async () => {
                    await Clipboard.setStringAsync(secretKey);
                    alert('Copied to clipboard!');
                  }}
                >
                  <Text className="text-white mr-2">Copy</Text>
                  <CopyIcon />
                </Pressable>
              </View>
            )}

            <View className="flex flex-col w-[100%] mt-6">
              <Text className="text-[14px] text-[#344054] font-medium mt-2">
                Enter verification code from your app
              </Text>
              <View className="flex flex-row mt-3 justify-between items-center">
                {code.map((digit, index) => (
                  <TextInput
                    key={index}
                    ref={(ref) => {
                      inputs.current[index] = ref;
                    }}
                    className="border border-[#D6D6D6] p-3 w-[13%] rounded-lg text-center text-[18px]"
                    keyboardType="number-pad"
                    maxLength={1}
                    value={digit}
                    onChangeText={(text) => handleChange(text, index)}
                    onKeyPress={(e) => handleKeyPress(e, index)}
                  />
                ))}
              </View>

              {error ? (
                <Text className="text-red-500 text-[14px] mt-2">{error}</Text>
              ) : null}
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Update2FAStatus;
