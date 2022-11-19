import React from 'react';
import { StatusBar } from 'expo-status-bar';
import Login from './components/Login';
import { StyleSheet, Text, View } from 'react-native';
import JoinGame from './components/JoinGame';
import { getObject } from './lib/storage';
import { User } from './lib/types';

export default function App() {
    const [err, setErr] = React.useState<object>();
    const [user, setUser] = React.useState<User>({});

    // get user from storage and set as user
    React.useEffect(() => {
        const getUserFromStorage = async() => {
            const storedUser = await getObject('user');
            storedUser && setUser(storedUser);
        }
        getUserFromStorage();
    }, []);
    
    return (
    <View style={styles.container}>
        { err ? (
            <Text>{JSON.stringify(err)}</Text>
        ) : null}
        <Text>Open up App.tsx to start working on your app! Farts!</Text>
        <StatusBar style="auto" />
        <Login setErr={setErr} user={user} />
        <JoinGame user={user} />
    </View>
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
