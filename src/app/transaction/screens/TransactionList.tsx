import React, { useState } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { useTransactionStore } from '../../store/transactionStore';
import { useFetchTransactions } from '../hooks/useFetchTransactions';
import { SearchFilterBar } from '../components/SearchFilterBar';
import { TransactionCard } from '../components/TransactionCard';
import { SortModal } from '../components/SortModal';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './../types/transactionTypes';
import { useNavigation } from '@react-navigation/native';

type NavigationProp = StackNavigationProp<RootStackParamList, 'TransactionList'>;

export const TransactionList = () => {
  const { transactions, setTransactions, filters, setFilters } = useTransactionStore();
  const { data, isLoading, error } = useFetchTransactions();
  const [isSortModalVisible, setSortModalVisible] = useState(false);
  const navigation = useNavigation<NavigationProp>();

  React.useEffect(() => {
    if (data) {setTransactions(data);}
  }, [data, setTransactions]);

  // Filter and Sort Transactions
  const filteredData = transactions
    .filter((txn) =>
      txn.beneficiaryBank.toLowerCase().includes(filters.query.toLowerCase()) ||
      txn.senderBank.toLowerCase().includes(filters.query.toLowerCase()) ||
      txn.beneficiaryName.toLowerCase().includes(filters.query.toLowerCase()) ||
      txn.amount.toString().includes(filters.query.replace(/\./g, ''))
    )
    .sort((a, b) => {
      if (filters.sort === 'name-asc') {return a.beneficiaryName.localeCompare(b.beneficiaryName);}
      if (filters.sort === 'name-desc') {return b.beneficiaryName.localeCompare(a.beneficiaryName);}
      if (filters.sort === 'date-asc') {return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();}
      if (filters.sort === 'date-desc') {return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();}
      return 0;
  });

  if (isLoading) {return <Text style={styles.loadingText}>Loading...</Text>;}
  if (error) {return <Text style={styles.errorText}>Error loading transactions</Text>;}

  return (
    <View style={styles.container}>
      {/* Search Bar and Sort Button */}
      <SearchFilterBar
        query={filters.query}
        onChangeQuery={(text) => setFilters({ query: text })}
        onOpenSortModal={() => setSortModalVisible(true)}
        currentSort={
          filters.sort === 'name-asc'
            ? 'Nama A-Z'
            : filters.sort === 'name-desc'
            ? 'Nama Z-A'
            : filters.sort === 'date-asc'
            ? 'Tanggal Terlama'
            : filters.sort === 'date-desc'
            ? 'Tanggal Terbaru'
            : 'URUTKAN'
        }
      />

      {/* Transaction List */}
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
            <TransactionCard
                transaction={item}
                onPress={() => navigation.navigate('TransactionDetail', { transactionId: item.id })}
            />
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>Tidak ada transaksi ditemukan</Text>}
      />

      <SortModal
        visible={isSortModalVisible}
        onClose={() => setSortModalVisible(false)}
        currentSort={filters.sort}
        onSortChange={(value) => setFilters({ sort: value })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 16,
    fontSize: 16,
    color: '#888',
  },
  errorText: {
    textAlign: 'center',
    marginTop: 16,
    fontSize: 16,
    color: '#FF0000',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 16,
    fontSize: 16,
    color: '#888',
  },
});
