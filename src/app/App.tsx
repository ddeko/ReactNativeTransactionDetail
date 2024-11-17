import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TransactionList } from './transaction/screens/TransactionList';
import { TransactionDetail } from './transaction/screens/TransactionDetail';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Stack = createStackNavigator();
const queryClient = new QueryClient();

export const App = () => {
  return (
    <SafeAreaProvider>
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="TransactionList">
          <Stack.Screen
            name="TransactionList"
            component={TransactionList}
            options={{
              headerLeft: () => null,
              title: 'Transaction List',
            }}
          />
          <Stack.Screen
            name="TransactionDetail"
            component={TransactionDetail}
            options={{
              headerLeft: () => null,
              title: 'Transaction Detail',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
    </SafeAreaProvider>
  );
};
