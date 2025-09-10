import {
  View,
  Text,
  Modal,
  Alert,
  Pressable,
  StyleSheet,
  Image,
} from "react-native";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

type SuccessModalProps = {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
};

const SuccessModal = ({ modalVisible, setModalVisible }: SuccessModalProps) => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Image
                source={require("../../../assets/images/success.png")}
                className="w-[113px] h-[100px]"
              />
              <Text className="text-[20px] font-bold mt-4">Success!</Text>
              <Text className="text-[#6B7280] text-[14px] mt-2 text-center">
                Your server details has been verified and saved successfully.
              </Text>
              <Pressable
                onPress={() => setModalVisible(!modalVisible)}
                className="bg-[#3D4294] mt-10 p-5 rounded-full items-center"
              >
                <Text style={styles.textStyle}>Proceed to setup Server</Text>
              </Pressable>
            </View>
            <View className="w-[100%] mt-10">
              <Pressable onPress={() => setModalVisible(false)}>
                <Text className="text-white font-medium text-[16px]">
                  Setup outgoing server
                </Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default SuccessModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
