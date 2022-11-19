import React from 'react';
import {Text} from "react-native";

interface Props {
    user: object;
};

const JoinGame = (props:Props) => {
    console.log('u', props.user)
    return <Text>Join</Text>
};

export default JoinGame;