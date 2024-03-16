import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const RoundedTextInput = ({ placeholder, value, onChangeText, secureTextEntry }) => {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}  // This prop makes the input secure (for passwords)
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginVertical: 10,
        width: '80%',
    },
    input: {
        fontSize: 16,
    },
});

export default RoundedTextInput;
