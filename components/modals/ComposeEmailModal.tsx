import { useEffect, useState } from 'react';
import {
  Animated,
  Image,
  Keyboard,
  Modal,
  Pressable,
  Text,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import AttachFilesModal from './AttachFilesModal';
import ScheduleEmailModal from './ScheduleEmailModal';
import EmailProtectionModal from './EmailProtectionModal';
import AiWritingAssistantModal from './AiWritingAssistantModal';
import ComposeEmailUI from '../ui/ComposeEmailUI';
import EmailLockIcon from '../icons/EmailLockIcon';
import ScheduledIcon from '../icons/ScheduledIcon';
import ShareIcon from '../icons/ShareIcon';
import XIcon from '../icons/XIcon';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useAuth } from '@/app/context/authContext';
import { Draft } from '@/app/drafts';

const apiUrl =
  'http://ec2-51-20-249-56.eu-north-1.compute.amazonaws.com:3000/api';
const ComposeEmailModal = ({
  modalVisible,
  setModalVisible,
  initialDraft,
}: {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  initialDraft?: Draft | null;
}) => {
  const { token } = useAuth();
  const [recipients, setRecipients] = useState<any[]>(initialDraft?.to || []);
  const [ccrecipients, setCcrecipients] = useState<any[]>(
    initialDraft?.cc || []
  );
  const [bccrecipients, setBccrecipients] = useState<any[]>(
    initialDraft?.bcc || []
  );
  const [subject, setSubject] = useState<string>(initialDraft?.subject || '');
  const [mail, setMail] = useState<string>(initialDraft?.body || '');
  const [draftId, setDraftId] = useState<string | null>(
    initialDraft?._id || null
  );

  const [showAttachFilesModal, setShowAttachFilesModal] = useState(false);
  const [showScheduleMailModal, setShowScheduleMailModal] = useState(false);
  const [showEmailProtectionModal, setShowEmailProtectionModal] =
    useState(false);
  const [showAiModal, setShowAiModal] = useState(false);

  const handleClose = async () => {
    if (
      subject.trim() ||
      mail.trim() ||
      recipients.length > 0 ||
      ccrecipients.length > 0 ||
      bccrecipients.length > 0
    ) {
      try {
        const res = await fetch(`${apiUrl}/save-draft`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            draftId,
            to: recipients,
            cc: ccrecipients,
            bcc: bccrecipients,
            subject,
            body: mail,
          }),
        });

        const data = await res.json();
        if (data.draftId) {
          setDraftId(data.draftId);
        }
      } catch (err) {
        console.error('Failed to save draft:', err);
      }
    }

    setModalVisible(false);
  };

  useEffect(() => {
    if (modalVisible && initialDraft) {
      setRecipients(initialDraft.to || []);
      setCcrecipients(initialDraft.cc || []);
      setBccrecipients(initialDraft.bcc || []);
      setSubject(initialDraft.subject || '');
      setMail(initialDraft.body || '');
      setDraftId(initialDraft._id || null);
    }
  }, [modalVisible, initialDraft]);

  return (
    <Modal
      animationType="slide"
      transparent
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View className="flex-1 bg-black/40" />

      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <Animated.View className="absolute bottom-0 h-[95%] w-full bg-white rounded-t-3xl p-5">
          <KeyboardAwareScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            enableOnAndroid
            extraScrollHeight={10}
          >
            <View className="flex flex-row justify-between items-center mt-10 border-b-2 border-[#f1f1f1] pb-3">
              <View className="flex items-center flex-row">
                <Pressable onPress={handleClose}>
                  <XIcon />
                </Pressable>
                <Text className="ml-4 text-[20px] font-semibold">
                  Compose mail
                </Text>
              </View>
              <View className="flex flex-row items-center justify-between w-[40%]">
                <Pressable onPress={() => setShowAttachFilesModal(true)}>
                  <ShareIcon />
                </Pressable>
                <Pressable onPress={() => setShowScheduleMailModal(true)}>
                  <ScheduledIcon />
                </Pressable>
                <Pressable onPress={() => setShowEmailProtectionModal(true)}>
                  <EmailLockIcon />
                </Pressable>
                <Pressable onPress={() => setShowAiModal(true)}>
                  <Image
                    source={require('../../assets/images/ai-generate.png')}
                    className="w-[44px] h-[44px] mt-3"
                  />
                </Pressable>
              </View>
            </View>

            <ComposeEmailUI
              setModalVisible={setModalVisible}
              subject={subject}
              setSubject={setSubject}
              recipients={recipients}
              setRecipients={setRecipients}
              ccrecipients={ccrecipients}
              setCCRecipients={setCcrecipients}
              bccrecipients={bccrecipients}
              setBCCRecipients={setBccrecipients}
              mail={mail}
              setMail={setMail}
              draftId={draftId}
              setDraftId={setDraftId}
            />
          </KeyboardAwareScrollView>
        </Animated.View>
      </TouchableWithoutFeedback>

      <AttachFilesModal
        modalVisible={showAttachFilesModal}
        setModalVisible={setShowAttachFilesModal}
      />
      <ScheduleEmailModal
        modalVisible={showScheduleMailModal}
        setModalVisible={setShowScheduleMailModal}
      />
      <EmailProtectionModal
        modalVisible={showEmailProtectionModal}
        setModalVisible={setShowEmailProtectionModal}
      />
      <AiWritingAssistantModal
        modalVisible={showAiModal}
        setModalVisible={setShowAiModal}
        subject={subject}
        recipients={recipients}
      />
    </Modal>
  );
};

export default ComposeEmailModal;
