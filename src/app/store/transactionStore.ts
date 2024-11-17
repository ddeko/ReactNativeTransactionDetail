import { create } from 'zustand';
import { FilterState, Transaction } from '../transaction/types/transactionTypes';

type TransactionStore = {
  transactions: Transaction[];
  filters: FilterState;
  setTransactions: (data: Transaction[]) => void;
  setFilters: (filters: Partial<FilterState>) => void;
};

export const useTransactionStore = create<TransactionStore>((set) => ({
  transactions: [],
  filters: { query: '', sort: 'default' },
  setTransactions: (data) => set({ transactions: data }),
  setFilters: (filters) => set((state) => ({ filters: { ...state.filters, ...filters } })),
}));
