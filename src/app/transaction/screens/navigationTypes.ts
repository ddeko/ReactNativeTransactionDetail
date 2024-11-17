// src/transaction/screens/navigationTypes.ts
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
  TransactionList: undefined;
  TransactionDetail: { transactionId: string };
};

// Define the navigation prop type for screens
export type TransactionDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'TransactionDetail'
>;

export type TransactionDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  'TransactionDetail'
>;
