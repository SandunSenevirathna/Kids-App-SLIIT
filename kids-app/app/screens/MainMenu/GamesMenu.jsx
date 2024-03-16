import React, { useState } from 'react';
import { ImageBackground, StyleSheet, Text, View, TouchableWithoutFeedback, Animated, Image } from 'react-native';

function GamesMenu({ navigation }) {
    const [animations] = useState([
        new Animated.Value(1), // Animation value for the first button
        new Animated.Value(1), // Animation value for the second button
        new Animated.Value(1), // Animation value for the third button
    ]);

    const handleGamePress = (index, routeName) => {
        // Apply animation when a button is pressed
        Animated.sequence([
            Animated.timing(animations[index], {
                toValue: 0.9,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(animations[index], {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
            }),
        ]).start(() => {
            // Navigate to the desired screen after the animation is complete
            navigation.navigate(routeName);
        });
    };
    const buttonStyle = (index) => {
        return {
            transform: [{ scale: animations[index] }],
        };
    };

    return (
        <ImageBackground
            source={require('../../assets/BG_01.png')}
            style={styles.imageBackground}
            resizeMode="cover"
        >
            <View>
                <Text style={styles.games}>Games</Text>
                <View style={{ top: 200, alignItems: 'center' }}>
                    {/* Apply animation to each game button */}
                    <TouchableWithoutFeedback onPress={() => handleGamePress(0, 'ColourObjectSelectGame')}>
                        <Animated.View style={[styles.gameButton, buttonStyle(0)]}>
                            <View style={styles.gameButtonProp}>
                                <Image source={require('../../assets/Game1.png')} style={{ width: 130, height: 130 }} />
                                <Text style={styles.gameButtonText}>Object Select Game</Text>
                            </View>
                        </Animated.View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => handleGamePress(1, 'ColourShapesDragGame_1')}>
                        <Animated.View style={[styles.gameButton, buttonStyle(1)]}>
                            <View style={styles.gameButtonProp}>
                                <Image source={require('../../assets/Game2.png')} style={{ width: 130, height: 130 }} />
                                <Text style={styles.gameButtonText}>Shapes Drag Game</Text>
                            </View>
                        </Animated.View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => handleGamePress(2, 'StorySelect')}>
                        <Animated.View style={[styles.gameButton, buttonStyle(2)]}>
                            <View style={styles.gameButtonProp}>
                                <Image source={require('../../assets/Game3.png')} style={{ width: 130, height: 130 }} />
                                <Text style={[styles.gameButtonText, { marginRight: 45 }]}>Listening Game</Text>
                            </View>
                        </Animated.View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    imageBackground: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    games: {
        justifyContent: 'flex-start',
        top: 50,
        marginLeft: 20,
        fontSize: 18,
        color: '#ffff',
        fontWeight: '600'
    },
    gameButton: {
        width: '80%',
        height: 150,
        backgroundColor: '#F0F0F0',
        borderRadius: 20,
        marginBottom: 10,
        justifyContent: 'center', // Center content vertically
        alignItems: 'center', // Center content horizontallym
    },
    gameButtonProp: {
        flexDirection: 'row',
        alignItems: 'center'

    },
    gameButtonText: {
        fontSize: 17,
        fontWeight: '800',
        margin: 8,
    }
});


export default GamesMenu;