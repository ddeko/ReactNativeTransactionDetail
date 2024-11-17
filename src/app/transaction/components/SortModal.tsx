import React from 'react';
import {
  View,
  Modal,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SORT_OPTIONS = [
  { label: 'URUTKAN', value: 'default' as const },
  { label: 'Nama A-Z', value: 'name-asc' as const },
  { label: 'Nama Z-A', value: 'name-desc' as const },
  { label: 'Tanggal Terbaru', value: 'date-desc' as const },
  { label: 'Tanggal Terlama', value: 'date-asc' as const },
];

type SortOptionValue = 'default' | 'name-asc' | 'name-desc' | 'date-asc' | 'date-desc';

type Props = {
  visible: boolean;
  onClose: () => void;
  currentSort: SortOptionValue;
  onSortChange: (value: SortOptionValue) => void;
};

export const SortModal = ({ visible, onClose, currentSort, onSortChange }: Props) => (
  <Modal visible={visible} transparent animationType="fade">
    <Pressable style={styles.modalOverlay} onPress={onClose}>
      <Pressable style={styles.modalContent} onPress={() => {}}>
        <FlatList
          data={SORT_OPTIONS}
          keyExtractor={(item) => item.value}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => {
                onSortChange(item.value); // Properly typed value
                onClose();
              }}
            >
              <View style={styles.optionContent}>
                {/* Radio Button */}
                <Icon
                  name={
                    currentSort === item.value
                      ? 'radio-button-checked'
                      : 'radio-button-unchecked'
                  }
                  size={20}
                  color="#F37021"
                />
                {/* Label */}
                <Text style={styles.optionText}>{item.label}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </Pressable>
    </Pressable>
  </Modal>
);

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 4,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#333',
  },
  optionButton: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    marginLeft: 12,
    color: '#333',
  },
});
