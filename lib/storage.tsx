import AsyncStorage from '@react-native-async-storage/async-storage';

export const setObject = async (key: string, value: object) => {
    try {
        const valueStr = JSON.stringify(value)
        await AsyncStorage.setItem(`@${key}`, valueStr)
    } catch (err) {
        return err
    }
};

export const getObject = async (key: string) => {
    try {
        const valueStr = await AsyncStorage.getItem(`@${key}`)
        return valueStr !== null ? JSON.parse(valueStr) : null;
    } catch (err) {
        return err
    }
};
