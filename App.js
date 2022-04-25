
import { StyleSheet, Text, View } from 'react-native';
import Login from './Pages/loginPage';
import DashboardWrapper from './Pages/dashboardPage';

export default function App() {
  return (
    <DashboardWrapper />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
