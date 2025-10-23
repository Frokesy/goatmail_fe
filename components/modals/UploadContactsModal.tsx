import { View, Text, Modal, Alert, StyleSheet, Pressable } from "react-native";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import UploadIcon from "../icons/UploadIcon";

type SuccessModalProps = {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
};

const UploadContactsModal = ({
  modalVisible,
  setModalVisible,
}: SuccessModalProps) => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(false);
          }}
        >
          <Pressable
            style={styles.centeredView}
            onPress={() => setModalVisible(false)}
          >
            <Pressable style={styles.modalView} onPress={() => {}}>
              <View style={{ alignItems: "center" }}>
                <View className="bg-[#E8EAF0] p-5 rounded-full">
                  <UploadIcon />
                </View>
                <Text className="text-[20px] font-bold mt-4">
                  Upload Contacts
                </Text>

                <Text className="text-[#6B7280] text-[14px] mt-2 text-center">
                  You are about to upload your device contacts
                </Text>
              </View>

              <View
                style={{ marginTop: 20 }}
                className="flex flex-row justify-between"
              >
                <Pressable
                  onPress={() => setModalVisible(false)}
                  style={styles.buttonTwoFullWidth}
                  className="text-[#3d4294] border border-[#3d4294] mr-3 py-4"
                >
                  <Text>Cancel</Text>
                </Pressable>
                <Pressable
                  onPress={() => setModalVisible(false)}
                  style={styles.buttonFullWidth}
                  className="py-4"
                >
                  <Text style={styles.textStyle}>Upload</Text>
                </Pressable>
              </View>
            </Pressable>
          </Pressable>
        </Modal>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default UploadContactsModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  modalView: {
    width: "85%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonTwoFullWidth: {
    backgroundColor: "#fff",
    borderRadius: 9999,
    alignItems: "center",
    width: "40%",
  },
  buttonFullWidth: {
    backgroundColor: "#3D4294",
    borderRadius: 9999,
    alignItems: "center",
    width: "50%",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
