
import { StyleSheet, Text, View } from 'react-native';
import Login from './Pages/loginPage';
import DashboardWrapper from './Pages/dashboardPage';
import MyTabs from './Navigation/BottomNav';

export default function App() {
  return (
    <MyTabs />
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
