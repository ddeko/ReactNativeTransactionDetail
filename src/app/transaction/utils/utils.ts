import { Transaction, ApiTransaction } from '../types/transactionTypes';

export const mapApiResponseToTransaction = (
  apiTransaction: ApiTransaction
): Transaction => {
  return {
    id: apiTransaction.id || '',
    amount: apiTransaction.amount || 0,
    senderBank: apiTransaction.sender_bank || 'Unknown Sender',
    beneficiaryBank: apiTransaction.beneficiary_bank || 'Unknown Beneficiary',
    beneficiaryName: apiTransaction.beneficiary_name || 'Unknown Name',
    accountNumber: apiTransaction.account_number || 'N/A',
    remark: apiTransaction.remark || 'No Remark',
    uniqueCode: apiTransaction.unique_code || 0,
    status: apiTransaction.status || 'PENDING',
    createdAt: apiTransaction.created_at || '',
  };
};

export const mapApiResponseToTransactions = (
    apiTransactions: Record<string, ApiTransaction>
  ): Transaction[] => {
    return Object.values(apiTransactions).map(mapApiResponseToTransaction);
};

export const formatDate = (date: string): string =>
  new Date(date).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
});
