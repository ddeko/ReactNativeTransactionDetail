import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ApiTransaction, Transaction } from '../types/transactionTypes';
import { mapApiResponseToTransactions } from '../utils/utils';

const API_URL = 'https://recruitment-test.flip.id/frontend-test';

export const useFetchTransactions = () => {
  const fetchTransactions = async (): Promise<Transaction[]> => {
    const { data } = await axios.get<Record<string, ApiTransaction>>(API_URL);
    console.log('Raw API Response:', data); // Debug the API response

    return mapApiResponseToTransactions(data);
  };

  return useQuery<Transaction[], Error>({
    queryKey: ['transactions'],
    queryFn: fetchTransactions,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
};
