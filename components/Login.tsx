import React from 'react';
import { Text, StyleSheet, Image, Button, View } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';


// https://www.youtube.com/watch?v=hmZm_jPvWWM

WebBrowser.maybeCompleteAuthSession(); // allows auth session to complete and return results here;


const Login = () => {
    const [accessToken, setAccessToken] = React.useState('');
    const [userInfo, setUserInfo] = React.useState();
    const [request, response, promptAsync] = Google.useAuthRequest({
        // TODO ios & android id
        expoClientId: '520868981613-bi51vfbrtg89bkhd39licda6kl609cis.apps.googleusercontent.com',
    });
    React.useEffect(() => {
        if (response?.type === 'success') {
            setAccessToken(response.authentication?.accessToken || '')
        }
    }, [response]);
    const getUserData = async() => {
        const userInfoResponse = await fetch('https://www.googleapis.com/userinfo/v2/me', {
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        userInfoResponse.json().then(data => {
            setUserInfo(data);
        });
    };
    
    const showUserInfo = () => {
        if (userInfo) {
            return (
                <View>
                    <Text>{userInfo.name}</Text>
                    <Text>{userInfo.email}</Text>
                    <Image source={{ uri: userInfo.picture }} />
                </View>
            )
        }
    };

    return (
        <View>
            {showUserInfo()}
            <Button
                title={accessToken ? 'Get User Info' : 'Login'}
                onPress={accessToken ? getUserData : () => promptAsync({showInRecents: true})}
            />
            <Text>LOGIN!</Text>
        </View>
    )
};

export default Login;