// Raw transaction type from API
export type ApiTransaction = {
    id?: string; // Transaction ID
    account_number?: string; // Beneficiary account number
    amount?: number; // Transaction amount
    beneficiary_bank?: string; // Beneficiary's bank
    beneficiary_name?: string; // Beneficiary's name
    created_at?: string; // Transaction creation date (ISO string)
    completed_at?: string; // Transaction completion date (ISO string)
    fee?: number; // Transaction fee
    remark?: string; // Transfer remark (Berita transfer)
    sender_bank?: string; // Sender's bank
    status?: 'SUCCESS' | 'PENDING'; // Transaction status
    unique_code?: number; // Unique code (Kode unik)
};

// Processed transaction type used in the app
export type Transaction = {
    id: string; // Unique transaction ID
    amount: number; // Transaction amount
    senderBank: string; // Sender's bank name
    beneficiaryBank: string; // Beneficiary's bank name
    beneficiaryName: string; // Beneficiary's name
    accountNumber: string; // Beneficiary's account number
    remark: string; // Transfer remark (Berita transfer)
    uniqueCode: number; // Unique transaction code
    status: 'SUCCESS' | 'PENDING'; // Transaction status
    createdAt: string; // Transaction creation date (formatted)
};

// Types for sorting and filtering
export type FilterState = {
    query: string; // Search query
    sort: 'default' | 'name-asc' | 'name-desc' | 'date-asc' | 'date-desc';
};

export type RootStackParamList = {
    TransactionList: undefined;
    TransactionDetail: { transactionId: string };
};
