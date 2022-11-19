import React from 'react';
import { Text, StyleSheet, Image, Button, View } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { setObject, getObject } from '../lib/storage';
import { expoClientId } from '../Config';
import { User } from '../lib/types';

interface Props {
    user: User,
    setErr: (err: object) => void;
}

// https://www.youtube.com/watch?v=hmZm_jPvWWM

WebBrowser.maybeCompleteAuthSession(); // allows auth session to complete and return results here;

const Login = (props: Props) => {
    const [accessToken, setAccessToken] = React.useState<string>();
    const [userInfo, setUserInfo] = React.useState<User>();
    const [request, response, promptAsync] = Google.useAuthRequest({
        // TODO ios & android id
        // TODO expo client id in new google cloud project
        expoClientId,
    });
    
    // set accessToken from google auth response
    React.useEffect(() => {
        if (response?.type === 'success') {
            setAccessToken(response.authentication?.accessToken || '')
        } else {
            response !== null && props.setErr(response);
        }
    }, [response]);
    
    // get user from google using accessToken
    React.useEffect(() => {
        if (!accessToken) return;
        const getUserData = async() => {
            const userInfoResponse = await fetch('https://www.googleapis.com/userinfo/v2/me', {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
            userInfoResponse.json().then(data => {
                setUserInfo(data);
                setObject('user', data);
            });
        };
        try {
            getUserData();
        } catch (err) {
            props.setErr(err);
        }
    }, [accessToken]);
    
    const showUserInfo = () => {
        if (props.user) {
            return (
                <View>
                    <Text>{props.user.name}</Text>
                    <Text>{props.user.email}</Text>
                    <Image source={{ uri: props.user.picture }} />
                </View>
            )
        }
    };

    return (
        <View>
            {showUserInfo()}
            {!props.user && (
                <Button
                    title={'Login'}
                    onPress={() => promptAsync({showInRecents: true})}
                />
            )}
        </View>
    )
};

export default Login;