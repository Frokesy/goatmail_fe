import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";

type Option = {
  label: string;
  value: string | number;
  disabled?: boolean;
};

type CustomSelectProps = {
  options: Option[];
  value?: string | number | null;
  defaultValue?: string | number | null;
  onChange?: (val: string | number) => void;
  placeholder?: string;
  searchable?: boolean;
  disabled?: boolean;
  modalHeight?: number;
  anchorStyle?: any;
  optionStyle?: any;
  placeholderTextColor?: string;
};

export default function CustomSelect({
  options,
  value,
  defaultValue = null,
  onChange,
  placeholder = "Select...",
  searchable = false,
  disabled = false,
  modalHeight = 360,
  anchorStyle,
  optionStyle,
  placeholderTextColor = "#999",
}: CustomSelectProps) {
  const [visible, setVisible] = useState(false);
  const [internalValue, setInternalValue] = useState<string | number | null>(
    value ?? defaultValue
  );

  useEffect(() => {
    if (typeof value !== "undefined") setInternalValue(value ?? null);
  }, [value]);

  const selectedOption = options.find((o) => o.value === internalValue) ?? null;

  const open = () => {
    if (disabled) return;
    setVisible(true);
  };
  const close = () => setVisible(false);

  const handleSelect = (opt: Option) => {
    if (opt.disabled) return;
    setInternalValue(opt.value);
    onChange?.(opt.value);
    close();
  };

  return (
    <>
      <TouchableOpacity
        style={[styles.anchor, anchorStyle, disabled && styles.anchorDisabled]}
        onPress={open}
        activeOpacity={0.8}
        accessibilityRole="button"
        accessibilityHint="Opens options"
      >
        <Text
          style={[
            styles.anchorText,
            !selectedOption && { color: placeholderTextColor },
          ]}
          numberOfLines={1}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </Text>

        <Text style={styles.chev}>{visible ? "▴" : "▾"}</Text>
      </TouchableOpacity>

      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={close}
      >
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={close}
        />

        <View style={[styles.sheet, { height: modalHeight }]}>
          <View style={styles.sheetHeader}>
            <Text style={styles.sheetTitle}>Select</Text>
            <TouchableOpacity onPress={close} accessibilityRole="button">
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={options}
            keyExtractor={(item) => String(item.value)}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator
            contentContainerStyle={{ paddingBottom: 24 }}
            renderItem={({ item }) => {
              const isSelected = item.value === internalValue;
              return (
                <TouchableOpacity
                  onPress={() => handleSelect(item)}
                  disabled={item.disabled}
                  style={[
                    styles.option,
                    optionStyle,
                    item.disabled && styles.optionDisabled,
                  ]}
                >
                  <Text
                    style={[
                      styles.optionText,
                      isSelected && styles.optionTextSelected,
                      item.disabled && styles.optionTextDisabled,
                    ]}
                  >
                    {item.label}
                  </Text>
                  {isSelected && <Text style={styles.check}>✓</Text>}
                </TouchableOpacity>
              );
            }}
            ListEmptyComponent={() => (
              <View style={styles.empty}>
                <Text style={styles.emptyText}>No options</Text>
              </View>
            )}
          />
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  anchor: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#D6D6D6",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 10,
    backgroundColor: "inherit",
    marginTop: 8,
  },
  anchorDisabled: {
    opacity: 0.6,
  },
  anchorText: {
    flex: 1,
    fontSize: 16,
    color: "#111",
    marginRight: 8,
  },
  chev: {
    fontSize: 14,
    color: "#666",
  },

  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  sheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    padding: 12,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  sheetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  sheetTitle: { fontSize: 16, fontWeight: "600" },
  closeText: { color: "#0066CC" },

  searchWrap: {
    paddingVertical: 8,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#E6E6E6",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },

  option: {
    paddingVertical: 12,
    paddingHorizontal: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#F1F1F1",
  },
  optionDisabled: {
    opacity: 0.5,
  },
  optionText: { fontSize: 16, color: "#111" },
  optionTextSelected: { fontWeight: "700", color: "#1b1b1b" },
  optionTextDisabled: { color: "#999" },

  check: { color: "#1b9b53", fontSize: 16, marginLeft: 8 },

  empty: { padding: 20, alignItems: "center" },
  emptyText: { color: "#999" },
});
