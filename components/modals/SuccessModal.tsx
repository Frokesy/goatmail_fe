import {
  View,
  Text,
  Modal,
  Alert,
  StyleSheet,
  Image,
  ImageSourcePropType,
  Pressable,
} from "react-native";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";

type SuccessModalProps = {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  image?: ImageSourcePropType;
  title?: string;
  message?: string;
  buttonText?: string;
  buttonLink?: string;
};

const SuccessModal = ({
  modalVisible,
  setModalVisible,
  image,
  title,
  message,
  buttonText,
  buttonLink,
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
                {image && (
                  <Image source={image} style={{ width: 113, height: 100 }} />
                )}

                {title && (
                  <Text className="text-[20px] font-bold mt-4">{title}</Text>
                )}

                {message && (
                  <Text className="text-[#6B7280] text-[14px] mt-2 text-center">
                    {message}
                  </Text>
                )}
              </View>

              <View style={{ width: "100%", marginTop: 30 }}>
                {buttonLink ? (
                  <Link
                    href={buttonLink as any}
                    onPress={() => setModalVisible(false)}
                    style={styles.buttonFullWidth}
                  >
                    <Text style={styles.textStyle}>{buttonText}</Text>
                  </Link>
                ) : (
                  <View style={styles.buttonFullWidth}>
                    <Text style={styles.textStyle}>{buttonText}</Text>
                  </View>
                )}
              </View>
            </Pressable>
          </Pressable>
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
  buttonFullWidth: {
    backgroundColor: "#3D4294",
    padding: 18,
    borderRadius: 9999,
    alignItems: "center",
    width: "100%",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
