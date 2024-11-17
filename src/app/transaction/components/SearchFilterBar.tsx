import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

type Props = {
  onOpenSortModal: () => void;
  query: string;
  onChangeQuery: (text: string) => void;
  currentSort: string;
};

export const SearchFilterBar = ({ onOpenSortModal, query, onChangeQuery, currentSort }: Props) => (
  <View style={styles.container}>
    <View style={styles.inputContainer}>
      <Icon name="search" size={18} color="#bcbcbc"/>
      <TextInput
        placeholder="Cari nama, bank, atau nominal"
        value={query}
        onChangeText={onChangeQuery}
        placeholderTextColor="#bcbcbc"
        style={styles.input}
      />
    </View>
    <TouchableOpacity style={styles.sortButton} onPress={onOpenSortModal}>
      <Text style={styles.sortButtonText}>{currentSort}</Text>
      <Icon name="expand-more" size={30} color="#F37021" />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  inputContainer: {
    flex: 0.7,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
  },
  sortButton: {
    flex: 0.4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  sortButtonText: {
    color: '#F37021',
    fontWeight: 'bold',
  },
});
