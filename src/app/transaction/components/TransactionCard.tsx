import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Transaction } from './../types/transactionTypes';
import { formatDate } from '../utils/utils';

type Props = {
  transaction: Transaction;
  onPress: () => void;
};

export const TransactionCard = ({ transaction, onPress }: Props) => {
  const isSuccess = transaction.status === 'SUCCESS';

  return (
    <TouchableOpacity onPress={onPress} style={[styles.card, isSuccess ? styles.successBorder : styles.pendingBorder]}>
      <View style={styles.cardContent}>
        <Text style={styles.bankText}>
          {transaction.senderBank.toUpperCase()} → {transaction.beneficiaryBank.toUpperCase()}
        </Text>
        <Text style={styles.recipientText}>{transaction.beneficiaryName.toUpperCase()}</Text>
        <Text style={styles.detailsText}>
          Rp{transaction.amount.toLocaleString('id-ID')} • {formatDate(transaction.createdAt)}
        </Text>
      </View>
      <View style={[styles.statusBadge,  isSuccess ? styles.statusBadgeSuccess : styles.statusBadgePending]}>
        <Text style={[styles.statusText, isSuccess ? styles.successText : styles.pendingText]}>
          {isSuccess ? 'Berhasil' : 'Pengecekan'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginVertical: 4,
    marginHorizontal: 8,
    borderRadius: 8,
    backgroundColor: '#fff',
    elevation: 1,
  },
  successBorder: {
    borderLeftWidth: 4,
    borderLeftColor: '#00A86B',
  },
  pendingBorder: {
    borderLeftWidth: 4,
    borderLeftColor: '#F64747',
  },
  cardContent: {
    flex: 1,
  },
  bankText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    alignItems: 'center',
  },
  recipientText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  detailsText: {
    fontSize: 14,
    color: '#888',
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 5,
    borderWidth: 1,
    alignItems: 'center',
  },
  statusBadgeSuccess: {
    borderColor: '#005636',
    backgroundColor: '#00A86B',
  },
  statusBadgePending: {
    borderColor: '#F37021',
  },
  statusText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  successText: {
    color: '#fff',
    borderColor: '#00A86B',
  },
  pendingText: {
    color: '#333',
    borderColor: '#F64747',
  },
});
