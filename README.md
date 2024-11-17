# Getting Started

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

If you have found CMake issue when building the Application :

example issue :
``` 
Execution failed for task ':app:configureCMakeDebug[arm64-v8a]'.
Invalid character escape '\U'.
```
Please follow instruction in this thread
https://github.com/expo/expo/issues/32955#issuecomment-2479691104

# Project Details

## **1. Project Structure**
```
src/app
├── store
│   ├── transactionStore.ts    # Zustand store for managing transaction data and filters
├── transaction
│   ├── components
│   │   ├── SearchFilterBar.tsx  # Search input and sort button for the transaction list
│   │   ├── SortModal.tsx        # Modal to handle sorting options
│   │   ├── TransactionCard.tsx  # Individual card for a transaction in the list
│   ├── hooks
│   │   ├── useFetchTransactions.ts  # React Query hook for fetching transactions
│   ├── screens
│   │   ├── TransactionList.tsx      # Main screen displaying the list of transactions
│   │   ├── TransactionDetail.tsx    # Detail screen for a specific transaction
│   ├── types
│   │   ├── transactionTypes.ts      # Type definitions for transactions
│   ├── utils
│   │   ├── util.ts             # utils reusable tools for module
├── utils
│   ├── apiClient.ts             # Axios instance for API requests
```

---

## **2. Libraries**

| **Library**              | **Purpose**                                                                 |
|---------------------------|-----------------------------------------------------------------------------|
| `@react-navigation/native` | Manages navigation between screens.                                        |
| `@react-navigation/stack` | Provides stack-based navigation for the app.                               |
| `zustand`                 | State management for transactions and filters.                             |
| `@tanstack/react-query`   | Fetches and caches transaction data.                                        |
| `axios`                   | Simplifies API calls.                                                      |
| `@react-native-clipboard/clipboard` | Enables clipboard interactions (copy transaction ID).             |
| `react-native-vector-icons` | Adds icons for sorting and interactive UI elements.                      |

---


## **3. Performance Optimization Approaches**

This app employs several performance optimization techniques to ensure a smooth user experience.

### **3.1. Optimizing Data Fetching**

#### **Approach: Caching and Stale Time**
- **React Query** is used to fetch and cache data:
  - Transactions are cached in memory to avoid redundant network requests when users revisit the transaction list or detail pages.
  - **Stale Time**: Data is marked "fresh" for 5 minutes, reducing unnecessary re-fetching.
  
```useFetchTransactions.ts
return useQuery(['transactions'], fetchTransactions, {
  staleTime: 5 * 60 * 1000, // Cache stays fresh for 5 minutes
});
```
Approach: Batching API Calls
The API returns transactions in a single request, avoiding multiple calls.
For larger datasets in the future, pagination can be implemented to load only visible data.

### **3.2. Optimizing Rendering**

#### **Approach: FlatList for Rendering Lists**
FlatList is used for the transaction list:
  - Supports lazy loading of only visible items.
  - Uses keyExtractor to uniquely identify items and avoid unnecessary re-renders.

```
<FlatList
  data={transactions}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => <TransactionCard transaction={item} />}
  initialNumToRender={10} // Renders only 10 items initially
/>
```
#### **Approach: Memoized Components**
Components like TransactionCard are memoized using React.memo to avoid unnecessary re-renders when parent state changes.

```
export const TransactionCard = React.memo(({ transaction }: { transaction: Transaction }) => {
  return (
    <View>
      <Text>{transaction.beneficiaryName}</Text>
    </View>
  );
});
```
### **3.3. Efficient State Management**
#### **Approach: Zustand for Local State**
Zustand is used for lightweight state management:
  - Filters and transactions are managed globally without unnecessary boilerplate.
  - The store is highly performant because it updates only relevant parts of the UI.

```
export const useTransactionStore = create((set) => ({
  transactions: [],
  filters: { query: '', sort: 'name-asc' },
  setTransactions: (transactions) => set({ transactions }),
  setFilters: (filters) => set((state) => ({ filters: { ...state.filters, ...filters } })),
}));
```

### **3.4. UI Responsiveness**
#### **Approach: Debounced Search**
The search bar uses debouncing to delay the filtering operation until the user has stopped typing, reducing redundant state updates.

```
const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

// Apply debounce in SearchFilterBar
const handleSearchChange = debounce((text) => setFilters({ query: text }), 300);
```

#### **Approach: Touchable Feedback**
Use of TouchableWithoutFeedback or Pressable ensures that UI elements respond quickly to taps.


### **3.4. Sorting and Filtering**
#### **Approach: In-Memory Sorting**
Transactions are sorted and filtered in memory, avoiding additional API requests:
  - Sorting options (name-asc, date-desc) are applied directly to the list using JavaScript array methods.

```
const sortedTransactions = [...transactions].sort((a, b) => {
  if (filters.sort === 'date-asc') return new Date(a.createdAt) - new Date(b.createdAt);
  if (filters.sort === 'date-desc') return new Date(b.createdAt) - new Date(a.createdAt);
  return 0;
});
```

in big scale app we can make transactional, logical data, calculated in backend/middle layer or server side using GrahpQL.

## **4. Future Improvements**

- Pagination:
  Load transactions in smaller chunks to handle large datasets efficiently.
- Background Fetching:
  Use React Query’s background fetching capabilities to update stale data while keeping the UI responsive.

