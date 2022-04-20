
import { StyleSheet, Text, View } from 'react-native';
import Login from './Pages/loginPage';
import Dashboard from './Pages/dashboardPage';
import AddTenant from './Modals/addTenant';

export default function App() {
  return (
    <Dashboard />
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
