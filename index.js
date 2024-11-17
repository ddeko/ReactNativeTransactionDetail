import { AppRegistry } from 'react-native';
import { App } from './src/app/App';
import { name as appName } from './app.json';

// Register the main App component
AppRegistry.registerComponent(appName, () => App);
