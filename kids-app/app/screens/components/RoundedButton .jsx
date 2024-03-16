import React from 'react';
import { TouchableNativeFeedback, TouchableOpacity, Text, View, StyleSheet } from 'react-native';

const RoundedButton = ({ onPress, title, backgroundColor }) => {
    return (
        <TouchableNativeFeedback
            onPress={onPress}
            background={TouchableNativeFeedback.Ripple('#ccc', false)}
        >
            <View style={[styles.buttonContainer, { backgroundColor: backgroundColor || '#7C7AF9' }]}>
                <Text style={styles.buttonText}>{title}</Text>
            </View>
        </TouchableNativeFeedback>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        borderRadius: 30,
        width: "50%",
        height: 50,
        overflow: 'hidden',
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',

    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    },
});

export default RoundedButton;
