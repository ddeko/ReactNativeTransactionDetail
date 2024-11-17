import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { useNavigation, RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList, Transaction } from './../types/transactionTypes';
import { useTransactionStore } from '../../store/transactionStore';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { formatDate } from '../utils/utils';

type RouteProps = RouteProp<RootStackParamList, 'TransactionDetail'>;

export const TransactionDetail = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProps>();
  const { transactionId } = route.params;
  const { transactions } = useTransactionStore();

  const transaction: Transaction | undefined = transactions.find(
    (txn) => txn.id === transactionId
  );

  if (!transaction) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Transaction not found</Text>
      </View>
    );
  }

  const copyToClipboard = (text: string) => {
    Clipboard.setString(text);
    Alert.alert('Copied', 'ID Transaksi Berhasil di Copy');
  };

  return (
    <View style={styles.container}>
      {/* Transaction Details */}
      <View style={styles.detailsContainer}>
        {/* Transaction ID */}
        <View style={styles.transactionIdContainer}>
          <Text style={styles.sectionTitle}>
            ID TRANSAKSI: <Text>#{transaction.id}</Text>
          </Text>
          <TouchableOpacity onPress={() => copyToClipboard(transaction.id)} style={styles.copyIcon}>
            <Icon name="content-copy" size={18} color="#F37021"/>
          </TouchableOpacity>
        </View>

        {/* Section Header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>DETAIL TRANSAKSI</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.closeButton}>Tutup</Text>
          </TouchableOpacity>
        </View>
        {/* Bank Information */}
        <Text style={styles.bankInfo}>
          {transaction.senderBank.toUpperCase()} →{' '}
          {transaction.beneficiaryBank.toUpperCase()}
        </Text>

        {/* Beneficiary and Nominal */}
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>{transaction.beneficiaryName}</Text>
            <Text style={styles.value}>{transaction.accountNumber}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>NOMINAL</Text>
            <Text style={styles.value}>
              Rp{transaction.amount.toLocaleString('id-ID')}
            </Text>
          </View>
        </View>

        {/* Remark and Unique Code */}
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>BERITA TRANSFER</Text>
            <Text style={styles.value}>{transaction.remark}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>KODE UNIK</Text>
            <Text style={styles.value}>{transaction.uniqueCode}</Text>
          </View>
        </View>

        {/* Date */}
        <View style={styles.row}>
          <View style={styles.columnFull}>
            <Text style={styles.label}>WAKTU DIBUAT</Text>
            <Text style={styles.value}>{formatDate(transaction.createdAt)}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingVertical: 16,
  },
  transactionIdContainer: {
    marginBottom: 24,
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  copyIcon: {
    marginLeft: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 24,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: '#f1f1f1',
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    fontSize: 16,
    color: '#F37021',
    fontWeight: 'bold',
  },
  detailsContainer: {
    backgroundColor: '#fff',
    borderRadius: 4,
    paddingVertical: 16,
    elevation: 1,
  },
  bankInfo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  column: {
    flex: 1,
    marginRight: 16,
  },
  columnFull: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 4,
  },
  value: {
    fontSize: 14,
    color: '#333',
  },
  errorText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#FF0000',
  },
});
