import React, { useRef } from 'react';
import { TouchableWithoutFeedback, Animated, Text, View, Image, StyleSheet } from 'react-native';

const RoundedButton = ({ onPress,
    title,
    backgroundColor,
    borderRadius,
    imageSource,
    buttonwidth,
    buttonheight,
    imageTintColor,
    imageWidth,
    imageHeight,
}) => {
    const animation = useRef(new Animated.Value(1)).current;

    const handlePress = () => {
        Animated.sequence([
            Animated.timing(animation, {
                toValue: 0.9,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(animation, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
            }),
        ]).start();

        onPress(); // Call the original onPress function
    };

    const buttonStyle = {
        transform: [{ scale: animation }],
        backgroundColor: backgroundColor || '#7C7AF9',
        borderRadius: borderRadius || 30,
        width: buttonwidth || '50%', // Set custom button width or use a default value of 50%
        height: buttonheight || 50,
    };

    return (
        <TouchableWithoutFeedback onPress={handlePress}  >
            <Animated.View style={[styles.buttonContainer, buttonStyle]}>
                {imageSource && (
                    <Image
                        source={imageSource}
                        style={[
                            styles.buttonImage,
                            {
                                tintColor: imageTintColor || 'white',
                                width: imageWidth || '100%', // set the width of the image
                                height: imageHeight || '100%', // set the height of the image
                            },
                        ]}
                    />
                )}
                <Text style={styles.buttonText}>{title}</Text>
            </Animated.View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        width: "50%",
        height: 50,
        overflow: 'hidden',
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        // Added to align image and text horizontally
    },
    buttonImage: {
        width: '100%', // Set the width of the image to 100% to fill the available space
        height: '100%', // Set the height of the image to 100% to fill the available space
        // Add spacing between image and text
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    },
});

export default RoundedButton;
